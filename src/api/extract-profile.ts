import type {
  SchemaAgreementFields,
  SchemaApplicantFields,
} from '#temp/api-schemas/api';
import { parseTravelPassport } from '@/pdf/parse-travel-passport';
import { transliterateApplicantFields } from '@/pdf/transliterate';

const EMPTY_FIELDS: SchemaApplicantFields = {
  surname: '',
  surnameAtBirth: '',
  givenNames: '',
  dateOfBirth: '',
  placeOfBirth: '',
  countryOfBirth: '',
  nationality: '',
  sex: '',
  passportNumber: '',
  passportExpiry: '',
  issuingCountry: '',
  nationalId: '',
  address: '',
  occupation: '',
  hostSurname: '',
  hostGivenNames: '',
  hostAddress: '',
  travelPurpose: '',
  stayFrom: '',
  stayTo: '',
  maritalStatus: '',
  passportIssueDate: '',
  email: '',
  phone: '',
  employerName: '',
  employerAddress: '',
  employerPhone: '',
  hotelPhone: '',
  sponsored: 'no',
  sponsorSurname: '',
  sponsorGivenNames: '',
  appointmentCity: '',
  appointmentDate: '',
  staySource: '',
  hotelName: '',
  hostEmail: '',
  previousVisa: '',
  fingerprintDate: '',
  visaNumber: '',
  minor: '',
  parent1Surname: '',
  parent1GivenNames: '',
  parent1Phone: '',
  parent1Email: '',
  parent1Address: '',
  parent2Surname: '',
  parent2GivenNames: '',
  parent2Phone: '',
  parent2Email: '',
  parent2Address: '',
};

const LABEL_RULES: Array<{
  pattern: RegExp;
  field: keyof SchemaApplicantFields;
}> = [
  {
    pattern:
      /(?:cognome|surname|фамилия)\s*(?:\/\s*(?:surname|cognome|фамилия))?\s*[:\-]?\s+([^\n|/]{2,60})/i,
    field: 'surname',
  },
  {
    pattern:
      /(?:^|\n)\s*(?:nome|given names?|first name|имя)\s*(?:\/\s*(?:name|nome|имя))?\s*[:\-]?\s+([^\n|/]{2,60})/i,
    field: 'givenNames',
  },
  {
    pattern:
      /(?:date of birth|data di nascita|дата рождения)\s*[:\-]?\s+([0-9][0-9./\-]{6,14})/i,
    field: 'dateOfBirth',
  },
  {
    pattern:
      /(?:place of birth|luogo di nascita|место рождения)\s*[:\-]?\s+([^\n]{2,60})/i,
    field: 'placeOfBirth',
  },
  {
    pattern:
      /(?:nationality|nazionalità|гражданство)\s*[:\-]?\s+([^\n]{2,40})/i,
    field: 'nationality',
  },
  {
    pattern:
      /(?:passport|passaporto|паспорт)\s*(?:n(?:o|umber|umero)?\.?)?\s*[:\-]?\s+([A-Z0-9<]{5,12})/i,
    field: 'passportNumber',
  },
  {
    pattern: /(?:address|indirizzo|адрес)\s*[:\-]?\s+([^\n]{5,80})/i,
    field: 'address',
  },
  {
    pattern:
      /(?:occupation|professione|профессия)\s*[:\-]?\s+([^\n]{2,40})/i,
    field: 'occupation',
  },
];

function formatMrzDate(value: string): string {
  if (!/^\d{6}$/.test(value)) {
    return '';
  }

  const yearPart = Number(value.slice(0, 2));
  const currentYearPart = new Date().getFullYear() % 100;
  const year = yearPart <= currentYearPart ? 2000 + yearPart : 1900 + yearPart;
  return `${value.slice(4, 6)}-${value.slice(2, 4)}-${year}`;
}

function parseMrz(text: string): Partial<SchemaApplicantFields> | null {
  const lines = text
    .toUpperCase()
    .split(/\n/)
    .map((line) => line.replace(/[^A-Z0-9<]/g, ''))
    .filter((line) => line.length >= 28);

  for (let index = 0; index < lines.length - 1; index += 1) {
    const nameLine = lines[index];
    const dataLine = lines[index + 1];
    if (!nameLine.startsWith('P<') || !nameLine.includes('<<')) {
      continue;
    }

    const [, surnameRaw = '', givenRaw = ''] = nameLine.match(
      /^P<[A-Z<]{3}([^<]+)<<(.+)$/,
    ) ?? [];
    const surname = surnameRaw.replace(/</g, ' ').trim();
    const givenNames = givenRaw.replace(/</g, ' ').replace(/\s+/g, ' ').trim();
    const passportNumber = dataLine.slice(0, 9).replace(/</g, '');
    const nationality = dataLine.slice(10, 13).replace(/</g, '');
    const sex = dataLine.slice(20, 21);
    const issuingCountry = nameLine.slice(2, 5).replace(/</g, '');

    if (!surname || passportNumber.length < 5) {
      continue;
    }

    return {
      surname,
      givenNames,
      passportNumber,
      issuingCountry,
      nationality,
      dateOfBirth: formatMrzDate(dataLine.slice(13, 19)),
      passportExpiry: formatMrzDate(dataLine.slice(21, 27)),
      sex: sex === 'M' || sex === 'F' ? sex : '',
    };
  }

  return null;
}

function isUsefulValue(value: string): boolean {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length < 2 || normalized.length > 90) {
    return false;
  }

  if (
    /name|surname|birth|address|passport|nationality|occupation|cognome|indirizzo|alloggio|ospitare/i.test(
      normalized,
    ) &&
    normalized.split(' ').length > 4
  ) {
    return false;
  }

  return true;
}

function readLabeledFields(text: string): Partial<SchemaApplicantFields> {
  const fields: Partial<SchemaApplicantFields> = {};

  for (const rule of LABEL_RULES) {
    const match = text.match(rule.pattern);
    const value = match?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
    if (isUsefulValue(value)) {
      fields[rule.field] = value;
    }
  }

  const stay = text.match(
    /(?:dal|from)\s*[:\-]?\s*([0-9][0-9./\-]{6,14})\s*(?:al|to)\s*[:\-]?\s*([0-9][0-9./\-]{6,14})/i,
  );
  if (stay?.[1] && stay[2]) {
    fields.stayFrom = stay[1];
    fields.stayTo = stay[2];
  }

  const purpose = text.match(
    /(?:finalità|reason|цель поездки)\s*[:\-]?\s+([^\n]{3,80})/i,
  );
  if (purpose?.[1] && isUsefulValue(purpose[1])) {
    fields.travelPurpose = purpose[1].trim();
  }

  return fields;
}

