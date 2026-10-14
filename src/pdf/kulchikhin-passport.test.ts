import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { createWorker, PSM } from 'tesseract.js';
import { describe, expect, it } from 'vitest';

import { extractApplicantFields } from '@/api/extract-profile';
import {
  locatePassportPage,
  passportTextBands,
  type Box,
} from '@/pdf/passport-locate';
import { parseTravelPassport } from '@/pdf/parse-travel-passport';

const PHOTO = join(process.cwd(), 'fixtures/passports/kulchikhin.jpg');

const passport = {
  surname: 'KULCHIKHIN',
  givenNames: 'VALENTIN',
  passportNumber: '768321457',
  dateOfBirth: '16.04.1991',
  passportIssueDate: '04.08.2022',
  sex: 'M',
  placeOfBirth: 'САМАРСКАЯ ОБЛ.',
  countryOfBirth: 'USSR',
};

function expectPassport(text: string) {
  const parsed = parseTravelPassport(text);
  expect(parsed).toMatchObject(passport);
}

describe('travel passport names', () => {
  it('keeps the latin surname when a header fragment is transliterated nearby', () => {
    expectPassport(`
ВАЩН /
VASHCHN
КУЛЬЧИХИН /
KULCHIKHIN
ПАЛЕНТИЛ ВЛАДИМИРОВИЧ /
ВАЛЕНТИН ВЛАДИМИРОВИЧ /
VALENTIN
16.04.1991
04.08.2022
м/м САМАРСКАЯ ОБЛ. / USSR
76 8321457
`);
  });

  it('does not fill the surname with a transliteration of a misread label', () => {
    expectPassport(`
ПАСПОРТ/РАЗРОТ
КУЛЬЧИХИН /
ВАЛЕНТИН ВЛАДИМИРОВИЧ /
16.04.1991
04.08.2022
м/м САМАРСКАЯ ОБЛ. / USSR
76 8321457
P<RUSKULCHIKHINS<VALENTINSSSS<<<<<<
7683214573RUS9104163M3208047
`);
  });

  it('does not use the given name as the surname', () => {
    expectPassport(`
Фамилия / Surname
VALENTIN
ВАЛЕНТИН ВЛАДИМИРОВИЧ /
VALENTIN
КУЛЬЧИХИН /
16.04.1991
04.08.2022
м/м САМАРСКАЯ ОБЛ. / USSR
76 8321457
`);
  });

  it('corrects a single misread latin letter using the cyrillic surname and the mrz', () => {
    expectPassport(`
КУЛЬЧИХИН /
KULCHIKHIN
ВАЛЕНТИН ВЛАДИМИРОВИЧ /
VALENTIN
16.04.1991
04.08.2022
М/М САМАРСКАЯ ОБЛ. / USSR
76 8321457
P 5<RUSKULCHIKHIN<<VALENTIN<<<<<<<<<<<<<
<83214573RUS9104163M5208047
`);
  });
});

describe('kulchikhin passport photo', () => {
  it('reads the fields shown on the form', async () => {
    const text = await recognizePassport(PHOTO);
    expectPassport(text);

    const extracted = extractApplicantFields({
      passportText: text,
      formText: '',
      bookingText: '',
      russianPassportText: '',
      russianRegistrationText: '',
    });

    expect(extracted.fields).toMatchObject(passport);
  });
});

async function recognizePassport(photo: string): Promise<string> {
  const directory = mkdtempSync(join(tmpdir(), 'passport-'));
  const bmpPath = join(directory, 'page.bmp');
  execFileSync('sips', ['-s', 'format', 'bmp', photo, '--out', bmpPath]);
  const bitmap = readBitmap(bmpPath);
  const located = locatePassportPage(bitmap.rgba, bitmap.width, bitmap.height);
  if (!located) {
    throw new Error('Passport page was not found.');
  }

  const worker = await createWorker('rus+eng', 1, {
    langPath: join(process.cwd(), 'public/tessdata'),
    gzip: false,
    cachePath: directory,
  });
  await worker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_BLOCK });

  try {
    const parts: Array<string> = [];
    for (const band of passportTextBands(located.page)) {
      const path = join(directory, `band-${band.y0}.bmp`);
      writeBitmap(path, cropBand(bitmap, band));
      const result = await worker.recognize(path);
      parts.push(result.data.text);
    }
    const mrzPath = join(directory, 'mrz.bmp');
    writeBitmap(mrzPath, cropBand(bitmap, located.mrz));
    const mrz = await createWorker('ocrb_int', 1, {
      langPath: join(process.cwd(), 'public/tessdata'),
      gzip: false,
      cachePath: directory,
    });
    await mrz.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_BLOCK });
    const mrzText = await mrz
      .recognize(mrzPath)
      .then((result) => result.data.text);
    await mrz.terminate();
    return `${parts.join('\n')}\n${mrzText}`;
  } finally {
    await worker.terminate();
  }
}

