import { createWorker, type Worker } from 'tesseract.js';

export async function readPassportPhoto(
  file: Blob,
  language = 'eng',
): Promise<string> {
  const worker = await createWorker(language);

  try {
    return await recognizeWithWorker(worker, file);
  } finally {
    await worker.terminate();
  }
}

export async function recognizeWithWorker(
  worker: Worker,
  file: Blob,
): Promise<string> {
  const result = await worker.recognize(file);
  return result.data.text;
}

export async function createOcrWorker(language: string): Promise<Worker> {
  return createWorker(language);
}
