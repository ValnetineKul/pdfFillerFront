import { describe, expect, it } from 'vitest';

import { buildGapSchema, gapFieldSchema, optionalGapSchema } from '@/ui/gap-field';

describe('gap field validation', () => {
  it('checks filled values under visa and agreement, not dotted keys', () => {
    const schema = buildGapSchema([
      { id: 'visa.surname', label: 'Фамилия' },
      { id: 'visa.passportNumber', label: 'Номер паспорта' },
      { id: 'agreement.series', label: 'Серия' },
      { id: 'agreement.number', label: 'Номер' },
    ]);

    const parsed = schema.safeParse({
      visa: {
        surname: 'KULCHIKHIN',
        passportNumber: '76 8321457',
      },
      agreement: {
        series: '76 83',
        number: '123456',
      },
    });

    expect(parsed.success).toBe(true);
    expect(
      schema.safeParse({
        'visa.surname': 'KULCHIKHIN',
        'visa.passportNumber': '768321457',
      }).success,
    ).toBe(false);
  });

  it('accepts only digits for passport series and number', () => {
    expect(gapFieldSchema('visa.passportNumber', 'Номер паспорта').safeParse('768321457').success).toBe(true);
    expect(gapFieldSchema('visa.passportNumber', 'Номер паспорта').safeParse('76832145A').success).toBe(false);
    expect(gapFieldSchema('agreement.series', 'Серия').safeParse('7683').success).toBe(true);
    expect(gapFieldSchema('agreement.series', 'Серия').safeParse('76AB').success).toBe(false);
    expect(gapFieldSchema('agreement.number', 'Номер').safeParse('123456').success).toBe(true);
    expect(gapFieldSchema('agreement.number', 'Номер').safeParse('12345').success).toBe(false);
  });

  it('lets work fields stay empty', () => {
    expect(optionalGapSchema('visa.employerName', 'Название организации').safeParse('').success).toBe(true);
    expect(optionalGapSchema('visa.occupation', 'Профессия').safeParse('').success).toBe(true);
    expect(optionalGapSchema('visa.employerPhone', 'Телефон организации').safeParse('12').success).toBe(false);
    expect(
      optionalGapSchema('visa.employerName', 'Название организации').safeParse('ООО Ромашка').success,
    ).toBe(true);
  });
});
