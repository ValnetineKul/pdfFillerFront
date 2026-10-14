import type { SchemaApplicantFields } from './types.ts';

import { transliterateRussian } from './transliterate.ts';

const BIRTH_COUNTRIES = [
  'USSR',
  'RUSSIA',
  'UKRAINE',
  'BELARUS',
  'KAZAKHSTAN',
  'UZBEKISTAN',
  'GEORGIA',
  'ARMENIA',
  'AZERBAIJAN',
  'MOLDOVA',
  'LATVIA',
  'LITHUANIA',
  'ESTONIA',
  'KYRGYZSTAN',
  'TAJIKISTAN',
  'TURKMENISTAN',
];

const LATIN_SKIP =
  /RUSSIAN|FEDERATION|PASSPORT|USSR|AUTHORITY|NATIONAL|BIRTH|ISSUE|EXPIR|HOLDER|SIGNATURE|STATE|NUMBER|SURNAME|GIVEN|NAMES|PLACE|DATE|CODE|TYPE|SEX|NAME/;

const PAGE_WORDS = [
  'FEDERATION',
  'RUSSIAN',
  'PASSPORT',
  'AUTHORITY',
  'NATIONALITY',
  'SIGNATURE',
  'DOCUMENT',
  'REPUBLIC',
  'ISSUING',
  'HOLDER',
];

const HEADER_FORMS = [
  'ROSSIISKAIA',
  'ROSSIYSKAYA',
  'ROSSIISKAYA',
  'FEDERATSIIA',
  'FEDERATION',
  'RUSSIAN',
];

const CYRILLIC_LABEL =
  /ФАМИЛ|ИМЯ|ГРАЖД|ПАСПОРТ|РОССИ|ФЕДЕРАЦ|МЕСТО|РОЖДЕН|ДАТА|ВЫДАЧ|НОМЕР|ПОЛ|КОД/;

const PATRONYMIC_CYRILLIC = /(?:ОВИЧ|ЕВИЧ|ЁВИЧ|ОВНА|ЕВНА|ИЧНА)$/;
const PATRONYMIC_LATIN = /(?:OVICH|EVICH|YEVICH|OVNA|EVNA|ICHNA)$/;

function editDistance(left: string, right: string): number {
  const rows = Array.from({ length: left.length + 1 }, (_, index) => index);
  for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
    let diagonal = rows[0] ?? 0;
    rows[0] = rightIndex;
    for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
      const next = rows[leftIndex] ?? 0;
      const cost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      rows[leftIndex] = Math.min(
        (rows[leftIndex - 1] ?? 0) + 1,
        next + 1,
        diagonal + cost,
      );
      diagonal = next;
    }
  }
  return rows[left.length] ?? 0;
}