function readBitmap(path: string): {
  rgba: Uint8ClampedArray;
  width: number;
  height: number;
} {
  const bmp = readFileSync(path);
  const width = bmp.readInt32LE(18);
  const heightRaw = bmp.readInt32LE(22);
  const height = Math.abs(heightRaw);
  const topDown = heightRaw < 0;
  const offset = bmp.readUInt32LE(10);
  const stride = Math.ceil((width * 3) / 4) * 4;
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    const sourceY = topDown ? y : height - 1 - y;
    const row = offset + sourceY * stride;
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const pixel = row + x * 3;
      rgba[index] = bmp[pixel + 2] ?? 0;
      rgba[index + 1] = bmp[pixel + 1] ?? 0;
      rgba[index + 2] = bmp[pixel] ?? 0;
      rgba[index + 3] = 255;
    }
  }
  return { rgba, width, height };
}

function cropBand(
  bitmap: { rgba: Uint8ClampedArray; width: number; height: number },
  box: Box,
): { rgba: Uint8ClampedArray; width: number; height: number } {
  const scale = 3;
  const width = Math.max(1, box.x1 - box.x0) * scale;
  const height = Math.max(1, box.y1 - box.y0) * scale;
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    const sourceY = Math.min(bitmap.height - 1, box.y0 + Math.floor(y / scale));
    for (let x = 0; x < width; x += 1) {
      const sourceX = Math.min(bitmap.width - 1, box.x0 + Math.floor(x / scale));
      const from = (sourceY * bitmap.width + sourceX) * 4;
      const to = (y * width + x) * 4;
      rgba[to] = bitmap.rgba[from] ?? 0;
      rgba[to + 1] = bitmap.rgba[from + 1] ?? 0;
      rgba[to + 2] = bitmap.rgba[from + 2] ?? 0;
      rgba[to + 3] = 255;
    }
  }
  stretchContrast(rgba);
  return { rgba, width, height };
}

function stretchContrast(rgba: Uint8ClampedArray): void {
  const samples: Array<number> = [];
  for (let index = 0; index < rgba.length; index += 16) {
    samples.push(
      0.299 * (rgba[index] ?? 0) +
        0.587 * (rgba[index + 1] ?? 0) +
        0.114 * (rgba[index + 2] ?? 0),
    );
  }
  samples.sort((left, right) => left - right);
  const low = samples[Math.floor(samples.length * 0.05)] ?? 0;
  const high = samples[Math.floor(samples.length * 0.98)] ?? 255;
  const scale = 255 / Math.max(1, high - low);
  for (let index = 0; index < rgba.length; index += 4) {
    for (let channel = 0; channel < 3; channel += 1) {
      const value = rgba[index + channel] ?? 0;
      rgba[index + channel] = Math.max(
        0,
        Math.min(255, Math.round((value - low) * scale)),
      );
    }
  }
}

function writeBitmap(
  path: string,
  image: { rgba: Uint8ClampedArray; width: number; height: number },
): void {
  const stride = Math.ceil((image.width * 3) / 4) * 4;
  const size = 54 + stride * image.height;
  const file = Buffer.alloc(size);
  file.write('BM');
  file.writeUInt32LE(size, 2);
  file.writeUInt32LE(54, 10);
  file.writeUInt32LE(40, 14);
  file.writeInt32LE(image.width, 18);
  file.writeInt32LE(-image.height, 22);
  file.writeUInt16LE(1, 26);
  file.writeUInt16LE(24, 28);
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      const index = (y * image.width + x) * 4;
      const pixel = 54 + y * stride + x * 3;
      file[pixel] = image.rgba[index + 2] ?? 0;
      file[pixel + 1] = image.rgba[index + 1] ?? 0;
      file[pixel + 2] = image.rgba[index] ?? 0;
    }
  }
  writeFileSync(path, new Uint8Array(file));
}
