import type {
  SchemaAgreementFields,
  SchemaApplicantFields,
} from '#temp/api-schemas/api';
import { transliterateApplicantFields } from '@/pdf/transliterate';
import { normalizeGapInput } from '@/ui/gap-field';

export const BLOCKS = [
  { id: 'passport', label: 'Данные из паспорта' },
  { id: 'contacts', label: 'Контакты' },
  { id: 'work', label: 'Работа' },
  { id: 'trip', label: 'Поездка' },
  { id: 'stay', label: 'Проживание' },
  { id: 'consent', label: 'Согласие на обработку персональных данных' },
] as const;

export type BlockId = (typeof BLOCKS)[number]['id'];

export const OPTIONAL_IDS = new Set([
  'visa.surnameAtBirth',
  'visa.occupation',
  'visa.employerName',
  'visa.employerAddress',
  'visa.employerPhone',
  'visa.parent1Address',
  'visa.parent2Address',
]);

export function fieldIsRequired(id: string): boolean {
  return !OPTIONAL_IDS.has(id) && id !== 'visa.sponsored';
}

export const PASSPORT_TYPES = ['image/jpeg', 'image/png', 'application/pdf'] as const;

const AGREEMENT_LABELS: Array<[keyof SchemaAgreementFields, string]> = [
  ['fullName', 'ФИО'],
  ['documentType', 'Документ'],
  ['series', 'Серия'],
  ['number', 'Номер'],
  ['issuedBy', 'Кем выдан'],
  ['issueDate', 'Дата выдачи'],
  ['address', 'Адрес'],
];

export const FIELD_LABELS: Array<[keyof SchemaApplicantFields, string, BlockId]> = [
  ['surname', 'Фамилия', 'passport'],
  ['surnameAtBirth', 'Фамилия при рождении', 'passport'],
  ['givenNames', 'Имя', 'passport'],
  ['dateOfBirth', 'Дата рождения', 'passport'],
  ['placeOfBirth', 'Место рождения', 'passport'],
  ['countryOfBirth', 'Страна рождения', 'passport'],
  ['nationality', 'Гражданство', 'passport'],
  ['sex', 'Пол', 'passport'],
  ['maritalStatus', 'Семейное положение', 'passport'],
  ['passportNumber', 'Номер паспорта', 'passport'],
  ['passportIssueDate', 'Дата выдачи паспорта', 'passport'],
  ['passportExpiry', 'Срок действия паспорта', 'passport'],
  ['issuingCountry', 'Страна выдачи', 'passport'],
  ['address', 'Адрес проживания', 'contacts'],
  ['email', 'Электронная почта', 'contacts'],
  ['phone', 'Телефон', 'contacts'],
  ['occupation', 'Профессия', 'work'],
  ['employerName', 'Название организации', 'work'],
  ['employerAddress', 'Адрес организации', 'work'],
  ['employerPhone', 'Телефон организации', 'work'],
  ['travelPurpose', 'Цель поездки', 'trip'],
  ['stayFrom', 'Пребывание с', 'trip'],
  ['stayTo', 'Пребывание по', 'trip'],
  ['appointmentCity', 'Город записи в визовом центре', 'consent'],
  ['appointmentDate', 'Дата записи в визовом центре', 'consent'],
];

const PARENT_LABELS: Array<[keyof SchemaApplicantFields, string]> = [
  ['parent1Surname', 'Фамилия первого родителя'],
  ['parent1GivenNames', 'Имя первого родителя'],
  ['parent1Phone', 'Телефон первого родителя'],
  ['parent1Email', 'Почта первого родителя'],
  ['parent2Surname', 'Фамилия второго родителя'],
  ['parent2GivenNames', 'Имя второго родителя'],
  ['parent2Phone', 'Телефон второго родителя'],
  ['parent2Email', 'Почта второго родителя'],
];

export const SPONSOR_FIELDS = [
  { id: 'visa.sponsorSurname', label: 'Фамилия спонсора' },
  { id: 'visa.sponsorGivenNames', label: 'Имя спонсора' },
] as const;

export type Draft = {
  countryCode: string;
  fields: SchemaApplicantFields;
  agreement: SchemaAgreementFields;
};

export type Gap = {
  id: string;
  label: string;
  group: string;
};

export type GapFormValues = {
  visa?: Record<string, string>;
  agreement?: Record<string, string>;
};

