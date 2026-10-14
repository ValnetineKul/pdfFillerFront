import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

import type { SchemaApplicantFields } from '#temp/api-schemas/api';
import { transliterateApplicantFields, transliterateRussian } from './transliterate';

const COUNTRY_NAMES: Record<string, string> = {
  RUS: 'RUSSIA',
  ITA: 'ITALY',
  UKR: 'UKRAINE',
  BLR: 'BELARUS',
  KAZ: 'KAZAKHSTAN',
  UZB: 'UZBEKISTAN',
  GEO: 'GEORGIA',
  ARM: 'ARMENIA',
  AZE: 'AZERBAIJAN',
  USA: 'UNITED STATES',
  GBR: 'UNITED KINGDOM',
  DEU: 'GERMANY',
  FRA: 'FRANCE',
  ESP: 'SPAIN',
  TUR: 'TURKEY',
  CHN: 'CHINA',
  IND: 'INDIA',
  USSR: 'USSR',
  SSSR: 'USSR',
};

function countryName(code: string): string {
  const normalized = code.trim().toUpperCase();
  return COUNTRY_NAMES[normalized] ?? normalized;
}

function sanitize(value: string): string {
  return transliterateRussian(value)
    .normalize('NFC')
    .replace(/[^\u0000-\u00FF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(value: string, max: number): string {
  const clean = sanitize(value);
  return clean.length > max ? clean.slice(0, max) : clean;
}

type Point = { x: number; y: number; max?: number; maxWidth?: number };

export async function fillItalyVisa(options: {
  template: ArrayBuffer;
  fields: SchemaApplicantFields;
}): Promise<Uint8Array> {
  const document = await PDFDocument.load(options.template);
  const font = await document.embedFont(StandardFonts.Helvetica);
  const [page1, page2, page3, page4] = document.getPages();
  if (!page1 || !page2 || !page3 || !page4) {
    throw new Error('В анкете Италии не хватает страниц.');
  }
  const color = rgb(0.05, 0.12, 0.28);
  const fields = transliterateApplicantFields(options.fields);

  const write = (page: typeof page1, value: string, point: Point) => {
    let text = clip(value, point.max ?? 42);
    if (!text) {
      return;
    }

    let size = 9;
    if (point.maxWidth) {
      while (size > 6 && font.widthOfTextAtSize(text, size) > point.maxWidth) {
        size -= 0.5;
      }
      while (text.length > 1 && font.widthOfTextAtSize(text, size) > point.maxWidth) {
        text = text.slice(0, -1);
      }
    }

    page.drawText(text, {
      x: point.x,
      y: point.y,
      size,
      font,
      color,
    });
  };

  const writeCentered = (
    page: typeof page1,
    value: string,
    box: { left: number; right: number; top: number; bottom: number },
  ) => {
    const text = clip(value, 40);
    if (!text) {
      return;
    }
    const maxWidth = box.right - box.left - 8;
    let size = 9;
    while (size > 6 && font.widthOfTextAtSize(text, size) > maxWidth) {
      size -= 0.5;
    }
    const width = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: box.left + (box.right - box.left - width) / 2,
      y: box.bottom + (box.top - box.bottom - size) / 2,
      size,
      font,
      color,
    });
  };

  const mark = (page: typeof page1, x: number, y: number) => {
    page.drawText('X', { x, y, size: 11, font, color });
  };

  write(page1, fields.surname, { x: 200, y: 604, max: 36 });
  write(page1, fields.surnameAtBirth, { x: 120, y: 565, max: 28 });
  write(page1, fields.givenNames, { x: 180, y: 546, max: 40 });
  write(page1, fields.dateOfBirth, { x: 130, y: 507, max: 16 });
  write(page1, countryName(fields.nationality), { x: 274, y: 492, max: 16 });
  write(page1, countryName(fields.countryOfBirth), { x: 274, y: 440, max: 16 });
  writeCentered(page1, transliterateRussian(fields.placeOfBirth), {
    left: 42,
    right: 264,
    top: 484,
    bottom: 452,
  });
  writeCentered(page1, countryName(fields.countryOfBirth), {
    left: 42,
    right: 264,
    top: 430,
    bottom: 400,
  });
  write(page1, formatToday(), { x: 432, y: 533, max: 16 });

  if (fields.sex === 'M') {
    mark(page1, 82, 314);
  }
  if (fields.sex === 'F') {
    mark(page1, 82, 276);
  }
  if (fields.maritalStatus === 'single') {
    mark(page1, 292, 361);
  }
  if (fields.maritalStatus === 'married') {
    mark(page1, 262, 336);
  }

  if (fields.passportNumber) {
    mark(page2, 201, 804);
  }
  write(page2, fields.passportNumber, { x: 48, y: 698, max: 24 });
  write(page2, fields.passportIssueDate, { x: 48, y: 658, max: 16 });
  write(page2, fields.passportExpiry, { x: 168, y: 658, max: 16 });
  write(page2, countryName(fields.issuingCountry), { x: 300, y: 658, max: 16 });
  write(page2, fields.address, { x: 48, y: 352, max: 42 });
  write(page2, fields.email, { x: 48, y: 338, max: 42 });
  write(page2, fields.phone, { x: 320, y: 348, max: 18 });
  mark(page2, 77, 291);
  write(page2, fields.occupation, { x: 48, y: 206, max: 50 });
  write(
    page2,
    [fields.employerName, fields.employerAddress, fields.employerPhone]
      .filter(Boolean)
      .join(', '),
    { x: 48, y: 158, max: 78 },
  );

  const purpose = fields.travelPurpose.toLowerCase();
  if (purpose === 'tourism' || /tour|turis|туриз/.test(purpose)) {
    mark(page2, 116, 127);
  } else if (purpose === 'invitation' || /invit|приглаш|visit/.test(purpose)) {
    mark(page2, 295, 111);
  }

  write(page3, 'ITALIA', { x: 48, y: 752, max: 24 });
  write(page3, 'ITALIA', { x: 300, y: 752, max: 20 });
  mark(page3, 449, 712);
  write(page3, fields.stayFrom, { x: 48, y: 662, max: 16 });
  write(page3, fields.stayTo, { x: 48, y: 622, max: 16 });

  const stayName =
    fields.staySource === 'booking'
      ? fields.hotelName
      : [fields.hostSurname, fields.hostGivenNames].filter(Boolean).join(' ');
  write(page3, stayName, { x: 48, y: 430, max: 55 });
  write(page3, fields.hostAddress, { x: 48, y: 372, max: 48 });
  if (fields.staySource !== 'booking') {
    write(page3, fields.hostEmail, { x: 48, y: 356, max: 42 });
  }
  write(page3, fields.hotelPhone, { x: 400, y: 390, max: 18 });

  if (fields.minor === 'yes') {
    write(page1, parentLine(fields, '1'), { x: 43, y: 132, max: 90 });
    write(page1, parentLine(fields, '2'), { x: 43, y: 116, max: 90 });
  }

  if (recentVisa(fields)) {
    mark(page3, 204, 582);
    write(page3, fields.fingerprintDate, { x: 150, y: 571, max: 16 });
    write(page3, fields.visaNumber, { x: 220, y: 548, max: 20 });
  } else {
    mark(page3, 78, 582);
  }

  if (fields.sponsored === 'yes') {
    const sponsorName = [fields.sponsorSurname, fields.sponsorGivenNames]
      .filter(Boolean)
      .join(' ');
    mark(page3, 492, 203);
    mark(page3, 407, 172);
    write(page3, sponsorName, { x: 274, y: 156, max: 40 });
    mark(page3, 385, 142);
    mark(page3, 393, 98);
  } else {
    mark(page3, 188, 216);
    mark(page3, 154, 185);
    mark(page3, 178, 154);
  }

  write(
    page4,
    [fields.appointmentCity, fields.appointmentDate].filter(Boolean).join(' '),
    { x: 155, y: 104, max: 36 },
  );

  return document.save();
}

function parentLine(fields: SchemaApplicantFields, which: '1' | '2'): string {
  const surname = which === '1' ? fields.parent1Surname : fields.parent2Surname;
  const given = which === '1' ? fields.parent1GivenNames : fields.parent2GivenNames;
  const phone = which === '1' ? fields.parent1Phone : fields.parent2Phone;
  const email = which === '1' ? fields.parent1Email : fields.parent2Email;
  const address = which === '1' ? fields.parent1Address : fields.parent2Address;
  return [surname, given, phone, email, address].filter(Boolean).join(', ');
}

export function recentVisa(fields: {
  previousVisa: string;
  fingerprintDate: string;
}): boolean {
  if (fields.previousVisa !== 'yes') {
    return false;
  }
  const match = /^(\d{2})[./-](\d{2})[./-](\d{4})$/.exec(fields.fingerprintDate.trim());
  if (!match) {
    return false;
  }
  const date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  if (Number.isNaN(date.getTime())) {
    return false;
  }
  const limit = new Date();
  limit.setFullYear(limit.getFullYear() - 5);
  const today = new Date();
  return date >= limit && date <= today;
}

function formatToday(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${day}-${month}-${now.getFullYear()}`;
}
