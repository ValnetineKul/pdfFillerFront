import { createOcrWorker } from './read-passport';
import { PSM } from 'tesseract.js';

export type PassportOcrWord = {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  /** Open-book leaf the word was cropped from. */
  zone?: 'top' | 'bottom';
};

const CYRILLIC_CHARS =
  'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';

export type RussianPassportOcr = {
  words: Array<PassportOcrWord>;
  digitText: string;
  fullText: string;
};

function loadImage(file: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Не удалось открыть фото паспорта РФ.'));
    };
    image.src = url;
  });
}

function stretchContrast(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return;
  }
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const samples: Array<number> = [];
  for (let index = 0; index < image.data.length; index += 16) {
    samples.push(
      0.299 * (image.data[index] ?? 0) +
        0.587 * (image.data[index + 1] ?? 0) +
        0.114 * (image.data[index + 2] ?? 0),
    );
  }
  samples.sort((left, right) => left - right);
  const low = samples[Math.floor(samples.length * 0.04)] ?? 0;
  const high = samples[Math.floor(samples.length * 0.97)] ?? 255;
  const scale = 255 / Math.max(1, high - low);
  for (let index = 0; index < image.data.length; index += 4) {
    const gray =
      0.299 * (image.data[index] ?? 0) +
      0.587 * (image.data[index + 1] ?? 0) +
      0.114 * (image.data[index + 2] ?? 0);
    const value = Math.max(0, Math.min(255, Math.round((gray - low) * scale)));
    image.data[index] = value;
    image.data[index + 1] = value;
    image.data[index + 2] = value;
  }
  context.putImageData(image, 0, 0);
}

function enhancePassport(image: HTMLImageElement): HTMLCanvasElement {
  const longest = Math.max(image.naturalWidth, image.naturalHeight);
  const scale = longest < 1800 ? 1800 / longest : longest < 2400 ? 1.4 : 1;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return canvas;
  }
  context.imageSmoothingEnabled = false;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  stretchContrast(canvas);
  return canvas;
}

function crop(
  source: HTMLCanvasElement,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  scale = 2,
): HTMLCanvasElement {
  const width = Math.max(1, x1 - x0);
  const height = Math.max(1, y1 - y0);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext('2d');
  if (!context) {
    return canvas;
  }
  context.imageSmoothingEnabled = false;
  context.drawImage(
    source,
    x0,
    y0,
    width,
    height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  stretchContrast(canvas);
  return canvas;
}

function redDigitStrip(source: HTMLCanvasElement): HTMLCanvasElement {
  const context = source.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return source;
  }
  const stripX0 = Math.floor(source.width * 0.82);
  const stripWidth = source.width - stripX0;
  const image = context.getImageData(stripX0, 0, stripWidth, source.height);
  for (let index = 0; index < image.data.length; index += 4) {
    const red = image.data[index] ?? 0;
    const green = image.data[index + 1] ?? 0;
    const blue = image.data[index + 2] ?? 0;
    const isRed =
      red > 70 &&
      red >= green + 20 &&
      red >= blue + 20 &&
      red / Math.max(1, (green + blue) / 2) > 1.15;
    const value = isRed ? 0 : 255;
    image.data[index] = value;
    image.data[index + 1] = value;
    image.data[index + 2] = value;
  }

  const upright = document.createElement('canvas');
  upright.width = stripWidth;
  upright.height = source.height;
  upright.getContext('2d')?.putImageData(image, 0, 0);

  // Keep both pages' vertical numbers: upper and lower halves separately, then join.
  const top = crop(upright, 0, 0, stripWidth, Math.floor(source.height * 0.55), 3);
  const bottom = crop(
    upright,
    0,
    Math.floor(source.height * 0.45),
    stripWidth,
    source.height,
    3,
  );

  const rotate = (input: HTMLCanvasElement) => {
    const rotated = document.createElement('canvas');
    rotated.width = input.height;
    rotated.height = input.width;
    const rotatedContext = rotated.getContext('2d');
    if (!rotatedContext) {
      return input;
    }
    rotatedContext.translate(0, input.width);
    rotatedContext.rotate(-Math.PI / 2);
    rotatedContext.drawImage(input, 0, 0);
    stretchContrast(rotated);
    return rotated;
  };

  const topRot = rotate(top);
  const bottomRot = rotate(bottom);
  const joined = document.createElement('canvas');
  joined.width = Math.max(topRot.width, bottomRot.width);
  joined.height = topRot.height + bottomRot.height + 16;
  const joinedContext = joined.getContext('2d');
  if (!joinedContext) {
    return topRot;
  }
  joinedContext.fillStyle = '#fff';
  joinedContext.fillRect(0, 0, joined.width, joined.height);
  joinedContext.drawImage(topRot, 0, 0);
  joinedContext.drawImage(bottomRot, 0, topRot.height + 16);
  return joined;
}

