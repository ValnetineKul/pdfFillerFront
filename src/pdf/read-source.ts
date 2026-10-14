import mammoth from 'mammoth';
import { getDocument } from 'pdfjs-dist';

import { readPdfText } from './read-document';
import {
  createOcrWorker,
  readPassportPhoto,
  recognizeWithWorker,
} from './read-passport';

const DOCX_TYPE =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export async function readSourceText(
  file: File,
  ocrLanguage = 'eng',
): Promise<string> {
  const name = file.name.toLowerCase();

  if (file.type.startsWith('image/')) {
    return readPassportPhoto(file, ocrLanguage);
  }

  if (file.type === 'text/plain' || name.endsWith('.txt')) {
    return file.text();
  }

  if (file.type === DOCX_TYPE || name.endsWith('.docx')) {
    const result = await mammoth.extractRawText({
      arrayBuffer: await file.arrayBuffer(),
    });
    return result.value;
  }

  const pdfText = await readPdfText(file);
  if (pdfText.trim().length >= 40) {
    return pdfText;
  }

  const ocrText = await recognizePdf(file, ocrLanguage);
  return ocrText.trim() ? ocrText : pdfText;
}

async function recognizePdf(file: File, language: string): Promise<string> {
  const data = new Uint8Array(await file.arrayBuffer());
  const document = await getDocument({ data }).promise;
  const worker = await createOcrWorker(language);
  const pages: Array<string> = [];

  try {
    for (let index = 1; index <= document.numPages; index += 1) {
      const page = await document.getPage(index);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = window.document.createElement('canvas');
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const context = canvas.getContext('2d');
      if (!context) {
        continue;
      }

      await page.render({ canvasContext: context, viewport }).promise;
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });
      if (!blob) {
        continue;
      }

      pages.push(await recognizeWithWorker(worker, blob));
    }
  } finally {
    await worker.terminate();
  }

  return pages.join('\n');
}
