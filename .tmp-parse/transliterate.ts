import type { SchemaApplicantFields } from './types.ts';

/**
 * Russian international-passport romanization (ICAO / MFA):
 * ё and э → e, й → i, ъ → ie, ь is omitted, ю → iu, я → ia.
 */
const LETTERS: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: 'ie',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'iu',
  я: 'ia',
};

const COUNTRY_CODES: Record<string, string> = {
  россия: 'RUS',
  'российская федерация': 'RUS',
  рф: 'RUS',
  russia: 'RUS',
  'russian federation': 'RUS',
  италия: 'ITA',
  italy: 'ITA',
  украина: 'UKR',
  ukraine: 'UKR',
  беларусь: 'BLR',
  белоруссия: 'BLR',
  belarus: 'BLR',
  казахстан: 'KAZ',
  kazakhstan: 'KAZ',
  узбекистан: 'UZB',
  uzbekistan: 'UZB',
  грузия: 'GEO',
  georgia: 'GEO',
  армения: 'ARM',
  armenia: 'ARM',
  азербайджан: 'AZE',
  azerbaijan: 'AZE',
  сша: 'USA',
  'соединенные штаты': 'USA',
  'united states': 'USA',
  великобритания: 'GBR',
  'united kingdom': 'GBR',
  германия: 'DEU',
  germany: 'DEU',
  франция: 'FRA',
  france: 'FRA',
  испания: 'ESP',
  spain: 'ESP',
  турция: 'TUR',
  turkey: 'TUR',
  китай: 'CHN',
  china: 'CHN',
  индия: 'IND',
  india: 'IND',
};

function applyCase(latin: string, source: string, next: string | undefined): string {
  if (!latin || source === source.toLowerCase()) {
    return latin;
  }

  const nextLower = next?.toLowerCase();
  const nextIsLowerCyrillic = Boolean(
    next &&
      next === nextLower &&
      nextLower &&
      LETTERS[nextLower] !== undefined,
  );
  if (nextIsLowerCyrillic) {
    return latin.charAt(0).toUpperCase() + latin.slice(1);
  }

  return latin.toUpperCase();
}

function transliterateChars(value: string): string {
  const chars = Array.from(value);
  let result = '';

  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index] ?? '';
    const mapped = LETTERS[char.toLowerCase()];
    result +=
      mapped === undefined ? char : applyCase(mapped, char, chars[index + 1]);
  }

  return result;
}

export function transliterateRussian(value: string): string {
  return transliterateChars(value).replace(/\s+/g, ' ').trim();
}

export function transliterateInput(value: string): string {
  const leading = value.match(/^\s*/)?.[0] ?? '';
  const trailing = value.match(/\s*$/)?.[0] ?? '';
  const core = value.slice(leading.length, value.length - trailing.length);
  return leading + transliterateRussian(core) + trailing;
}

const TRANSLITERATED_COUNTRY_CODES: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_CODES).map(([name, code]) => [
    transliterateRussian(name).toLowerCase(),
    code,
  ]),
);

function countryCodeFromName(value: string): string | undefined {
  const key = value.trim().toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ');
  return COUNTRY_CODES[key] ?? TRANSLITERATED_COUNTRY_CODES[key];
}

export function transliterateCountry(value: string): string {
  const known = countryCodeFromName(value);
  if (known) {
    return known;
  }

  if (/^[a-z]{3}$/i.test(value.trim())) {
    return value.trim().toUpperCase();
  }

  return transliterateRussian(value);
}

const COUNTRY_GAPS = new Set([
  'visa.nationality',
  'visa.countryOfBirth',
  'visa.issuingCountry',
]);

export function transliterateGapValue(id: string, value: string): string {
  if (id === 'visa.sex') {
    return value;
  }

  const converted = transliterateInput(value);
  if (!COUNTRY_GAPS.has(id) || /^\s|\s$/.test(value)) {
    return converted;
  }

  return countryCodeFromName(converted) ?? converted;
}

function transliterateSex(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/ё/g, 'е');
  if (normalized === 'm' || normalized === 'м' || normalized.startsWith('муж')) {
    return 'M';
  }
  if (normalized === 'f' || normalized === 'ж' || normalized.startsWith('жен')) {
    return 'F';
  }

  return transliterateRussian(value).toUpperCase();
}

const COUNTRY_FIELDS = new Set<keyof SchemaApplicantFields>([
  'nationality',
  'countryOfBirth',
  'issuingCountry',
]);

export function transliterateApplicantFields(
  fields: SchemaApplicantFields,
): SchemaApplicantFields {
  const next = { ...fields };

  for (const key of Object.keys(next) as Array<keyof SchemaApplicantFields>) {
    if (key === 'sex') {
      next.sex = transliterateSex(next.sex);
      continue;
    }

    next[key] = COUNTRY_FIELDS.has(key)
      ? transliterateCountry(next[key])
      : transliterateRussian(next[key]);
  }

  return next;
}
