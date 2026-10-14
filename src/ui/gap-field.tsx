import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { z } from 'zod';

import { Checkbox, Select, SelectItem, TextField } from '@/design-system';
import { transliterateCountry, transliterateGapValue } from '@/pdf/transliterate';
import { AddressField } from '@/ui/address-field';
import { DateGapControl, parseRuDate } from '@/ui/date-gap-control';

const DATE_IDS = new Set([
  'visa.dateOfBirth',
  'visa.passportIssueDate',
  'visa.passportExpiry',
  'visa.stayFrom',
  'visa.stayTo',
  'visa.appointmentDate',
  'visa.fingerprintDate',
  'agreement.issueDate',
]);

const ADDRESS_IDS = new Set([
  'visa.address',
  'visa.hostAddress',
  'visa.employerAddress',
  'visa.parent1Address',
  'visa.parent2Address',
  'agreement.address',
]);

const NAME_IDS = new Set([
  'visa.surname',
  'visa.surnameAtBirth',
  'visa.givenNames',
  'visa.hostSurname',
  'visa.hostGivenNames',
  'visa.sponsorSurname',
  'visa.sponsorGivenNames',
  'visa.appointmentCity',
  'visa.parent1Surname',
  'visa.parent1GivenNames',
  'visa.parent2Surname',
  'visa.parent2GivenNames',
  'agreement.fullName',
]);

const PHONE_IDS = new Set([
  'visa.phone',
  'visa.employerPhone',
  'visa.hotelPhone',
  'visa.parent1Phone',
  'visa.parent2Phone',
]);

const EMAIL_IDS = new Set([
  'visa.email',
  'visa.hostEmail',
  'visa.parent1Email',
  'visa.parent2Email',
]);

const CHOICE_IDS = new Set([
  'visa.maritalStatus',
  'visa.travelPurpose',
  'visa.sponsored',
]);

const COUNTRY_IDS = new Set([
  'visa.nationality',
  'visa.issuingCountry',
  'visa.nationalId',
  'visa.countryOfBirth',
]);

export function isDateGap(id: string): boolean {
  return DATE_IDS.has(id);
}

export function isAddressGap(id: string): boolean {
  return ADDRESS_IDS.has(id);
}

export function isExactAddress(value: string): boolean {
  return /(?:д\.?|дом|влд\.?|владение|зд\.?|здание)\s*\d+/i.test(value);
}

function dateBounds(id: string): { min: CalendarDate; max: CalendarDate } {
  const now = today(getLocalTimeZone());
  if (id === 'visa.dateOfBirth') {
    return { min: new CalendarDate(1920, 1, 1), max: now };
  }
  if (id === 'visa.passportExpiry') {
    return { min: now.subtract({ years: 15 }), max: now.add({ years: 15 }) };
  }
  if (id === 'visa.stayFrom' || id === 'visa.stayTo') {
    return { min: now.subtract({ years: 1 }), max: now.add({ years: 5 }) };
  }
  if (id === 'visa.appointmentDate') {
    return { min: now.subtract({ months: 1 }), max: now.add({ years: 2 }) };
  }
  if (id === 'visa.fingerprintDate') {
    return { min: new CalendarDate(1995, 1, 1), max: now };
  }
  return { min: new CalendarDate(1991, 1, 1), max: now };
}

function isCountryValue(value: string, historical: boolean): boolean {
  const trimmed = value.trim();
  if (historical && /^(ussr|sssr|ссср)$/i.test(trimmed)) {
    return true;
  }
  const code = transliterateCountry(trimmed);
  if (historical && /^(USSR|SSSR)$/.test(code)) {
    return true;
  }
  return /^[A-Z]{3}$/.test(code);
}

function lettersOf(value: string): number {
  return value.match(/\p{L}/gu)?.length ?? 0;
}

