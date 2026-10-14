import type { SchemaApplicantFields } from '#temp/api-schemas/api';

import { transliterateRussian } from './transliterate';

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

function parseDates(text: string): { birth: string; issue: string; expiry: string } {
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
  const issue =
    [...ordered]
      .reverse()
      .find(([value, date]) => value !== birth && date.getTime() < now.getTime())?.[0] ??
    '';
  return { birth, issue, expiry };
}

function parseSex(text: string): string {
  if (/[MМм]\s*[\/|]\s*[MМм]/.test(text)) {
    return 'M';
  }
  if (/[FЖж]\s*[\/|]\s*[FЖж]/.test(text)) {
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

function cyrillicOnlySurname(lines: Array<string>, given: string): string {
  let best = '';
  for (const line of lines) {
    if (isPlaceLine(line) || !/[\/|]/.test(line)) {
      continue;
    }
    const words = cyrillicNames(line).filter((word) => !PATRONYMIC_CYRILLIC.test(word));
    if (words.length !== 1) {
      continue;
    }
    const expected = transliterateRussian(words[0] ?? '').toUpperCase();
    if (
      expected.length >= 6 &&
      expected !== given &&
      !isPageWord(expected) &&
      !isPatronymicLatin(expected) &&
      expected.length > best.length
    ) {
      best = expected;
    }
  }
  return best;
}

function surnameFromLines(lines: Array<string>, given: string): string {
  let best = '';
  let bestDistance = 99;

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
    if (
      !expected ||
      expected === given ||
      isPageWord(expected) ||
      isPatronymicLatin(expected)
    ) {
      continue;
    }
    const latin = bestAgreed(
      latinTokens(lines.slice(index, index + 3).join('\n')),
      expected,
    );
    if (!latin) {
      continue;
    }
    const chosen =
      latin.length === expected.length && editDistance(latin, expected) === 1
        ? expected
        : completeName(latin, expected);
    if (!chosen || chosen === given) {
      continue;
    }
    const distance = chosen === expected ? 0 : editDistance(chosen, expected);
    if (
      distance < bestDistance ||
      (distance === bestDistance && chosen.length > best.length)
    ) {
      best = chosen;
      bestDistance = distance;
    }
  }

  if (best) {
    return best;
  }

  const section = sectionBetween(lines, /фамили|surname/i, /имя|given/i);
  const labeled =
    latinTokens(section).find((token) => token !== given && !isPatronymicLatin(token)) ??
    '';
  return labeled || cyrillicOnlySurname(lines, given);
}

function givenFromLines(lines: Array<string>): string {
  let best = '';
  let bestDistance = 99;
  let fallback = '';

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
    if (!fallback && expected && !isPageWord(expected)) {
      fallback = expected;
    }
    const latin = bestAgreed(
      latinTokens(lines.slice(Math.max(0, index - 6), index + 3).join('\n')),
      expected,
    );
    if (!latin) {
      continue;
    }
    const chosen = completeName(latin, expected);
    const distance = chosen === expected ? 0 : editDistance(chosen, expected);
    if (
      distance < bestDistance ||
      (distance === bestDistance && chosen.length > best.length)
    ) {
      best = chosen;
      bestDistance = distance;
    }
  }

  if (best) {
    return best;
  }
  if (fallback) {
    return fallback;
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

function resolveTravelName(labeled: string, mrzName: string): string {
  const visual = labeled && !isPatronymicLatin(labeled) ? labeled : '';
  const mrz = mrzName && !isPatronymicLatin(mrzName) ? mrzName : '';
  if (!visual) {
    return mrz;
  }
  if (!mrz || mrz === visual) {
    return visual;
  }
  if (mrz.startsWith(visual)) {
    const extra = mrz.slice(visual.length);
    if (extra === 'S' || extra === 'C') {
      return visual;
    }
    return mrz;
  }
  if (visual.startsWith(mrz) && visual.length - mrz.length <= 1) {
    const extra = visual.slice(mrz.length);
    if (extra === 'S' || extra === 'C') {
      return mrz;
    }
    return visual;
  }
  if (editDistance(visual, mrz) === 1 && visual.length === mrz.length) {
    return mrz;
  }
  if (editDistance(visual, mrz) <= 1) {
    return visual.length >= mrz.length ? visual : mrz;
  }
  return mrz;
}

function cleanMrzToken(value: string): string {
  const trimmed = value.replace(/([A-Z])\1{2,}.*$/, '');
  return trimmed.length >= 4 ? trimmed : value;
}

function alignMrzSurname(lines: Array<string>, mrzSurname: string): string {
  if (!mrzSurname) {
    return '';
  }
  for (const line of lines) {
    if (isPlaceLine(line) || !/[\/|]/.test(line)) {
      continue;
    }
    const words = cyrillicNames(line).filter((word) => !PATRONYMIC_CYRILLIC.test(word));
    if (words.length !== 1) {
      continue;
    }
    const expected = transliterateRussian(words[0] ?? '').toUpperCase();
    if (
      expected.length >= 6 &&
      !isPageWord(expected) &&
      mrzSurname.startsWith(expected) &&
      mrzSurname.length - expected.length <= 2
    ) {
      return expected;
    }
  }
  return mrzSurname;
}

function travelNames(
  text: string,
  mrz: Partial<SchemaApplicantFields>,
): { surname: string; givenNames: string } {
  const lines = linesOf(text);
  const givenVisual = givenFromLines(lines);
  const mrzGiven = cleanMrzToken((mrz.givenNames ?? '').split('<')[0] ?? '');
  const givenNames = resolveTravelName(givenVisual, mrzGiven);
  const mrzSurname = alignMrzSurname(lines, cleanMrzToken(mrz.surname ?? ''));
  const surnameMrz = mrzSurname === givenNames ? '' : mrzSurname;

  return {
    surname: resolveTravelName(surnameFromLines(lines, givenNames), surnameMrz),
    givenNames,
  };
}

function parseMrzFields(text: string): Partial<SchemaApplicantFields> {
  const compact = text.toUpperCase().replace(/[^A-Z0-9<]/g, '');
  const name = compact.match(/P[A-Z0-9]*<RUS([A-Z]{4,})<+([A-Z]{4,})/);
  const data = compact.match(/RUS(\d{6})\d([MF<])(\d{6})/);
  const fields: Partial<SchemaApplicantFields> = {};
  if (name?.[1] && name?.[2]) {
    fields.surname = cleanMrzToken(name[1]);
    fields.givenNames = cleanMrzToken(name[2]);
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
    passportIssueDate: dates.issue,
    passportExpiry: dates.expiry || mrz.passportExpiry || '',
  };
}
