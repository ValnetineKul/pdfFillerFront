import { describe, expect, it } from 'vitest';

import {
  parseRussianPassport,
  parseRussianPassportOcr,
  type PassportOcrWord,
} from '@/api/extract-profile';
import { normalizeGapInput } from '@/ui/gap-field';

/** Golden values from the Tuchkovskii RU passport sample. */
const EXPECTED = {
  fullName: 'ТУЧКОВСКИЙ ЯРОСЛАВ ВЛАДИМИРОВИЧ',
  series: '4014',
  number: '134952',
  documentType: 'паспорт',
  issueDate: '10.11.2014',
  issuedBy:
    'ТП №9 ОТДЕЛА УФМС РОССИИ ПО САНКТ-ПЕТЕРБУРГУ И ЛЕНИНГРАДСКОЙ ОБЛ. В ВЫБОРГСКОМ Р-НЕ Г. САНКТ-ПЕТЕРБУРГА',
} as const;

const TUCHKOVSKII = `
Паспорт выдан
ТП №9 ОТДЕЛА УФМС РОССИИ ПО САНКТ-ПЕТЕРБУРГУ И ЛЕНИНГРАДСКОЙ ОБЛ. В ВЫБОРГСКОМ Р-НЕ Г. САНКТ-ПЕТЕРБУРГА
10.11.2014 780-009
Фамилия
ТУЧКОВСКИЙ
Имя
ЯРОСЛАВ
Отчество
ВЛАДИМИРОВИЧ
40 14 134952
`;

function word(
  text: string,
  y: number,
  height: number,
  confidence = 90,
  x = 100,
  zone?: 'top' | 'bottom',
): PassportOcrWord {
  return {
    text,
    x,
    y,
    width: text.length * 10,
    height,
    confidence,
    zone,
  };
}

const TUCHKOVSKII_WORDS: Array<PassportOcrWord> = [
  word('мелкий', 100, 10, 40, 100, 'top'),
  word('Фамилия', 200, 11, 50, 100, 'top'),
  word('ТП', 300, 21, 95, 100, 'top'),
  word('№9', 300, 22, 95, 160, 'top'),
  word('ОТДЕЛА', 302, 26, 96, 220, 'top'),
  word('УФМС', 304, 22, 97, 320, 'top'),
  word('РОССИИ', 306, 23, 96, 400, 'top'),
  word('ПО', 308, 21, 96, 500, 'top'),
  word('САНКТ-ПЕТЕРБУРГУ', 340, 37, 72, 120, 'top'),
  word('И', 360, 22, 94, 300, 'top'),
  word('ЛЕНИНГРАДСКОЙ', 360, 30, 97, 340, 'top'),
  word('ОБЛ.', 362, 23, 93, 520, 'top'),
  word('В', 390, 22, 91, 100, 'top'),
  word('ВЫБОРГСКОМ', 400, 27, 95, 140, 'top'),
  word('Р-НЕ', 402, 24, 97, 300, 'top'),
  word('Г.', 404, 22, 95, 380, 'top'),
  word('САНКТ-ПЕТЕРБУРГА', 404, 41, 91, 420, 'top'),
  word('10.11.2014', 460, 28, 94, 200, 'top'),
  word('780-009', 462, 25, 80, 400, 'top'),
  word('ТУЧКОВСКИЙ', 700, 27, 83, 300, 'bottom'),
  word('ЯРОСЛАВ', 760, 23, 94, 320, 'bottom'),
  word('ВЛАДИМИРОВИЧ', 820, 29, 96, 300, 'bottom'),
  word('ЗЛОСТИ', 500, 12, 30, 50, 'top'),
  word('9520', 900, 10, 20, 800, 'bottom'),
  word('080139', 920, 11, 25, 800, 'bottom'),
];