export function gapFieldSchema(id: string, label: string) {
  if (id === 'visa.sex') {
    return z
      .string()
      .trim()
      .regex(/^(m|f|м|ж)$/i, { message: 'Укажите пол: M или F.' });
  }

  if (isDateGap(id)) {
    const bounds = dateBounds(id);
    return z.string().trim().refine(
      (value) => {
        const date = parseRuDate(value);
        return (
          date !== null &&
          date.compare(bounds.min) >= 0 &&
          date.compare(bounds.max) <= 0
        );
      },
      { message: `Укажите дату в поле «${label}».` },
    );
  }

  if (id === 'visa.hostAddress') {
    return z.string().trim().refine(
      (value) => lettersOf(value) >= 3 && /\d/.test(value),
      { message: `Укажите зарубежный адрес с номером дома для «${label}».` },
    );
  }

  if (id === 'visa.parent1Address' || id === 'visa.parent2Address') {
    return z.string().trim().refine((value) => value === '' || isExactAddress(value), {
      message: 'Укажите адрес с номером дома или оставьте поле пустым.',
    });
  }

  if (id === 'visa.visaNumber') {
    return z.string().trim().regex(/^[A-Za-z0-9]{6,16}$/, {
      message: 'Укажите номер визы с наклейки.',
    });
  }

  if (id === 'visa.hotelName') {
    return z.string().trim().refine((value) => lettersOf(value) >= 2, {
      message: 'Укажите название отеля.',
    });
  }

  if (isAddressGap(id)) {
    return z.string().trim().refine((value) => isExactAddress(value), {
      message: `Выберите полный адрес с номером дома для «${label}».`,
    });
  }

  if (EMAIL_IDS.has(id)) {
    return z.string().trim().refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: 'Укажите электронную почту.',
    });
  }

  if (PHONE_IDS.has(id)) {
    return z.string().trim().refine(
      (value) => {
        const digits = value.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 15;
      },
      { message: `Укажите номер телефона в поле «${label}».` },
    );
  }

  if (id === 'visa.maritalStatus') {
    return z.string().refine((value) => value === 'single' || value === 'married', {
      message: 'Выберите семейное положение.',
    });
  }

  if (id === 'visa.travelPurpose') {
    return z.string().refine((value) => value === 'tourism' || value === 'invitation', {
      message: 'Выберите цель поездки.',
    });
  }

  if (id === 'visa.sponsored') {
    return z.string().refine((value) => value === '' || value === 'yes' || value === 'no', {
      message: 'Укажите, спонсируется ли поездка.',
    });
  }

  if (id === 'visa.employerName') {
    return z
      .string()
      .trim()
      .refine((value) => lettersOf(value) >= 2, {
        message: 'Укажите название организации, включая ООО или ЗАО.',
      });
  }

  if (id === 'visa.passportNumber') {
    return digitsSchema(9, 'Номер паспорта — 9 цифр.');
  }

  if (id === 'agreement.series') {
    return digitsSchema(4, 'Серия — 4 цифры.');
  }

  if (id === 'agreement.number') {
    return digitsSchema(6, 'Номер — 6 цифр.');
  }

  if (COUNTRY_IDS.has(id)) {
    const historical = id === 'visa.countryOfBirth';
    return z.string().trim().refine((value) => isCountryValue(value, historical), {
      message: historical
        ? 'Укажите страну, например RUS или USSR.'
        : 'Укажите страну, например RUS.',
    });
  }

  if (NAME_IDS.has(id) || id === 'visa.placeOfBirth') {
    return z
      .string()
      .trim()
      .min(2, { message: `Укажите «${label}».` })
      .refine(
        (value) => lettersOf(value) >= 2 && !/\d/.test(value),
        { message: `Поле «${label}» заполняется буквами.` },
      );
  }

  return z
    .string()
    .trim()
    .min(2, { message: `Укажите «${label}».` })
    .refine((value) => lettersOf(value) >= 2, {
      message: `Поле «${label}» должно содержать текст.`,
    });
}

export function optionalGapSchema(id: string, label: string) {
  const strict = gapFieldSchema(id, label);
  return z.string().superRefine((value, context) => {
    if (!value.trim()) {
      return;
    }
    const parsed = strict.safeParse(value);
    if (!parsed.success) {
      context.addIssue({
        code: 'custom',
        message: parsed.error.issues[0]?.message ?? `Проверьте поле «${label}».`,
      });
    }
  });
}

