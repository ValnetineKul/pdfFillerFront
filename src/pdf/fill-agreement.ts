import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, rgb } from 'pdf-lib';

import type { SchemaAgreementFields } from '#temp/api-schemas/api';

const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const PAGE_LINES = [
  { nameY: 744, documentY: 725, authorityY: 699, addressY: 673 },
  { nameY: 740, documentY: 721, authorityY: 696, addressY: 669 },
];

function clip(value: string, max: number): string {
  const clean = value.replace(/\s+/g, ' ').trim();
  return clean.length > max ? clean.slice(0, max) : clean;
}

export async function fillPersonalDataAgreement(options: {
  template: ArrayBuffer;
  font: ArrayBuffer;
  agreement: SchemaAgreementFields;
}): Promise<Uint8Array> {
  const document = await PDFDocument.load(options.template);
  document.registerFontkit(fontkit);
  const font = await document.embedFont(options.font, { subset: true });
  const pages = document.getPages();
  const today = new Date();
  const color = rgb(0.1, 0.1, 0.12);

  if (pages.length < PAGE_LINES.length) {
    throw new Error('В согласии не хватает страниц.');
  }

  pages.forEach((page, index) => {
    const line = PAGE_LINES[index];
    if (!line) {
      return;
    }

    const draw = (text: string, x: number, y: number, size = 9) => {
      if (!text) {
        return;
      }
      page.drawText(text, { x, y, size, font, color });
    };

    draw(String(today.getDate()), 430, 768, 10);
    draw(MONTHS[today.getMonth()] ?? '', 448, 768, 10);
    draw(String(today.getFullYear()).slice(2), 531, 768, 10);
    draw(clip(options.agreement.fullName, 90), 70, line.nameY, 10);
    draw(clip(options.agreement.documentType, 22), 44, line.documentY);
    draw(clip(options.agreement.series, 8), 208, line.documentY);
    draw(clip(options.agreement.number, 10), 272, line.documentY);
    draw(clip(options.agreement.issueDate, 12), 410, line.documentY);
    const issuedBy = clip(options.agreement.issuedBy, 120);
    if (issuedBy.length > 70) {
      draw(issuedBy.slice(0, 70), 44, line.authorityY, 8);
      draw(issuedBy.slice(70), 44, line.authorityY - 11, 8);
    } else {
      draw(issuedBy, 44, line.authorityY);
    }
    draw(clip(options.agreement.address, 70), 176, line.addressY);
  });

  return document.save();
}
