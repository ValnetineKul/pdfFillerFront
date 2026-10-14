import { createWorker, PSM } from 'tesseract.js';

import {
  locatePassportPage,
  passportTextBands,
  type Box,
} from './passport-locate';

const ANALYSIS_EDGE = 1200;

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
      reject(new Error('Не удалось открыть фото паспорта.'));
    };
    image.src = url;
  });
}

function analysisCanvas(image: HTMLImageElement): HTMLCanvasElement {
  const scale = Math.min(
    1,
    ANALYSIS_EDGE / Math.max(image.naturalWidth, image.naturalHeight),
  );
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    throw new Error('Не удалось прочитать фото паспорта.');
  }
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
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
  const low = samples[Math.floor(samples.length * 0.05)] ?? 0;
  const high = samples[Math.floor(samples.length * 0.98)] ?? 255;
  const scale = 255 / Math.max(1, high - low);
  for (let index = 0; index < image.data.length; index += 4) {
    for (let channel = 0; channel < 3; channel += 1) {
      const value = image.data[index + channel] ?? 0;
      image.data[index + channel] = Math.max(
        0,
        Math.min(255, Math.round((value - low) * scale)),
      );
    }
  }
  context.putImageData(image, 0, 0);
}

function crop(source: HTMLCanvasElement, box: Box, scale = 2): HTMLCanvasElement {
  const width = Math.max(1, box.x1 - box.x0);
  const height = Math.max(1, box.y1 - box.y0);
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
    box.x0,
    box.y0,
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

async function recognizeRegions(
  language: string,
  regions: Array<HTMLCanvasElement>,
): Promise<string> {
  const worker = await createWorker(language, 1, {
    langPath: `${window.location.origin}/tessdata`,
    gzip: false,
  });
  try {
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });
    const parts: Array<string> = [];
    for (const region of regions) {
      const result = await worker.recognize(region);
      if (result.data.text.trim()) {
        parts.push(result.data.text);
      }
    }
    return parts.join('\n');
  } finally {
    await worker.terminate();
  }
}

export async function readTravelPassport(file: Blob): Promise<string> {
  const image = await loadImage(file);
  const canvas = analysisCanvas(image);
  const context = canvas.getContext('2d', { willReadFrequently: true });
  const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
  const located = imageData
    ? locatePassportPage(imageData.data, canvas.width, canvas.height)
    : null;

  if (!located) {
    return recognizeRegions('rus+eng', [canvas]);
  }

  const bands = passportTextBands(located.page).map((band) => crop(canvas, band, 3));
  const [pageText, mrzText] = await Promise.all([
    recognizeRegions('rus+eng', bands),
    recognizeRegions('ocrb_int', [crop(canvas, located.mrz, 3)]).catch(() => ''),
  ]);
  return `${pageText}\n${mrzText}`;
}