export function accommodationLabels(
  source: string,
): Array<[keyof SchemaApplicantFields, string]> {
  if (source === 'booking') {
    return [
      ['hotelName', 'Название отеля'],
      ['hostAddress', 'Адрес отеля'],
      ['hotelPhone', 'Телефон отеля'],
    ];
  }
  if (source === 'invitation') {
    return [
      ['hostSurname', 'Фамилия приглашающего'],
      ['hostGivenNames', 'Имя приглашающего'],
      ['hostAddress', 'Адрес приглашающего'],
      ['hotelPhone', 'Телефон приглашающего'],
      ['hostEmail', 'Почта приглашающего'],
    ];
  }
  return [];
}

export function missingChoices(fields: SchemaApplicantFields): string {
  if (!fields.staySource) {
    return 'В разделе «Проживание» выберите букинг или приглашение.';
  }
  if (!fields.previousVisa) {
    return 'Укажите, была ли виза за последние 5 лет.';
  }
  return '';
}

export function storedValue(
  id: string,
  fields: SchemaApplicantFields,
  agreement: SchemaAgreementFields,
): string {
  const [group, key] = id.split('.');
  if (group === 'visa' && key) {
    return fields[key as keyof SchemaApplicantFields] ?? '';
  }
  if (group === 'agreement' && key) {
    return agreement[key as keyof SchemaAgreementFields] ?? '';
  }
  return '';
}

export function fieldsForBlock(
  block: BlockId,
  fields: SchemaApplicantFields,
  agreement: SchemaAgreementFields,
): Array<{ id: string; label: string }> {
  const items = FIELD_LABELS.filter(([, , itemBlock]) => itemBlock === block).map(
    ([key, label]) => ({ id: `visa.${key}`, label }),
  );

  if (block === 'passport' && fields.minor === 'yes') {
    items.push(
      ...PARENT_LABELS.map(([key, label]) => ({ id: `visa.${key}`, label })),
      {
        id: 'visa.parent1Address',
        label: 'Адрес первого родителя, если отличается',
      },
      {
        id: 'visa.parent2Address',
        label: 'Адрес второго родителя, если отличается',
      },
    );
  }

  if (block === 'trip' && fields.previousVisa === 'yes') {
    items.push(
      { id: 'visa.fingerprintDate', label: 'Дата отпечатков пальцев' },
      { id: 'visa.visaNumber', label: 'Номер визы' },
    );
  }

  if (block === 'stay') {
    items.push(
      ...accommodationLabels(fields.staySource).map(([key, label]) => ({
        id: `visa.${key}`,
        label,
      })),
    );
  }

  if (block === 'consent') {
    const hideAddress = !fields.address.trim() && !agreement.address.trim();
    items.push(
      ...AGREEMENT_LABELS.filter(([key]) => !(key === 'address' && hideAddress)).map(
        ([key, label]) => ({ id: `agreement.${key}`, label }),
      ),
    );
  }

  return items;
}

function liveValue(
  id: string,
  fields: SchemaApplicantFields,
  agreement: SchemaAgreementFields,
  formValues: GapFormValues | undefined,
): string {
  const stored = storedValue(id, fields, agreement).trim();
  if (stored) {
    return stored;
  }
  const [group, key] = id.split('.');
  if (!formValues || !key) {
    return '';
  }
  const bucket = group === 'agreement' ? formValues.agreement : formValues.visa;
  return String(bucket?.[key] ?? '').trim();
}

export function blockIsComplete(
  block: BlockId,
  fields: SchemaApplicantFields,
  agreement: SchemaAgreementFields,
  formValues: GapFormValues | undefined,
): boolean {
  if (block === 'trip' && fields.previousVisa !== 'yes' && fields.previousVisa !== 'no') {
    return false;
  }
  if (
    block === 'stay' &&
    fields.staySource !== 'booking' &&
    fields.staySource !== 'invitation'
  ) {
    return false;
  }
  const items = fieldsForBlock(block, fields, agreement);
  if (block === 'trip' && fields.sponsored === 'yes') {
    items.push(...SPONSOR_FIELDS);
  }
  return items.every(
    (item) =>
      !fieldIsRequired(item.id) ||
      liveValue(item.id, fields, agreement, formValues) !== '',
  );
}