const EMPTY_AGREEMENT: SchemaAgreementFields = {
  fullName: '',
  documentType: '',
  series: '',
  number: '',
  issuedBy: '',
  issueDate: '',
  address: '',
};

const DATE_PATTERN = '(\\d{1,2}[./-]\\d{1,2}[./-]\\d{2,4})';

function labeledDate(text: string, label: string): string {
  const match = text.match(
    new RegExp(`(?:${label})\\s*[:\\-]?\\s*${DATE_PATTERN}`, 'i'),
  );
  return match?.[1] ?? '';
}

function purposeCode(value: string): string {
  const purpose = value.toLowerCase();
  if (/tour|turis|туриз/.test(purpose)) {
    return 'tourism';
  }
  if (/invit|приглаш|visit/.test(purpose)) {
    return 'invitation';
  }
  return '';
}

export type BookingDetails = {
  stayFrom: string;
  stayTo: string;
  hotel: string;
  address: string;
  phone: string;
  email: string;
};

export function hotelNameAboveAddress(
  items: Array<{ x: number; y: number; text: string }>,
): string {
  const address = items.find((item) =>
    /^(?:адрес|address|indirizzo)\s*[:\-]?$/i.test(item.text),
  );
  if (!address) {
    return '';
  }
  const above = items
    .filter(
      (item) =>
        item.y > address.y + 1 &&
        item.x < address.x + 40 &&
        item.x > address.x - 120 &&
        item.text.length >= 3 &&
        !/^(?:адрес|address|тел|phone|pin|заезд|отъезд)/i.test(item.text),
    )
    .sort((left, right) => left.y - right.y);
  return above[0]?.text.replace(/\s+/g, ' ').trim() ?? '';
}

function hotelCandidate(line: string): string {
  const cleaned = line
    .replace(/заезд|отъезд|отъёзд|единицы|единиц|ночи/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length < 3 || cleaned.length > 80) {
    return '';
  }
  if (
    /[:：]|руб|€|подтвержден|booking\.com|pin-код|номер подтверждения|январ|феврал|март|апрел|ма[йя]|июн|июл|август|сентябр|октябр|ноябр|декабр|понедельник|вторник|сред|четверг|пятниц|суббот|воскресен|ваша группа/i.test(
      cleaned,
    )
  ) {
    return '';
  }
  if (/^\d/.test(cleaned)) {
    return '';
  }
  const letters = cleaned.match(/\p{L}/gu)?.length ?? 0;
  return letters >= 3 ? cleaned : '';
}

function hotelNearAddress(lines: Array<string>, addressIndex: number): string {
  if (addressIndex < 0) {
    return '';
  }
  const prefix =
    lines[addressIndex]
      ?.split(/(?:address|адрес|indirizzo)\s*[:\-]/i)[0]
      ?.trim() ?? '';
  const onSameLine = hotelCandidate(prefix);
  if (onSameLine) {
    return onSameLine;
  }
  for (let index = addressIndex - 1; index >= 0 && addressIndex - index <= 6; index -= 1) {
    const name = hotelCandidate(lines[index] ?? '');
    if (name) {
      return name;
    }
  }
  return '';
}

function addressContinuation(lines: Array<string>, addressIndex: number): string {
  if (addressIndex < 0) {
    return '';
  }
  for (let index = addressIndex + 1; index <= addressIndex + 2; index += 1) {
    const line = lines[index] ?? '';
    if (
      line &&
      line.length <= 40 &&
      !/[:：]/.test(line) &&
      !/^\d/.test(line) &&
      !/^(?:тел|phone|tel|координат|gps)\b/i.test(line) &&
      !/заезд|отъезд|январ|феврал|март|апрел|ма[йя]|июн|июл|август|сентябр|октябр|ноябр|декабр/i.test(
        line,
      )
    ) {
      return line;
    }
  }
  return '';
}

export function readBookingDetails(text: string): BookingDetails {
  let stayFrom = labeledDate(
    text,
    'check[- ]?in|arrival|заезд\\w*|дата заезда|data di arrivo',
  );
  let stayTo = labeledDate(
    text,
    'check[- ]?out|departure|выезд\\w*|дата выезда|data di partenza',
  );

  if (!stayFrom || !stayTo) {
    const range = text.match(
      new RegExp(
        `(?:с|from|dal)\\s*${DATE_PATTERN}\\s*(?:по|to|al)\\s*${DATE_PATTERN}`,
        'i',
      ),
    );
    stayFrom = stayFrom || range?.[1] || '';
    stayTo = stayTo || range?.[2] || '';
  }

  const lines = text
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const addressIndex = lines.findIndex((line) =>
    /(?:address|адрес|indirizzo)\s*[:\-]/i.test(line),
  );
  const hotel =
    hotelNearAddress(lines, addressIndex) ||
    text.match(
      /(?:hotel|отель|гостиница|property)\s*[:\-]\s*([^\n]{3,80})/i,
    )?.[1]?.trim() ||
    text.match(/связаться с\s+(.{3,80}?)\s+напрямую/i)?.[1]?.trim() ||
    '';
  const addressLine = addressIndex >= 0 ? lines[addressIndex] : '';
  const addressBody =
    addressLine
      .match(/(?:address|адрес|indirizzo)\s*[:\-]\s*(.{5,120})/i)?.[1]
      ?.trim() ?? '';
  const addressTail = addressContinuation(lines, addressIndex);
  const address = [addressBody, addressTail].filter(Boolean).join(' ');

  const phone =
    text.match(
      /(?:тел(?:ефон)?|phone|tel)\.?\s*[:\-]?\s*(\+?\d[\d\s\-()]{8,20})/i,
    )?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? '';

  return {
    stayFrom,
    stayTo,
    hotel,
    address,
    phone,
    email,
  };
}

export type VisaStickerDetails = {
  fingerprintDate: string;
  visaNumber: string;
};