export function buildGapSchema(
  gaps: Array<{ id: string; label: string; optional?: boolean }>,
) {
  const visa: Record<string, z.ZodType> = {};
  const agreement: Record<string, z.ZodType> = {};

  for (const gap of gaps) {
    const [group, key] = gap.id.split('.');
    if (!key) {
      continue;
    }
    const field = gap.optional
      ? optionalGapSchema(gap.id, gap.label)
      : gapFieldSchema(gap.id, gap.label);
    if (group === 'visa') {
      visa[key] = field;
    }
    if (group === 'agreement') {
      agreement[key] = field;
    }
  }

  if (gaps.some((gap) => gap.id === 'visa.sponsored')) {
    visa.sponsorSurname ??= z.string();
    visa.sponsorGivenNames ??= z.string();
  }

  return z
    .object({
      ...(Object.keys(visa).length > 0 ? { visa: z.object(visa) } : {}),
      ...(Object.keys(agreement).length > 0
        ? { agreement: z.object(agreement) }
        : {}),
    })
    .superRefine((values, context) => {
      const visaValues = values.visa as Record<string, string> | undefined;
      const from = parseRuDate(String(visaValues?.stayFrom ?? ''));
      const to = parseRuDate(String(visaValues?.stayTo ?? ''));
      if (from && to && to.compare(from) < 0) {
        context.addIssue({
          code: 'custom',
          path: ['visa', 'stayTo'],
          message: 'Дата окончания не может быть раньше даты начала.',
        });
      }
      if (visaValues?.sponsored === 'yes') {
        if (lettersOf(String(visaValues.sponsorSurname ?? '')) < 2) {
          context.addIssue({
            code: 'custom',
            path: ['visa', 'sponsorSurname'],
            message: 'Укажите фамилию спонсора.',
          });
        }
        if (lettersOf(String(visaValues.sponsorGivenNames ?? '')) < 2) {
          context.addIssue({
            code: 'custom',
            path: ['visa', 'sponsorGivenNames'],
            message: 'Укажите имя спонсора.',
          });
        }
      }
    });
}

function digitsSchema(length: number, message: string) {
  return z
    .string()
    .trim()
    .refine((value) => new RegExp(`^\\d{${length}}$`).test(value.replace(/\D/g, '')), {
      message,
    });
}

export function digitLimit(id: string): number | null {
  if (id === 'visa.passportNumber') {
    return 9;
  }
  if (id === 'agreement.series') {
    return 4;
  }
  if (id === 'agreement.number') {
    return 6;
  }
  return null;
}

export function digitsOnly(value: string, limit: number): string {
  return value.replace(/\D/g, '').slice(0, limit);
}

export function phoneOnly(value: string): string {
  const compact = value.replace(/[^\d+]/g, '');
  const prefix = compact.startsWith('+') ? '+' : '';
  return `${prefix}${compact.replace(/\+/g, '').slice(0, 15)}`;
}

export function normalizeGapInput(id: string, raw: string, store: boolean): string {
  const value = raw.trim().replace(/\s+/g, ' ');
  if (id.startsWith('agreement.')) {
    const limit = digitLimit(id);
    return limit ? digitsOnly(value, limit) : value;
  }
  if (isDateGap(id)) {
    return value;
  }
  if (isAddressGap(id)) {
    if (store && id === 'visa.address') {
      return transliterateGapValue(id, value).trim();
    }
    return value;
  }
  const limit = digitLimit(id);
  if (limit) {
    return digitsOnly(value, limit);
  }
  if (PHONE_IDS.has(id)) {
    return phoneOnly(value);
  }
  if (id === 'visa.visaNumber') {
    return value.replace(/[^A-Za-z0-9]/g, '').slice(0, 16);
  }
  if (EMAIL_IDS.has(id) || CHOICE_IDS.has(id)) {
    return id === 'visa.sponsored' && value !== 'yes' ? 'no' : value.trim();
  }
  if (id === 'visa.sex') {
    const normalized = value.toUpperCase();
    if (normalized === 'М' || normalized === 'M') {
      return 'M';
    }
    if (normalized === 'Ж' || normalized === 'F') {
      return 'F';
    }
    return normalized;
  }
  return transliterateGapValue(id, value).trim();
}