function linesOf(text: string): Array<string> {
  return text
    .replace(/\u00a0/g, ' ')
    .split(/\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function matchCountry(token: string): string {
  const clean = token.toUpperCase().replace(/[^A-Z]/g, '');
  if (clean.length < 3 || clean.length > 12) {
    return '';
  }
  if (/OBL|OBLAST|KRAI|REGION/.test(clean)) {
    return '';
  }

  let best = '';
  let bestDistance = 2;
  for (const country of BIRTH_COUNTRIES) {
    const distance = editDistance(clean, country);
    if (distance < bestDistance) {
      best = country;
      bestDistance = distance;
    }
  }
  return best || (clean.length <= 6 ? clean : '');
}

function parsePlace(text: string): { place: string; country: string } {
  for (const line of linesOf(text)) {
    const match = line.match(/(.+)\s+[\/|]\s+([A-ZА-ЯЁ0-9]{2,16})\s*$/i);
    if (!match?.[1] || !match[2]) {
      continue;
    }
    const country = matchCountry(match[2]);
    if (!country) {
      continue;
    }
    const place = match[1]
      .replace(/^.*?[MМFЖ]\s*[\/|]\s*[MМFЖ]\s*/i, '')
      .replace(/место рождения.*/i, '')
      .replace(/[^A-ZА-ЯЁа-яё0-9.\-\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (place.length >= 3) {
      return { place, country };
    }
  }
  return { place: '', country: '' };
}

function parseDates(text: string): { birth: string; expiry: string } {
  const found = new Map<string, Date>();
  for (const match of text.matchAll(/\b(\d{2})[.\s-](\d{2})[.\s-](\d{4})\b/g)) {
    const day = match[1] ?? '';
    const month = match[2] ?? '';
    const year = Number(match[3]);
    const date = new Date(year, Number(month) - 1, Number(day));
    if (
      year < 1920 ||
      year > 2100 ||
      date.getMonth() !== Number(month) - 1 ||
      date.getDate() !== Number(day)
    ) {
      continue;
    }
    found.set(`${day}.${month}.${year}`, date);
  }

  const ordered = [...found.entries()].sort(
    (left, right) => left[1].getTime() - right[1].getTime(),
  );
  const now = new Date();
  const birth =
    ordered.find(([, date]) => date.getFullYear() <= now.getFullYear() - 14)?.[0] ??
    '';
  const expiry =
    [...ordered]
      .reverse()
      .find(([, date]) => date.getFullYear() >= now.getFullYear())?.[0] ?? '';
  return { birth, expiry };
}

function parseSex(text: string): string {
  if (/[MМ]\s*[\/|]\s*[MМ]/.test(text)) {
    return 'M';
  }
  if (/[FЖ]\s*[\/|]\s*[FЖ]/.test(text)) {
    return 'F';
  }
  return '';
}

function parsePassportNumber(text: string): string {
  const counts = new Map<string, number>();
  for (const match of text.matchAll(/\b(\d{2})\s+(\d{7})\b/g)) {
    const number = `${match[1]}${match[2]}`;
    counts.set(number, (counts.get(number) ?? 0) + 1);
  }
  const compact = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const mrzChunk = compact.match(/(\d{7,10})RUS/)?.[1] ?? '';
  const mrzBody = mrzChunk.length >= 8 ? mrzChunk.slice(0, -1) : mrzChunk;
  const windows = new Set<string>();
  for (let index = 0; index + 6 <= mrzBody.length; index += 1) {
    windows.add(mrzBody.slice(index, index + 6));
  }
  const ranked = [...counts.entries()].sort((left, right) => {
    const leftHit = [...windows].some((window) => left[0].includes(window)) ? 1 : 0;
    const rightHit = [...windows].some((window) => right[0].includes(window)) ? 1 : 0;
    if (leftHit !== rightHit) {
      return rightHit - leftHit;
    }
    return right[1] - left[1];
  });
  return ranked[0]?.[0] ?? '';
}

const CYRILLIC_HEADERS = ['РОССИЙСКАЯ', 'ФЕДЕРАЦИЯ', 'ПАСПОРТ', 'ФАМИЛИЯ'];

function isHeaderFragment(word: string): boolean {
  return HEADER_FORMS.some((header) => word.length >= 5 && header.includes(word));
}

function isCyrillicHeader(word: string): boolean {
  return CYRILLIC_HEADERS.some((header) => word.length >= 5 && header.includes(word));
}

function isPlaceLine(line: string): boolean {
  return /обл|край|район|ссср|мвд|oblast|federation|росси/i.test(line);
}

function cyrillicNames(line: string): Array<string> {
  return (line.match(/[А-ЯЁ]{4,}/g) ?? []).filter(
    (word) =>
      word === word.toUpperCase() &&
      !CYRILLIC_LABEL.test(word) &&
      !isCyrillicHeader(word),
  );
}

function bestAgreed(tokens: Array<string>, expected: string): string {
  const agreed = tokens.filter(
    (token) => namesAgree(token, expected) && !isPatronymicLatin(token),
  );
  agreed.sort((left, right) => {
    const leftExact = left === expected ? 1 : 0;
    const rightExact = right === expected ? 1 : 0;
    if (leftExact !== rightExact) {
      return rightExact - leftExact;
    }
    const leftPrefix = expected.startsWith(left) ? left.length : 0;
    const rightPrefix = expected.startsWith(right) ? right.length : 0;
    if (leftPrefix !== rightPrefix) {
      return rightPrefix - leftPrefix;
    }
    return right.length - left.length;
  });
  return agreed[0] ?? '';
}

function completeName(latin: string, expected: string): string {
  if (
    expected.startsWith(latin) &&
    expected.length > latin.length &&
    expected.length - latin.length <= 3
  ) {
    return expected;
  }
  return latin;
}

function isPageWord(word: string): boolean {
  if (LATIN_SKIP.test(word) || isHeaderFragment(word)) {
    return true;
  }

  return PAGE_WORDS.some(
    (pageWord) =>
      Math.abs(pageWord.length - word.length) <= 2 &&
      editDistance(pageWord, word) <= 2,
  );
}

function latinTokens(text: string): Array<string> {
  const tokens: Array<string> = [];
  for (const match of text.toUpperCase().matchAll(/\b[A-Z]{4,}\b/g)) {
    const word = match[0] ?? '';
    if (!word || isPageWord(word) || tokens.includes(word)) {
      continue;
    }
    tokens.push(word);
  }
  return tokens;
}

function namesAgree(left: string, right: string): boolean {
  if (!left || !right) {
    return false;
  }
  return (
    editDistance(left, right) <= 2 ||
    left.startsWith(right) ||
    right.startsWith(left)
  );
}

function isPatronymicLatin(word: string): boolean {
  return PATRONYMIC_LATIN.test(word);
}

function sectionBetween(
  lines: Array<string>,
  start: RegExp,
  end: RegExp,
): string {
  const from = lines.findIndex((line) => start.test(line));
  if (from < 0) {
    return '';
  }

  const body: Array<string> = [];
  for (const line of lines.slice(from, from + 6)) {
    if (body.length > 0 && end.test(line)) {
      break;
    }
    body.push(line);
  }
  return body.join('\n');
}

function surnameFromLines(lines: Array<string>): string {
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? '';
    if (isPlaceLine(line)) {
      continue;
    }
    const words = cyrillicNames(line);
    const name = words[0] ?? '';
    if (words.length !== 1 || !name || PATRONYMIC_CYRILLIC.test(name)) {
      continue;
    }
    const next = lines[index + 1] ?? '';
    if (!/[\/|]/.test(`${line} ${next}`)) {
      continue;
    }
    const expected = transliterateRussian(name).toUpperCase();
    const latin = bestAgreed(
      latinTokens(lines.slice(index, index + 3).join('\n')),
      expected,
    );
    if (latin) {
      return completeName(latin, expected);
    }
    if (expected && !isPatronymicLatin(expected) && !isPageWord(expected)) {
      return expected;
    }
  }

  const section = sectionBetween(lines, /фамили|surname/i, /имя|given/i);
  return latinTokens(section).find((token) => !isPatronymicLatin(token)) ?? '';
}

function givenFromLines(lines: Array<string>): string {
  for (let index = 0; index < lines.length; index += 1) {
    const words = cyrillicNames(lines[index] ?? '');
    if (!words.some((word) => PATRONYMIC_CYRILLIC.test(word))) {
      continue;
    }
    const givenCyrillic = words.find((word) => !PATRONYMIC_CYRILLIC.test(word));
    if (!givenCyrillic) {
      continue;
    }
    const expected = transliterateRussian(givenCyrillic).toUpperCase();
    const latin = bestAgreed(
      latinTokens(lines.slice(Math.max(0, index - 5), index + 2).join('\n')),
      expected,
    );
    if (latin) {
      return completeName(latin, expected);
    }
    if (expected && !isPageWord(expected)) {
      return expected;
    }
  }

  const section = sectionBetween(
    lines,
    /имя|given/i,
    /граждан|nationality|дата|date of birth|рожден/i,
  );
  const latin = latinTokens(section).find((token) => !isPatronymicLatin(token));
  if (latin) {
    return latin;
  }
  const givenCyrillic = cyrillicNames(section).find(
    (word) => !PATRONYMIC_CYRILLIC.test(word),
  );
  return givenCyrillic ? transliterateRussian(givenCyrillic).toUpperCase() : '';
}

function resolveTravelName(
  labeled: string,
  slash: string,
  mrzName: string,
): string {
  const visual = labeled || slash;
  if (visual && !isPatronymicLatin(visual)) {
    if (
      mrzName &&
      namesAgree(visual, mrzName) &&
      mrzName.startsWith(visual) &&
      mrzName.length - visual.length > 1
    ) {
      return mrzName;
    }
    return visual;
  }
  return mrzName && !isPatronymicLatin(mrzName) ? mrzName : '';
}

function travelNames(
  text: string,
  mrz: Partial<SchemaApplicantFields>,
): { surname: string; givenNames: string } {
  const lines = linesOf(text);

  return {
    surname: resolveTravelName(surnameFromLines(lines), '', mrz.surname ?? ''),
    givenNames: resolveTravelName(
      givenFromLines(lines),
      '',
      (mrz.givenNames ?? '').split('<')[0] ?? '',
    ),
  };
}

function parseMrzFields(text: string): Partial<SchemaApplicantFields> {
  const compact = text.toUpperCase().replace(/[^A-Z0-9<]/g, '');
  const name = compact.match(/P<RUS([A-Z]{4,})<<([A-Z]{4,})/);
  const data = compact.match(/RUS(\d{6})\d([MF<])(\d{6})/);
  const fields: Partial<SchemaApplicantFields> = {};
  if (name?.[1] && name[2]) {
    fields.surname = name[1];
    fields.givenNames = name[2];
    fields.issuingCountry = 'RUS';
    fields.nationality = 'RUS';
  }
  if (data?.[1] && data[3]) {
    const birth = data[1];
    const expiry = data[3];
    fields.dateOfBirth = `${birth.slice(4, 6)}.${birth.slice(2, 4)}.${birthYear(birth.slice(0, 2))}`;
    fields.passportExpiry = `${expiry.slice(4, 6)}.${expiry.slice(2, 4)}.${2000 + Number(expiry.slice(0, 2))}`;
    if (data[2] === 'M' || data[2] === 'F') {
      fields.sex = data[2];
    }
    fields.issuingCountry = 'RUS';
    fields.nationality = 'RUS';
  }
  return fields;
}

function birthYear(yearPart: string): number {
  const value = Number(yearPart);
  const current = new Date().getFullYear() % 100;
  return value <= current ? 2000 + value : 1900 + value;
}

export function parseTravelPassport(
  text: string,
): Partial<SchemaApplicantFields> {
  const mrz = parseMrzFields(text);
  const names = travelNames(text, mrz);
  const place = parsePlace(text);
  const dates = parseDates(text);
  const number = parsePassportNumber(text);
  const issuingCountry =
    /\bRUS\b|P<RUS|<RUS|РОССИЙСК/i.test(text) || mrz.issuingCountry === 'RUS'
      ? 'RUS'
      : mrz.issuingCountry || '';

  const surname = names.surname;
  const givenNames = names.givenNames;

  return {
    surname: surname || mrz.surname || '',
    givenNames: givenNames || mrz.givenNames || '',
    dateOfBirth: dates.birth || mrz.dateOfBirth || '',
    sex: parseSex(text) || mrz.sex || '',
    placeOfBirth: place.place,
    countryOfBirth: place.country,
    issuingCountry,
    nationality: issuingCountry || mrz.nationality || '',
    nationalId: issuingCountry,
    passportNumber: number || '',
    passportExpiry: dates.expiry || mrz.passportExpiry || '',
  };
}