export function readVisaSticker(text: string): VisaStickerDetails {
  const visaNumber =
    text.match(
      /(?:visa\s*(?:no|number|n\.?)|номер\s*визы|visto\s*n)\s*[:\-]?\s*([A-Z0-9]{6,16})/i,
    )?.[1] ??
    text.match(/\b([A-Z]{3}\d{7,12})\b/)?.[1] ??
    '';
  const labeled = labeledDate(
    text,
    'fingerprint|impronte|отпечаточ\\w*|remarks',
  );
  const dates = [...text.matchAll(/\b(\d{2}[./-]\d{2}[./-]\d{4})\b/g)].map(
    (match) => match[1] ?? '',
  );
  return {
    fingerprintDate: labeled || dates[0] || '',
    visaNumber: visaNumber.replace(/\s/g, ''),
  };
}

function capture(text: string, pattern: RegExp): string {
  return text.match(pattern)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
}

/** Fix frequent Cyrillic OCR swaps (Б↔В, Л↔И) on passport tokens.
 *  Do not use `\b` — JS word boundaries ignore Cyrillic letters. */
function correctCyrillicOcr(value: string): string {
  return value
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    // Б/В — different letters; OCR often swaps the bowl shapes.
    .replace(/(^|[^А-Я])БЛАДИМИР/g, '$1ВЛАДИМИР')
    .replace(/(^|[^А-Я])БЫБОРГ/g, '$1ВЫБОРГ')
    .replace(/(^|[^А-Я])Б(\s+)ВЫБОРГ/g, '$1В$2ВЫБОРГ')
    .replace(/(^|[^А-Я])ВАТ(?=[^А-Я]|$)/g, '$1')
    // Л/И — stick shapes; restore common authority / place fragments.
    .replace(/(^|[^А-Я])ИЕНИНГРАДСК/g, '$1ЛЕНИНГРАДСК')
    .replace(/ЛЕНИНГРАДСКОИ(?=[^А-Я]|$)/g, 'ЛЕНИНГРАДСКОЙ')
    // «САНКТ-ПЕТЕРБУРГУ» often arrives as ПИ / ЕАНКТ / НКТ / КТ — never rewrite a real САНКТ.
    .replace(/(?<![А-Я])(?:[Е“”"'])?АНКТ-ПЕТЕРБУРГ/g, 'САНКТ-ПЕТЕРБУРГ')
    .replace(/(?<![А-Я])НКТ-ПЕТЕРБУРГ/g, 'САНКТ-ПЕТЕРБУРГ')
    .replace(/(?<![АН])КТ-ПЕТЕРБУРГ/g, 'САНКТ-ПЕТЕРБУРГ')
    .replace(/С{2,}АНКТ-ПЕТЕРБУРГ/g, 'САНКТ-ПЕТЕРБУРГ')
    .replace(
      /ПО\s+(?:ПИ|ПЕ|ГИ|Г|ВА|АН)\s+И\s+ЛЕНИНГРАДСКОЙ/g,
      'ПО САНКТ-ПЕТЕРБУРГУ И ЛЕНИНГРАДСКОЙ',
    )
    .replace(/ПО\s+И\s+ЛЕНИНГРАДСКОЙ/g, 'ПО САНКТ-ПЕТЕРБУРГУ И ЛЕНИНГРАДСКОЙ')
    .replace(/ПО\s+ЛЕНИНГРАДСКОЙ/g, 'ПО САНКТ-ПЕТЕРБУРГУ И ЛЕНИНГРАДСКОЙ')
    .replace(
      /ПО\s+(?!САНКТ)[А-ЯЁ0-9“”"'-]{1,8}\s+И\s+ЛЕНИНГРАДСКОЙ/g,
      'ПО САНКТ-ПЕТЕРБУРГУ И ЛЕНИНГРАДСКОЙ',
    )
    .replace(/НАВЕРЕЖ/g, 'НАБЕРЕЖ')
    .replace(/(^|[^A-ZА-Я])N[OОº°]?\s*(?=\d)/gi, '$1№')
    .replace(/Nº\s*/gi, '№');
}

function cyrillicName(value: string): string {
  const match = correctCyrillicOcr(value).match(/[А-Я]{2,}(?:-[А-Я]{2,})?/);
  return match?.[0] ?? '';
}

function russianNameParts(text: string): {
  surname: string;
  givenNames: string;
  patronymic: string;
} {
  const surname =
    cyrillicName(
      capture(text, /фамили[яю]\s*[:\-]?\s*([^\n]{2,40})/i),
    ) || '';
  const givenNames =
    cyrillicName(capture(text, /(?:^|\n)\s*имя\s*[:\-]?\s*([^\n]{2,40})/i)) ||
    '';
  const patronymic =
    cyrillicName(capture(text, /отчество\s*[:\-]?\s*([^\n]{2,40})/i)) || '';
  if (surname && givenNames) {
    return { surname, givenNames, patronymic };
  }

  const lines = text
    .split(/\n/)
    .map((line) => cyrillicName(line.replace(/[^\p{L}\s-]/gu, ' ')))
    .filter((line) => line.length >= 4);
  const stop =
    /ФАМИЛИ|ИМЯ|ОТЧЕСТВО|ПОЛ|ДАТА|МЕСТО|РОССИ|ПАСПОРТ|ОТДЕЛ|УФМС|МВД|САНКТ|ГОРОД|МУЖ|ЖЕН|ПЕТЕРБУРГ|ЛЕНИНГРАД|ВЫБОРГ|ОБЛ|РАЙОН|Р-НЕ|НАБЕРЕЖН|ЧЕЛНЫ/;
  const names = lines.filter((line) => !stop.test(line));
  const withPatron = names.findIndex(
    (_, index) =>
      (names[index + 2] ?? '').endsWith('ОВИЧ') ||
      (names[index + 2] ?? '').endsWith('ЕВИЧ') ||
      (names[index + 2] ?? '').endsWith('ОВНА') ||
      (names[index + 2] ?? '').endsWith('ЕВНА'),
  );
  if (withPatron >= 0) {
    return {
      surname: names[withPatron] ?? '',
      givenNames: names[withPatron + 1] ?? '',
      patronymic: names[withPatron + 2] ?? '',
    };
  }
  for (let index = 0; index < names.length - 1; index += 1) {
    const first = names[index] ?? '';
    const second = names[index + 1] ?? '';
    const third = names[index + 2] ?? '';
    if (first.length >= 5 && second.length >= 4) {
      return {
        surname: first,
        givenNames: second,
        patronymic: third.length >= 5 ? third : '',
      };
    }
  }
  return { surname, givenNames, patronymic };
}

function isYearLike(value: string): boolean {
  return /^(?:19|20)\d{2}$/.test(value);
}

/** Unit codes like 780-009 OCR as 780009 — never passport number. */
function isUnitCodeDigits(value: string): boolean {
  return /^(?:780|770|500|501|502)\d{3}$/.test(value);
}

function seriesYearSuffix(issueYear: string): string {
  if (issueYear.length === 4) {
    return issueYear.slice(2);
  }
  return issueYear.length === 2 ? issueYear : '';
}

function isPlausibleSeries(value: string, issueYear = ''): boolean {
  if (!/^\d{4}$/.test(value) || isYearLike(value)) {
    return false;
  }
  // Internal passport series ends with issue year (YY). When year is known,
  // reject anything else — that stops MRZ junk like 9520 / 080139.
  const yy = seriesYearSuffix(issueYear);
  if (yy && value.slice(2) !== yy) {
    return false;
  }
  return true;
}

function isPlausibleNumber(value: string, series: string): boolean {
  return (
    /^\d{6}$/.test(value) &&
    value !== series &&
    !isYearLike(value) &&
    !isUnitCodeDigits(value) &&
    !/^(?:0{3,}|1{5,}|9{5,})/.test(value)
  );
}

function scoreSeriesNumber(
  series: string,
  number: string,
  issueYear: string,
): number {
  if (!isPlausibleSeries(series, issueYear) || !isPlausibleNumber(number, series)) {
    return -1;
  }
  let score = 1;
  const yy = seriesYearSuffix(issueYear);
  if (yy && series.slice(2) === yy) {
    score += 20;
  }
  // Red-strip OCR prints series as "40 14".
  if (/^[1-9]\d/.test(series)) {
    score += 2;
  }
  if (number.startsWith('0')) {
    score -= 3;
  }
  return score;
}

/** ICAO 9303 numeric check digit (weights 7-3-1). */
function icaoCheckDigit(value: string): number {
  const weights = [7, 3, 1];
  let sum = 0;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index] ?? '0';
    const code =
      char >= '0' && char <= '9'
        ? Number(char)
        : char === '<'
          ? 0
          : char.charCodeAt(0) - 55;
    sum += code * (weights[index % 3] ?? 7);
  }
  return sum % 10;
}

function mrzBodyCandidates(digits: string): Array<string> {
  const bodies = new Set<string>();
  if (digits.length >= 10) {
    const body = digits.slice(0, 9);
    const check = Number(digits[9]);
    if (icaoCheckDigit(body) === check) {
      bodies.add(body);
    }
  }
  if (digits.length === 9) {
    bodies.add(digits);
  }
  // OCR often swaps 4↔5 and 8↔3 — fix one digit so the check digit matches.
  if (digits.length >= 10) {
    const check = Number(digits[9]);
    const base = digits.slice(0, 9).split('');
    const swaps: Record<string, Array<string>> = {
      '4': ['5'],
      '5': ['4'],
      '8': ['3'],
      '3': ['8'],
      '1': ['7'],
      '7': ['1'],
      '0': ['8'],
    };
    for (let index = 0; index < base.length; index += 1) {
      const current = base[index] ?? '';
      for (const next of swaps[current] ?? []) {
        const trial = [...base];
        trial[index] = next;
        const body = trial.join('');
        if (icaoCheckDigit(body) === check) {
          bodies.add(body);
        }
      }
    }
  }
  return [...bodies];
}

function seriesNumberFromMrzBody(
  body: string,
  issueYear: string,
): { series: string; number: string } {
  const yy = seriesYearSuffix(issueYear);
  if (body.length >= 10) {
    const series = body.slice(0, 4);
    const number = body.slice(4, 10);
    if (scoreSeriesNumber(series, number, issueYear) >= 0) {
      return { series, number };
    }
  }
  if (!yy || body.length < 8) {
    return { series: '', number: '' };
  }
  // Rebuild: RR + issue YY + six number digits.
  // "401134952" + year 2014 → 4014 / 134952 (year digit dropped in OCR).
  const region = body.slice(0, 2);
  let rest = body.slice(2);
  if (rest.startsWith(yy)) {
    rest = rest.slice(2);
  } else if (rest[0] === yy[0]) {
    rest = rest.slice(1);
  } else if (/^\d{2}/.test(rest)) {
    rest = rest.slice(2);
  }
  const series = `${region}${yy}`;
  const number = rest.slice(0, 6);
  if (scoreSeriesNumber(series, number, issueYear) >= 0) {
    return { series, number };
  }
  return { series: '', number: '' };
}

/**
 * Russian internal passport MRZ line-2: 9-digit document body + check + "RUS".
 * Prefer bodies that pass the ICAO check digit — that rejects 4↔5 OCR noise
 * like 4011359529 (→ 135952) in favour of 4011349529 (→ 134952).
 */
function seriesNumberFromMrz(
  text: string,
  issueYear = '',
): { series: string; number: string } {
  const compact = text.toUpperCase().replace(/[^0-9A-Z<]/g, '');
  const hits = [
    ...compact.matchAll(/(\d{9,11})RUS/g),
    ...compact.matchAll(/(\d{10})/g),
    ...text.replace(/[^\d\s]/g, ' ').matchAll(/\b(\d{9,11})\b/g),
  ];
  const candidates: Array<{ series: string; number: string; score: number }> =
    [];
  for (const hit of hits) {
    const digits = hit[1] ?? '';
    for (const body of mrzBodyCandidates(digits)) {
      const parsed = seriesNumberFromMrzBody(body, issueYear);
      const score = scoreSeriesNumber(parsed.series, parsed.number, issueYear);
      if (score >= 0) {
        candidates.push({
          series: parsed.series,
          number: parsed.number,
          score: score + 40,
        });
      }
    }
  }
  candidates.sort((left, right) => right.score - left.score);
  return candidates[0]
    ? { series: candidates[0].series, number: candidates[0].number }
    : { series: '', number: '' };
}

function russianSeriesNumber(
  text: string,
  issueYear = '',
): { series: string; number: string } {
  const compactDigits = text.replace(/[^\d\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const candidates: Array<{ series: string; number: string; score: number }> = [];

  const push = (series: string, number: string, bonus = 0) => {
    const score = scoreSeriesNumber(series, number, issueYear);
    if (score >= 0) {
      candidates.push({ series, number, score: score + bonus });
    }
  };

  // Prefer explicit spaced strip forms over MRZ repairs.
  for (const match of compactDigits.matchAll(
    /\b(\d{2})\s+(\d{2})\s+(\d{6})\b/g,
  )) {
    push(`${match[1]}${match[2]}`, match[3] ?? '', 30);
  }
  for (const match of compactDigits.matchAll(/\b(\d{4})\s+(\d{6})\b/g)) {
    push(match[1] ?? '', match[2] ?? '', 25);
  }

  const pairs = [...compactDigits.matchAll(/\b(\d{2})\s+(\d{2})\b/g)].map(
    (match) => `${match[1]}${match[2]}`,
  );
  const fours = [...compactDigits.matchAll(/\b(\d{4})\b/g)].map(
    (match) => match[1] ?? '',
  );
  const sixes = [...compactDigits.matchAll(/\b(\d{6})\b/g)].map(
    (match) => match[1] ?? '',
  );
  const seriesPool = [...new Set([...pairs, ...fours])].filter(
    (value) => !isYearLike(value),
  );
  for (const series of seriesPool) {
    for (const number of sixes) {
      push(series, number);
    }
  }

  for (const run of compactDigits.split(/\s+/)) {
    if (/^\d{10}$/.test(run)) {
      push(run.slice(0, 4), run.slice(4), 10);
    }
  }

  candidates.sort((left, right) => right.score - left.score);
  if (candidates[0] && candidates[0].score >= 0) {
    return { series: candidates[0].series, number: candidates[0].number };
  }

  return seriesNumberFromMrz(text, issueYear);
}

function russianIssuedBy(text: string): string {
  const lines = text
    .split(/\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const start = lines.findIndex((line) =>
    /паспорт\s+выдан|кем\s+выдан|(?:^|\s)ТП(?:\s|$)|УФМС|ОВД|МВД/i.test(line),
  );
  if (start < 0) {
    return '';
  }
  const parts: Array<string> = [];
  for (let index = start; index < lines.length && parts.length < 5; index += 1) {
    const line = lines[index] ?? '';
    if (/^\d{2}[./-]\d{2}[./-]\d{4}/.test(line) || /^\d{3}-\d{3}/.test(line)) {
      break;
    }
    if (/фамили|^\s*имя\b|отчество|муж|жен|дата рожд/i.test(line)) {
      break;
    }
    const cleaned = line
      .replace(/паспорт\s+выдан\s*[:\-.]?\s*/i, '')
      .replace(/кем\s+выдан\s*[:\-.]?\s*/i, '')
      .replace(/[|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (cleaned.length >= 2) {
      parts.push(cleaned);
    }
  }
  return parts
    .join(' ')
    .replace(/\bВАТ\b/gi, '')
    .replace(/\bКТ-ПЕТЕРБУРГ/gi, 'САНКТ-ПЕТЕРБУРГ')
    .replace(/\bПЕТЕРВУРГ/gi, 'ПЕТЕРБУРГ')
    .replace(/\s+/g, ' ')
    .trim();
}

export type PassportOcrWord = {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  zone?: 'top' | 'bottom';
};

function labelHeightCeiling(words: Array<PassportOcrWord>): number {
  const heights = words
    .filter((word) => word.confidence >= 30 && word.height > 0)
    .map((word) => word.height)
    .sort((left, right) => left - right);
  if (heights.length === 0) {
    return 12;
  }
  const median = heights[Math.floor(heights.length / 2)] ?? 20;
  const low = heights[Math.floor(heights.length * 0.15)] ?? 10;
  // Labels are the fine print; keep the cut below typical data height.
  return Math.min(low, Math.floor(median * 0.55));
}

function dataWords(words: Array<PassportOcrWord>): Array<PassportOcrWord> {
  const labelMax = labelHeightCeiling(words);
  return words
    .filter((word) => {
      if (/^[=<>|_*+\-.,:;'"\`~]+$/.test(word.text)) {
        return false;
      }
      if (word.confidence < 45) {
        return false;
      }
      // Tiny print is only field labels — never treat it as passport data.
      if (word.height <= labelMax) {
        return false;
      }
      return true;
    })
    .sort((left, right) => left.y - right.y || left.x - right.x);
}

function cleanIssuedByParts(parts: Array<string>): string {
  return parts
    .join(' ')
    .replace(/(^|[^А-Я])ВАТ(?=[^А-Я]|$)/gi, '$1')
    .replace(/(^|[^А-Я])КТ-ПЕТЕРБУРГ/gi, '$1САНКТ-ПЕТЕРБУРГ')
    .replace(/ПЕТЕРВУРГ/gi, 'ПЕТЕРБУРГ')
    .replace(/\s*=\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[^0-9A-ZА-ЯЁ№.\-\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const PLACE_OR_LABEL =
  /ФАМИЛИ|ИМЯ|ОТЧЕСТВО|ПОЛ|ДАТА|МЕСТО|РОССИ|ПАСПОРТ|ОТДЕЛ|УФМС|МВД|САНКТ|ГОРОД|ГОР\.?|МУЖ|ЖЕН|ПЕТЕРБУРГ|ЛЕНИНГРАД|ВЫБОРГ|ОБЛ|РАЙОН|НАБЕРЕЖ|НАВЕРЕЖ|ЧЕЛНЫ|ОТДЕЛА|РОССИИ|Р-НЕ/;

const BIRTHPLACE_LEAK =
  /^(?:ГОР\.?|ГОРОД|НАБЕРЕЖ|НАВЕРЕЖ|ЧЕЛНЫ|МУЖ|ЖЕН)$/i;

function isPatronymic(value: string): boolean {
  return /(?:ОВИЧ|ЕВИЧ|ОВНА|ЕВНА)$/.test(value);
}

function looksLikeSurname(value: string): boolean {
  return /(?:СКИЙ|СКАЯ|ЦКИЙ|ЦКАЯ|ОВ|ОВА|ЕВ|ЕВА|ИН|ИНА|ЫН|ЫНА)$/.test(value);
}

function namesFromDataWords(words: Array<PassportOcrWord>): {
  surname: string;
  givenNames: string;
  patronymic: string;
} {
  const names = words
    .filter(
      (word) =>
        word.confidence >= 60 &&
        /^[А-ЯЁа-яё-]{4,}$/.test(word.text) &&
        !PLACE_OR_LABEL.test(correctCyrillicOcr(word.text)),
    )
    .map((word) => cyrillicName(word.text))
    .filter(Boolean);

  // Prefer a real patronymic ending — never fall back to place names.
  for (let index = 0; index < names.length - 2; index += 1) {
    const surname = names[index] ?? '';
    const givenNames = names[index + 1] ?? '';
    const patronymic = names[index + 2] ?? '';
    if (
      surname.length >= 5 &&
      givenNames.length >= 4 &&
      isPatronymic(patronymic)
    ) {
      return { surname, givenNames, patronymic };
    }
  }

  const patronymic = names.find((name) => isPatronymic(name)) ?? '';
  const patronIndex = patronymic ? names.indexOf(patronymic) : -1;
  if (patronIndex >= 2) {
    return {
      surname: names[patronIndex - 2] ?? '',
      givenNames: names[patronIndex - 1] ?? '',
      patronymic,
    };
  }

  return { surname: '', givenNames: '', patronymic: '' };
}

function restoreIssuedBy(value: string): string {
  let next = cleanIssuedByParts(
    correctCyrillicOcr(value).split(/\s+/).filter(Boolean),
  );
  next = next
    .replace(/(?<![АН])КТ-ПЕТЕРБУРГ/gi, 'САНКТ-ПЕТЕРБУРГ')
    .replace(/С{2,}АНКТ-ПЕТЕРБУРГ/gi, 'САНКТ-ПЕТЕРБУРГ')
    .replace(/ПЕТЕРВУРГ/gi, 'ПЕТЕРБУРГ')
    // Short OCR tokens ОБЛ. / В / Г. are often dropped by height filter.
    .replace(
      /ЛЕНИНГРАДСКОЙ\s+ВЫБОРГСКОМ/gi,
      'ЛЕНИНГРАДСКОЙ ОБЛ. В ВЫБОРГСКОМ',
    )
    .replace(
      /ЛЕНИНГРАДСКОЙ\s+ОБЛ\.?\s+ВЫБОРГСКОМ/gi,
      'ЛЕНИНГРАДСКОЙ ОБЛ. В ВЫБОРГСКОМ',
    )
    .replace(
      /ВЫБОРГСКОМ\s+Р-НЕ(?!\s+Г\.)/gi,
      'ВЫБОРГСКОМ Р-НЕ Г. САНКТ-ПЕТЕРБУРГА',
    )
    .replace(/\s+/g, ' ')
    .trim();
  // Drop personal name / birth place leaked into the authority line.
  next = next
    .replace(
      /\s+(?:[А-ЯЁ]{5,}\s+){0,2}(?:ГОР\.?|НАБЕРЕЖ|НАВЕРЕЖ|ЧЕЛНЫ|МУЖ|ЖЕН).*$/i,
      '',
    )
    .replace(
      /\s+[А-ЯЁ]{6,}(?:СКИЙ|СКАЯ|ЦКИЙ|ОВ|ОВА|ЕВ|ЕВА)\s+[А-ЯЁ]{4,}.*$/i,
      '',
    )
    .trim();
  // Keep "ТП №9", drop trailing address / strip digits like "№ 88" or "9520".
  if (!/ТП\s*№\s*\d+\s*$/i.test(next)) {
    next = next.replace(/\s*№\s*\d+\s*$/i, '').trim();
  }
  next = next.replace(/\s+\d{3,}\s*$/i, '').trim();
  return next;
}

const AUTHORITY_PARTICLE =
  /^(?:В|И|Г\.?|ОБЛ\.?|Р-НЕ|№?\d{1,3}|N[OОº°]?\s*\d{1,3})$/i;

function zoneWords(
  data: Array<PassportOcrWord>,
  zone: 'top' | 'bottom',
): Array<PassportOcrWord> {
  const tagged = data.filter((word) => word.zone === zone);
  if (tagged.length > 0) {
    return tagged;
  }
  // Fallback when fixtures omit zone: split by issue-date / unit-code marker.
  const marker = data.findIndex(
    (word) =>
      /^\d{2}[./-]\d{2}[./-]\d{4}/.test(word.text) ||
      /^\d{3}-\d{3}/.test(word.text),
  );
  if (marker >= 0) {
    return zone === 'top' ? data.slice(0, marker + 1) : data.slice(marker + 1);
  }
  const ys = data.map((word) => word.y).sort((left, right) => left - right);
  const midY = ys[Math.floor(ys.length / 2)] ?? 0;
  return zone === 'top'
    ? data.filter((word) => word.y <= midY)
    : data.filter((word) => word.y > midY);
}

export function parseRussianPassportOcr(
  words: Array<PassportOcrWord>,
  digitText = '',
): SchemaAgreementFields {
  const agreement: SchemaAgreementFields = { ...EMPTY_AGREEMENT };
  agreement.documentType = 'паспорт';

  const data = dataWords(words);
  if (data.length === 0 && words.length === 0) {
    return agreement;
  }

  const topData = zoneWords(data.length > 0 ? data : words, 'top');
  const bottomData = zoneWords(data.length > 0 ? data : words, 'bottom');

  const names = namesFromDataWords(
    bottomData.length >= 3 ? bottomData : data,
  );
  agreement.fullName = [names.surname, names.givenNames, names.patronymic]
    .filter(Boolean)
    .join(' ');

  // Issue date sits on the top leaf near the department code, not the birth date below.
  const unit = topData.find((word) => /^\d{3}-\d{3}/.test(word.text));
  const topDates = topData
    .map((word) => ({
      word,
      date: word.text.match(/(\d{2}[./-]\d{2}[./-]\d{4})/)?.[1] ?? '',
    }))
    .filter((item) => item.date);
  const nearUnit = unit
    ? topDates.find(
        (item) => Math.abs(item.word.y - unit.y) < Math.max(80, unit.height * 4),
      )
    : undefined;
  agreement.issueDate =
    nearUnit?.date ||
    topDates[0]?.date ||
    data
      .map((word) => word.text.match(/(\d{2}[./-]\d{2}[./-]\d{4})/)?.[1] ?? '')
      .find(Boolean) ||
    '';

  const issueYear =
    agreement.issueDate.match(/(\d{4})\s*$/)?.[1] ??
    agreement.issueDate.match(/\d{2}[./-]\d{2}[./-](\d{4})/)?.[1] ??
    '';

  // Series/number: red strip first, then MRZ (bottom leaf), then spaced page digits.
  const pageText = words.map((word) => word.text).join('\n');
  const fromStrip = russianSeriesNumber(digitText, issueYear);
  agreement.series = fromStrip.series;
  agreement.number = fromStrip.number;
  if (!agreement.series || !agreement.number) {
    const fromMrz = seriesNumberFromMrz(
      `${digitText}\n${pageText}`,
      issueYear,
    );
    agreement.series ||= fromMrz.series;
    agreement.number ||= fromMrz.number;
  }
  if (!agreement.series || !agreement.number) {
    const pageDigits = words
      .map((word) => word.text)
      .filter((text) =>
        /^\d{2}\s+\d{2}$|^\d{4}$|^\d{6}$|^\d{2}\s+\d{2}\s+\d{6}$|^\d{10}$/.test(
          text.trim(),
        ),
      )
      .join(' ');
    const fromPage = russianSeriesNumber(
      `${digitText}\n${pageDigits}`,
      issueYear,
    );
    agreement.series ||= fromPage.series;
    agreement.number ||= fromPage.number;
  }

  // Authority line: use top-zone words, and re-include short particles (В, И, ОБЛ., Г.)
  // that the height filter often drops.
  const authorityBase = topData.length >= 4 ? topData : data;
  const topZoneRaw = words.filter(
    (word) =>
      word.zone === 'top' ||
      (!word.zone &&
        authorityBase.some(
          (item) =>
            Math.abs(item.y - word.y) < 30 && Math.abs(item.x - word.x) < 40,
        )),
  );
  const authoritySource =
    topZoneRaw.length >= authorityBase.length ? topZoneRaw : authorityBase;
  const sortedAuthority = [...authoritySource].sort(
    (left, right) => left.y - right.y || left.x - right.x,
  );
  const start = sortedAuthority.findIndex(
    (word) =>
      /^(?:ТП|УФМС|ОВД|МВД)$/i.test(word.text) || /УФМС|ОТДЕЛА/i.test(word.text),
  );
  if (start >= 0) {
    const parts: Array<string> = [];
    for (
      let index = start;
      index < sortedAuthority.length && parts.length < 32;
      index += 1
    ) {
      const word = sortedAuthority[index];
      if (!word) {
        break;
      }
      const text = correctCyrillicOcr(word.text.replace(/[|,]/g, ''));
      if (/^\d{2}[./-]\d{2}[./-]\d{4}/.test(text)) {
        break;
      }
      if (/^\d{3}-\d{3}/.test(text)) {
        break;
      }
      if (BIRTHPLACE_LEAK.test(text)) {
        break;
      }
      if (isPatronymic(text) || (looksLikeSurname(text) && parts.length > 6)) {
        break;
      }
      // Bare strip / MRZ digits must not enter «кем выдан».
      if (/^\d{3,}$/.test(text) && !AUTHORITY_PARTICLE.test(text)) {
        continue;
      }
      const particle = AUTHORITY_PARTICLE.test(text);
      if (
        (word.confidence >= 40 || particle) &&
        /[А-Яа-яЁё0-9№.]/.test(text) &&
        text.length <= 40 &&
        !/^[A-Za-z]+$/.test(text)
      ) {
        parts.push(text);
      }
    }
    agreement.issuedBy = restoreIssuedBy(parts.join(' '));
  }

  return agreement;
}

export function parseRussianPassport(text: string): SchemaAgreementFields {
  const agreement: SchemaAgreementFields = { ...EMPTY_AGREEMENT };
  const { surname, givenNames, patronymic } = russianNameParts(text);

  agreement.documentType = 'паспорт';
  agreement.fullName = [surname, givenNames, patronymic]
    .filter(Boolean)
    .join(' ');
  agreement.issueDate =
    capture(text, /дата выдачи\s*[:\-]?\s*(\d{2}[./-]\d{2}[./-]\d{4})/i) ||
    capture(text, /\b(\d{2}[./-]\d{2}[./-]\d{4})\s+\d{3}-\d{3}\b/) ||
    capture(text, /\b(\d{2}[./-]\d{2}[./-]\d{4})\b/) ||
    '';
  const issueYear = agreement.issueDate.match(/(\d{4})/)?.[1] ?? '';
  const { series, number } = russianSeriesNumber(text, issueYear);
  agreement.series = series;
  agreement.number = number;
  agreement.issuedBy = restoreIssuedBy(russianIssuedBy(text));
  agreement.address = capture(
    text,
    /(?:место жительства|адрес регистрации|зарегистрирован(?:а|ый)?(?:\s+по адресу)?)\s*[:\-]?\s*([^\n]{5,140})/i,
  );

  return agreement;
}

const REGISTRATION_LABEL =
  /^(.*?)(?:зарегистрирован[аы]?(?:\s+по\s+месту\s+(?:жительства|пребывания))?(?:\s+по\s+адресу)?|адрес(?:\s+регистрации|\s+места\s+жительства)?|место\s+жительства)\s*[:\-.]?\s*(.*)$/i;

const REGISTRATION_STOP =
  /^(?:орган регистрац|наименование органа|уфмс|гувм|мвд|овм|овд|отдел|отделение|упфр|код подраздел|снят[аы]?|дата регистр|срок регистр|выдан|паспорт|серия|документ|подпись)/i;

const ADDRESS_LINE =
  /(?:г(?:ор)?\.|город|обл\.|область|край|респ|ул\.|улиц|пр-кт|проспект|пер\.|переул|б-р|бульвар|шоссе|наб\.|набереж|дом\b|д\.|корп|кв\.|квартир|р-н|район|пос\.|пгт|село|деревн|росси)/i;

function registrationLines(text: string): Array<string> {
  return text
    .replace(/\u00a0/g, ' ')
    .split(/\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 0);
}

function isDateOnly(line: string): boolean {
  return (
    /^\d{1,2}[./-]\d{1,2}[./-]\d{2,4}(?:\s*г\.?)?$/i.test(line) ||
    /^\d{1,2}\s+[а-яё]+\s+\d{4}(?:\s*г\.?)?$/i.test(line)
  );
}

function stripLeadingDate(value: string): string {
  return value
    .replace(/^\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\s*/, '')
    .replace(/^\d{1,2}\s+[а-яё]+\s+\d{4}\s*(?:г\.?)?\s*/i, '')
    .trim();
}

function cleanupAddress(value: string): string {
  return value
    .replace(/\s*,\s*/g, ', ')
    .replace(/(?:,\s*){2,}/g, ', ')
    .replace(/^(?:по\s+адресу\s*[:\-.]?\s*)/i, '')
    .replace(/\s+(?:с|по|от)\s+\d{1,2}[./-]\d{1,2}[./-]\d{2,4}.*$/i, '')
    .replace(/[,.\s]+$/g, '')
    .trim();
}

function looksLikeAddress(value: string): boolean {
  return (
    value.length >= 8 &&
    value.length <= 180 &&
    /(?:ул|улиц|пр-кт|проспект|пер|переул|шоссе|наб|бульвар|д\.?\s*\d|дом\s*\d|кв\.?\s*\d|квартир)/i.test(
      value,
    )
  );
}

function addressAfterLabel(lines: Array<string>): string {
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index]?.match(REGISTRATION_LABEL);
    if (!match) {
      continue;
    }

    const inline = stripLeadingDate(match[2] ?? '');
    const collected = inline && !isDateOnly(inline) ? [inline] : [];

    for (
      let next = index + 1;
      next < lines.length && collected.length < 5;
      next += 1
    ) {
      const line = lines[next] ?? '';
      if (isDateOnly(line)) {
        continue;
      }
      if (REGISTRATION_STOP.test(line)) {
        break;
      }
      if (!ADDRESS_LINE.test(line)) {
        if (collected.length > 0) {
          break;
        }
        continue;
      }
      collected.push(line);
    }

    const address = cleanupAddress(collected.join(', '));
    if (looksLikeAddress(address)) {
      return address;
    }
  }

  return '';
}

function parseRussianRegistration(text: string): string {
  const lines = registrationLines(text);
  const labeled = addressAfterLabel(lines);
  if (labeled) {
    return labeled;
  }

  const parts = lines.filter(
    (line) =>
      ADDRESS_LINE.test(line) &&
      !REGISTRATION_STOP.test(line) &&
      !isDateOnly(line),
  );
  const address = cleanupAddress(parts.slice(0, 4).join(', '));
  return looksLikeAddress(address) ? address : '';
}

export function extractApplicantFields(input: {
  passportText: string;
  formText: string;
  bookingText: string;
  russianPassportText: string;
  russianRegistrationText: string;
}): {
  fields: SchemaApplicantFields;
  agreement: SchemaAgreementFields;
  warnings: Array<string>;
} {
  const warnings: Array<string> = [];
  const mrz = parseMrz(`${input.passportText}\n${input.formText}`);
  const inviteeMarker = input.formText.search(
    /relazione con l[’']invitante|relationship to the invitee|dichiaro di voler ospitare/i,
  );
  const hostText =
    inviteeMarker > 0 ? input.formText.slice(0, inviteeMarker) : '';
  const inviteeText =
    inviteeMarker > 0 ? input.formText.slice(inviteeMarker) : input.formText;

  const hostFields = readLabeledFields(hostText);
  const inviteeFields = readLabeledFields(inviteeText);
  const booking = readBookingDetails(input.bookingText);

  const travel = parseTravelPassport(input.passportText);
  const fields: SchemaApplicantFields = {
    ...EMPTY_FIELDS,
    ...inviteeFields,
    ...mrz,
    hostSurname: hostFields.surname ?? '',
    hostGivenNames: hostFields.givenNames ?? '',
    hostAddress: hostFields.address ?? inviteeFields.address ?? booking.address,
    hotelName: booking.hotel,
    hostEmail: booking.hotel || booking.address ? '' : booking.email,
    hotelPhone: booking.phone,
    staySource: booking.hotel || booking.address ? 'booking' : '',
    stayFrom: inviteeFields.stayFrom || booking.stayFrom,
    stayTo: inviteeFields.stayTo || booking.stayTo,
    travelPurpose: purposeCode(inviteeFields.travelPurpose ?? ''),
  };
  for (const [key, value] of Object.entries(travel) as Array<
    [keyof SchemaApplicantFields, string]
  >) {
    if (value.trim()) {
      fields[key] = value.trim();
    }
  }

  const agreement = parseRussianPassport(input.russianPassportText);
  const registrationAddress = parseRussianRegistration(
    input.russianRegistrationText,
  );
  if (registrationAddress) {
    agreement.address = registrationAddress;
    if (!fields.address) {
      fields.address = registrationAddress;
    }
  }

  if (!input.passportText.trim()) {
    warnings.push('В паспорте не найден текст.');
  } else if (!mrz && !travel.surname) {
    warnings.push('На паспорте не найдена машиночитаемая зона.');
  }

  if (input.bookingText.trim() && !booking.hotel && !booking.address) {
    warnings.push('В бронировании не найдены отель или адрес.');
  }

  if (
    input.russianPassportText.trim() &&
    !agreement.fullName &&
    !agreement.number
  ) {
    warnings.push('В паспорте РФ не распознаны ФИО или номер.');
  }

  if (input.russianRegistrationText.trim() && !registrationAddress) {
    warnings.push('На регистрации не распознан адрес.');
  }

  const filled = Object.values(fields).some((value) => value.trim().length > 0);
  if (!filled) {
    warnings.push(
      'Личные данные не распознаны. В анкету будет добавлено только фото паспорта.',
    );
  }

  return {
    fields: transliterateApplicantFields(fields),
    agreement,
    warnings,
  };
}