export function collectGaps(
  fields: SchemaApplicantFields,
  agreement: SchemaAgreementFields,
): Array<Gap> {
  const visaAddressMissing = !fields.address.trim();
  const agreementAddressMissing = !agreement.address.trim();
  const sponsorGaps: Array<Gap> =
    fields.sponsored === 'yes'
      ? [
          !fields.sponsorSurname.trim()
            ? {
                id: 'visa.sponsorSurname',
                label: 'Фамилия спонсора',
                group: 'trip',
              }
            : null,
          !fields.sponsorGivenNames.trim()
            ? {
                id: 'visa.sponsorGivenNames',
                label: 'Имя спонсора',
                group: 'trip',
              }
            : null,
        ].filter((gap): gap is Gap => gap !== null)
      : [];

  const extraLabels = [
    ...accommodationLabels(fields.staySource),
    ...(fields.previousVisa === 'yes'
      ? ([
          ['fingerprintDate', 'Дата отпечатков пальцев'],
          ['visaNumber', 'Номер визы'],
        ] as Array<[keyof SchemaApplicantFields, string]>)
      : []),
    ...(fields.minor === 'yes' ? PARENT_LABELS : []),
  ];

  return [
    ...FIELD_LABELS.filter(
      ([key]) => !OPTIONAL_IDS.has(`visa.${key}`) && !fields[key].trim(),
    ).map(([key, label, group]) => ({
      id: `visa.${key}`,
      label,
      group,
    })),
    ...extraLabels
      .filter(([key]) => !fields[key].trim())
      .map(([key, label]) => ({
        id: `visa.${key}`,
        label,
        group:
          key === 'fingerprintDate' || key === 'visaNumber'
            ? 'trip'
            : key.startsWith('parent')
              ? 'passport'
              : 'stay',
      })),
    ...sponsorGaps,
    ...AGREEMENT_LABELS.filter(([key]) => !agreement[key].trim()).flatMap(
      ([key, label]) => {
        if (key === 'address' && visaAddressMissing && agreementAddressMissing) {
          return [];
        }
        return [
          {
            id: `agreement.${key}`,
            label,
            group: 'consent' as const,
          },
        ];
      },
    ),
  ];
}

export function applyManualValues(
  draft: Draft,
  manual: Record<string, string>,
): Draft {
  const fields = { ...draft.fields };
  const agreement = { ...draft.agreement };

  for (const [id, raw] of Object.entries(manual)) {
    const value = normalizeGapInput(id, raw, true);
    const [group, key] = id.split('.');
    if (group === 'visa' && key) {
      fields[key as keyof SchemaApplicantFields] = value;
    }
    if (group === 'agreement' && key) {
      agreement[key as keyof SchemaAgreementFields] = value;
    }
  }

  const homeAddress = manual['visa.address']?.trim().replace(/\s+/g, ' ') ?? '';
  if (homeAddress && !draft.agreement.address.trim()) {
    agreement.address = homeAddress;
  }

  return {
    ...draft,
    fields: transliterateApplicantFields(fields),
    agreement,
  };
}

export function updateReadValue(draft: Draft, id: string, raw: string): Draft {
  const value = normalizeGapInput(id, raw, true);
  const [group, key] = id.split('.');

  if (group === 'visa' && key) {
    return {
      ...draft,
      fields: {
        ...draft.fields,
        [key]: value,
      },
    };
  }

  if (group === 'agreement' && key) {
    return {
      ...draft,
      agreement: {
        ...draft.agreement,
        [key]: value,
      },
    };
  }

  return draft;
}

export function flattenGapValues(values: GapFormValues): Record<string, string> {
  const manual: Record<string, string> = {};
  for (const [key, value] of Object.entries(values.visa ?? {})) {
    manual[`visa.${key}`] = value;
  }
  for (const [key, value] of Object.entries(values.agreement ?? {})) {
    manual[`agreement.${key}`] = value;
  }
  return manual;
}

export function gapFormDefaults(gaps: Array<Gap>): GapFormValues {
  const values: GapFormValues = {};
  for (const gap of gaps) {
    const [group, key] = gap.id.split('.');
    if ((group !== 'visa' && group !== 'agreement') || !key) {
      continue;
    }
    values[group] ??= {};
    values[group][key] = '';
  }
  if (gaps.some((gap) => gap.id === 'visa.sponsored')) {
    values.visa ??= {};
    values.visa.sponsorSurname ??= '';
    values.visa.sponsorGivenNames ??= '';
  }
  return values;
}