export function GapControl({
  id,
  label,
  value,
  invalid,
  error,
  autoFocus,
  isDisabled = false,
  isRequired = true,
  onValue,
  onCommit,
  onBlur,
}: {
  id: string;
  label: string;
  value: string;
  invalid?: boolean;
  error?: string;
  autoFocus?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onValue: (value: string) => void;
  onCommit: (value: string) => void;
  onBlur?: () => void;
}) {
  if (isDateGap(id)) {
    return (
      <DateGapControl
        label={label}
        value={value}
        invalid={invalid}
        error={error}
        autoFocus={autoFocus}
        isDisabled={isDisabled}
        isRequired={isRequired}
        onValue={onValue}
        onCommit={onCommit}
        onBlur={onBlur}
      />
    );
  }

  if (id === 'visa.maritalStatus' || id === 'visa.travelPurpose') {
    const items =
      id === 'visa.maritalStatus'
        ? [
            { id: 'single', name: 'Не женат / Не замужем' },
            { id: 'married', name: 'Женат / Замужем' },
          ]
        : [
            { id: 'tourism', name: 'Туризм' },
            { id: 'invitation', name: 'По приглашению' },
          ];
    return (
      <Select
        label={label}
        items={items}
        selectedKey={value || null}
        placeholder="Выберите"
        isDisabled={isDisabled}
        isRequired={isRequired}
        necessityIndicator={isRequired}
        validationBehavior="aria"
        isInvalid={invalid}
        errorMessage={error}
        onBlur={onBlur}
        onSelectionChange={(key) => {
          const next = key ? String(key) : '';
          onValue(next);
          if (next) {
            onCommit(next);
          }
        }}
      >
        {(item) => (
          <SelectItem id={item.id} textValue={item.name}>
            {item.name}
          </SelectItem>
        )}
      </Select>
    );
  }

  if (id === 'visa.sponsored') {
    return (
      <Checkbox
        isSelected={value === 'yes'}
        isDisabled={isDisabled}
        isRequired={isRequired}
        necessityIndicator={isRequired}
        isInvalid={invalid}
        errorMessage={error}
        onChange={(selected) => {
          const next = selected ? 'yes' : 'no';
          onValue(next);
          onCommit(next);
        }}
        onBlur={onBlur}
      >
        Поездку спонсируют
      </Checkbox>
    );
  }

  if (isAddressGap(id)) {
    return (
      <AddressField
        label={label}
        value={value}
        scope={id === 'visa.hostAddress' ? 'world' : 'ru'}
        invalid={invalid}
        error={error}
        autoFocus={autoFocus}
        isDisabled={isDisabled}
        isRequired={isRequired}
        onValue={onValue}
        onCommit={onCommit}
        onBlur={onBlur}
      />
    );
  }

  const limit = digitLimit(id);
  const phone = PHONE_IDS.has(id);

  return (
    <TextField
      label={label}
      value={value}
      autoFocus={autoFocus}
      isDisabled={isDisabled}
      isRequired={isRequired}
      necessityIndicator={isRequired}
      validationBehavior="aria"
      isInvalid={invalid}
      errorMessage={error}
      inputMode={limit ? 'numeric' : phone ? 'tel' : undefined}
      description={
        limit
          ? 'Только цифры.'
          : phone
            ? 'Только номер телефона.'
            : id === 'visa.employerName'
              ? 'Вместе с формой: ООО или ЗАО.'
              : id === 'visa.sex'
                ? 'M или F.'
                : COUNTRY_IDS.has(id)
                  ? 'Например, RUS.'
                  : undefined
      }
      onChange={(next) =>
        onValue(limit ? digitsOnly(next, limit) : phone ? phoneOnly(next) : next)
      }
      onBlur={(event) => {
        const current =
          event.target instanceof HTMLInputElement ? event.target.value : value;
        onCommit(
          limit ? digitsOnly(current, limit) : phone ? phoneOnly(current) : current,
        );
        onBlur?.();
      }}
    />
  );
}