describe('russian passport for agreement', () => {
  it('fills ФИО, серия, номер, документ, дата and кем выдан in Cyrillic', () => {
    expect(parseRussianPassport(TUCHKOVSKII)).toMatchObject(EXPECTED);
  });

  it('uses only large OCR text and ignores small label noise', () => {
    const parsed = parseRussianPassportOcr(TUCHKOVSKII_WORDS, '40 14 134952');
    expect(parsed).toMatchObject(EXPECTED);
  });

  it('restores full кем выдан when OCR drops ОБЛ./В/Г. and ignores strip garbage', () => {
    // Live OCR often drops 1–2 letter particles and leaks red-strip digits.
    const liveLike: Array<PassportOcrWord> = [
      word('ТП', 100, 22, 95, 100, 'top'),
      word('Nº9', 100, 22, 90, 140, 'top'),
      word('ОТДЕЛА', 102, 24, 95, 200, 'top'),
      word('УФМС', 104, 22, 95, 300, 'top'),
      word('РОССИИ', 106, 23, 95, 380, 'top'),
      word('ПО', 108, 21, 95, 460, 'top'),
      word('САНКТ-ПЕТЕРБУРГУ', 140, 30, 80, 120, 'top'),
      word('И', 160, 14, 70, 300, 'top'),
      word('ЛЕНИНГРАДСКОЙ', 160, 28, 95, 340, 'top'),
      // ОБЛ. and В missing (too small / low confidence in live runs)
      word('ВЫБОРГСКОМ', 200, 26, 95, 140, 'top'),
      word('Р-НЕ', 202, 22, 95, 320, 'top'),
      // Г. САНКТ-ПЕТЕРБУРГА missing
      word('10.11.2014', 260, 26, 94, 100, 'top'),
      word('780-009', 262, 24, 80, 280, 'top'),
      word('9520', 250, 28, 88, 800, 'top'),
      word('080139', 280, 26, 85, 800, 'top'),
      word('ТУЧКОВСКИЙ', 500, 28, 90, 100, 'bottom'),
      word('ЯРОСЛАВ', 540, 24, 94, 100, 'bottom'),
      word('ВЛАДИМИРОВИЧ', 580, 28, 92, 100, 'bottom'),
    ];

    const parsed = parseRussianPassportOcr(
      liveLike,
      // Red strip OCR noise + real series/number mixed together
      '9520\n080139\n780009\n40 14\n134952\n9 5 2 0',
    );
    expect(parsed.fullName).toBe(EXPECTED.fullName);
    expect(parsed.series).toBe(EXPECTED.series);
    expect(parsed.number).toBe(EXPECTED.number);
    expect(parsed.issueDate).toBe(EXPECTED.issueDate);
    expect(parsed.issuedBy).toBe(EXPECTED.issuedBy);
  });

  it('picks series ending with issue year, not MRZ / unit-code digits', () => {
    const parsed = parseRussianPassportOcr(TUCHKOVSKII_WORDS, '9520 080139 780009');
    // No 4014 / MRZ body — must stay empty rather than invent 9520/080139.
    expect(parsed.series).toBe('');
    expect(parsed.number).toBe('');

    const withReal = parseRussianPassportOcr(
      TUCHKOVSKII_WORDS,
      '080139 9520 4014 134952 780009',
    );
    expect(withReal.series).toBe('4014');
    expect(withReal.number).toBe('134952');
  });

  it('fills series/number from MRZ when the red strip is empty', () => {
    const parsed = parseRussianPassportOcr(
      TUCHKOVSKII_WORDS,
      'PNRUSTUCHKOVSKIY<<YAROSLAV<VLADIMIROVICH<<<<<<\n4011349529RUS8512165M<<<<<<<1411110780009<88',
    );
    expect(parsed.series).toBe('4014');
    expect(parsed.number).toBe('134952');
    expect(parsed.issueDate).toBe('10.11.2014');
  });

  it('rejects MRZ 4↔5 noise (135952) via check digit and keeps 134952', () => {
    const parsed = parseRussianPassportOcr(
      TUCHKOVSKII_WORDS,
      // 4011359529 fails ICAO check; repaired body yields 134952.
      '4011359529RUS8512165M<<<<<<<1411110780009<88',
    );
    expect(parsed.series).toBe('4014');
    expect(parsed.number).toBe('134952');
  });

  it('fixes ПО ПИ И into САНКТ-ПЕТЕРБУРГУ', () => {
    const words: Array<PassportOcrWord> = [
      word('ТП', 100, 22, 95, 100, 'top'),
      word('№9', 100, 22, 95, 140, 'top'),
      word('ОТДЕЛА', 102, 24, 95, 200, 'top'),
      word('УФМС', 104, 22, 95, 300, 'top'),
      word('РОССИИ', 106, 23, 95, 380, 'top'),
      word('ПО', 108, 21, 95, 460, 'top'),
      word('ПИ', 110, 20, 70, 500, 'top'),
      word('И', 112, 20, 90, 540, 'top'),
      word('ЛЕНИНГРАДСКОЙ', 114, 28, 95, 560, 'top'),
      word('ОБЛ.', 116, 22, 93, 700, 'top'),
      word('В', 140, 20, 90, 100, 'top'),
      word('ВЫБОРГСКОМ', 142, 26, 95, 140, 'top'),
      word('Р-НЕ', 144, 22, 95, 320, 'top'),
      word('Г.', 146, 20, 90, 380, 'top'),
      word('САНКТ-ПЕТЕРБУРГА', 148, 30, 90, 420, 'top'),
      word('10.11.2014', 200, 26, 94, 100, 'top'),
      word('780-009', 202, 24, 80, 280, 'top'),
      word('ТУЧКОВСКИЙ', 500, 28, 90, 100, 'bottom'),
      word('ЯРОСЛАВ', 540, 24, 94, 100, 'bottom'),
      word('ВЛАДИМИРОВИЧ', 580, 28, 92, 100, 'bottom'),
    ];
    const parsed = parseRussianPassportOcr(
      words,
      '4011349529RUS8512165M<<<<<<<1411110780009<88',
    );
    expect(parsed.issuedBy).toBe(EXPECTED.issuedBy);
    expect(parsed.series).toBe('4014');
    expect(parsed.number).toBe('134952');
  });

  it('does not treat birthplace as patronymic and stops issuedBy before FIO', () => {
    const messy: Array<PassportOcrWord> = [
      word('ТП', 100, 22, 90, 100, 'top'),
      word('Nº9', 100, 22, 90, 140, 'top'),
      word('ОТДЕЛА', 102, 24, 95, 200, 'top'),
      word('УФМС', 104, 22, 95, 300, 'top'),
      word('РОССИИ', 106, 23, 95, 380, 'top'),
      word('ПО', 108, 21, 95, 460, 'top'),
      word('И', 110, 20, 90, 500, 'top'),
      word('ЛЕНИНГРАДСКОЙ', 112, 28, 95, 520, 'top'),
      word('ОБЛ.', 114, 22, 93, 700, 'top'),
      word('Б', 140, 20, 85, 100, 'top'),
      word('БЫБОРГСКОМ', 142, 26, 90, 140, 'top'),
      word('Р-НЕ', 144, 22, 95, 320, 'top'),
      word('ТУЧКОВСКИЙ', 200, 26, 90, 100, 'top'),
      word('ЯРОСЛАВ', 220, 24, 92, 100, 'top'),
      word('ГОР.', 240, 22, 90, 100, 'top'),
      word('НАВЕРЕЖНЫЕ', 260, 24, 88, 100, 'top'),
      word('ЧЕЛНЫ', 280, 22, 90, 100, 'top'),
      word('№', 300, 20, 80, 100, 'top'),
      word('88', 300, 20, 80, 140, 'top'),
      word('10.11.2014', 320, 26, 94, 100, 'top'),
      word('780-009', 322, 24, 80, 280, 'top'),
      word('ТУЧКОВСКИЙ', 500, 28, 90, 100, 'bottom'),
      word('ЯРОСЛАВ', 540, 24, 94, 100, 'bottom'),
      word('БЛАДИМИРОВИЧ', 580, 28, 92, 100, 'bottom'),
    ];

    const parsed = parseRussianPassportOcr(messy, '40 14\n134952');
    expect(parsed.fullName).toBe(EXPECTED.fullName);
    expect(parsed.series).toBe(EXPECTED.series);
    expect(parsed.number).toBe(EXPECTED.number);
    expect(parsed.issueDate).toBe(EXPECTED.issueDate);
    expect(parsed.issuedBy).toMatch(/ТП №9 ОТДЕЛА УФМС РОССИИ ПО/i);
    expect(parsed.issuedBy).toMatch(/САНКТ-ПЕТЕРБУРГУ И ЛЕНИНГРАДСКОЙ ОБЛ\. В ВЫБОРГСКОМ Р-НЕ/i);
    expect(parsed.issuedBy).toMatch(/Г\. САНКТ-ПЕТЕРБУРГА/i);
    expect(parsed.issuedBy).not.toMatch(/ТУЧКОВСКИЙ|НАБЕРЕЖ|ЧЕЛНЫ|ЯРОСЛАВ/i);
  });

  it('keeps agreement values in Cyrillic when saving form fields', () => {
    expect(
      normalizeGapInput(
        'agreement.fullName',
        'ТУЧКОВСКИЙ ЯРОСЛАВ ВЛАДИМИРОВИЧ',
        true,
      ),
    ).toBe('ТУЧКОВСКИЙ ЯРОСЛАВ ВЛАДИМИРОВИЧ');
    expect(normalizeGapInput('agreement.series', '40 14', true)).toBe('4014');
    expect(normalizeGapInput('agreement.documentType', 'паспорт', true)).toBe(
      'паспорт',
    );
  });
});