async function canvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/png');
  });
  if (!blob) {
    throw new Error('Не удалось подготовить фото паспорта РФ.');
  }
  return blob;
}

async function recognizeWords(
  worker: Awaited<ReturnType<typeof createOcrWorker>>,
  canvas: HTMLCanvasElement,
): Promise<Array<PassportOcrWord>> {
  const result = await worker.recognize(await canvasBlob(canvas));
  return (result.data.words ?? [])
    .map((word) => ({
      text: word.text.trim(),
      x: word.bbox.x0,
      y: word.bbox.y0,
      width: word.bbox.x1 - word.bbox.x0,
      height: word.bbox.y1 - word.bbox.y0,
      confidence: word.confidence,
    }))
    .filter((word) => word.text.length > 0);
}

export async function readRussianPassportOcr(
  file: Blob,
): Promise<RussianPassportOcr> {
  const image = await loadImage(file);
  const enhanced = enhancePassport(image);
  const height = enhanced.height;
  const width = enhanced.width;
  // Open passport: top leaf = issued-by/date, bottom leaf = personal names.
  const topLeaf = crop(enhanced, 0, 0, width * 0.82, height * 0.52, 2.2);
  const bottomLeaf = crop(
    enhanced,
    0,
    height * 0.48,
    width * 0.82,
    height,
    2.2,
  );
  const redStrip = redDigitStrip(enhanced);
  // MRZ sits on the lower leaf; eng/ocrb reads series+number more reliably than the red strip.
  const mrzBand = crop(
    enhanced,
    0,
    height * 0.78,
    width * 0.92,
    height * 0.92,
    3.5,
  );
  const worker = await createOcrWorker('rus');
  const mrzWorker = await createOcrWorker('eng');
  try {
    // Cyrillic-only whitelist reduces Latin lookalikes (B/H/P vs В/Н/Р).
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SPARSE_TEXT,
      tessedit_char_whitelist: `${CYRILLIC_CHARS}0123456789№.-/ `,
    });
    const [topWords, bottomWords] = await Promise.all([
      recognizeWords(worker, topLeaf),
      recognizeWords(worker, bottomLeaf),
    ]);
    // Shift bottom words so global Y order stays top-then-bottom.
    const words = [
      ...topWords.map((word) => ({ ...word, zone: 'top' as const })),
      ...bottomWords.map((word) => ({
        ...word,
        y: word.y + height * 0.48,
        zone: 'bottom' as const,
      })),
    ];

    const redBlob = await canvasBlob(redStrip);
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      tessedit_char_whitelist: '0123456789 ',
    });
    const digitsOnly = await worker.recognize(redBlob);
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SPARSE_TEXT,
      tessedit_char_whitelist: '0123456789 ',
    });
    const digitsSparse = await worker.recognize(redBlob);
    await worker.setParameters({
      tessedit_char_whitelist: '',
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });
    const digitsLoose = await worker.recognize(redBlob);

    const mrzBlob = await canvasBlob(mrzBand);
    await mrzWorker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      tessedit_char_whitelist: '0123456789<ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    });
    const mrzResult = await mrzWorker.recognize(mrzBlob);
    const mrzText = mrzResult.data.text ?? '';
    // Expose MRZ digits to the parser as words too (bottom zone).
    for (const token of mrzText.split(/[\s\n]+/)) {
      const trimmed = token.trim();
      if (trimmed.length >= 6) {
        words.push({
          text: trimmed,
          x: 0,
          y: height * 0.85,
          width: trimmed.length * 8,
          height: 28,
          confidence: 80,
          zone: 'bottom',
        });
      }
    }

    const digitText = [
      digitsOnly.data.text,
      digitsSparse.data.text,
      digitsLoose.data.text,
      mrzText,
    ]
      .map((value) => value.replace(/[^\dA-Z<\s]/gi, ' ').replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join('\n');

    return {
      words,
      digitText,
      fullText: words.map((word) => word.text).join('\n'),
    };
  } finally {
    await worker.terminate();
    await mrzWorker.terminate();
  }
}

/** @deprecated Prefer readRussianPassportOcr + parseRussianPassportOcr */
export async function readRussianPassport(file: Blob): Promise<string> {
  const result = await readRussianPassportOcr(file);
  return `${result.fullText}\n${result.digitText}`;
}
