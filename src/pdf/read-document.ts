import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = workerSrc;

export type PdfTextItem = {
  x: number;
  y: number;
  text: string;
};

export async function readPdfItems(file: File): Promise<Array<PdfTextItem>> {
  const data = new Uint8Array(await file.arrayBuffer());
  const document = await getDocument({ data }).promise;
  const items: Array<PdfTextItem> = [];

  for (let index = 1; index <= document.numPages; index += 1) {
    const page = await document.getPage(index);
    const content = await page.getTextContent();
    for (const item of content.items) {
      if (!('str' in item) || !item.str.trim()) {
        continue;
      }
      items.push({
        x: item.transform[4],
        y: item.transform[5],
        text: item.str.trim(),
      });
    }
  }

  return items;
}

export async function readPdfText(file: File): Promise<string> {
  const data = new Uint8Array(await file.arrayBuffer());
  const document = await getDocument({ data }).promise;
  const pages: Array<string> = [];

  for (let index = 1; index <= document.numPages; index += 1) {
    const page = await document.getPage(index);
    const content = await page.getTextContent();
    const lines = new Map<number, Array<{ x: number; text: string }>>();

    for (const item of content.items) {
      if (!('str' in item) || !item.str.trim()) {
        continue;
      }

      const y = Math.round(item.transform[5]);
      const row = lines.get(y) ?? [];
      row.push({ x: item.transform[4], text: item.str });
      lines.set(y, row);
    }

    const text = [...lines.keys()]
      .sort((left, right) => right - left)
      .map((y) =>
        lines
          .get(y)
          ?.sort((left, right) => left.x - right.x)
          .map((part) => part.text)
          .join(' '),
      )
      .join('\n');

    pages.push(text);
  }

  return pages.join('\n');
}
