import { CalendarDate, type DateValue } from '@internationalized/date';
import { useEffect, useState } from 'react';
import { I18nProvider } from 'react-aria-components';

import { DateField } from '@/design-system';
import { dateFieldWrapClass } from '@/ui/styles';

export function parseRuDate(value: string): CalendarDate | null {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value.trim());
  if (!match) {
    return null;
  }

  try {
    return new CalendarDate(Number(match[3]), Number(match[2]), Number(match[1]));
  } catch {
    return null;
  }
}

export function formatRuDate(value: DateValue): string {
  const day = String(value.day).padStart(2, '0');
  const month = String(value.month).padStart(2, '0');
  return `${day}.${month}.${value.year}`;
}

export function DateGapControl({
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
  const [date, setDate] = useState<DateValue | null>(() => parseRuDate(value));

  useEffect(() => {
    const parsed = parseRuDate(value);
    if (!parsed) {
      return;
    }
    setDate((current) =>
      current && formatRuDate(current) === formatRuDate(parsed) ? current : parsed,
    );
  }, [value]);

  return (
    <I18nProvider locale="ru-RU">
      <div className={dateFieldWrapClass}>
        <DateField
          label={label}
          value={date}
          autoFocus={autoFocus}
          isDisabled={isDisabled}
          isRequired={isRequired}
          necessityIndicator={isRequired}
          validationBehavior="aria"
          isInvalid={invalid}
          errorMessage={error}
          onChange={(next) => {
            setDate(next);
            if (!next || next.year < 1000) {
              return;
            }
            const formatted = formatRuDate(next);
            onValue(formatted);
            onCommit(formatted);
          }}
          onBlur={() => onBlur?.()}
        />
      </div>
    </I18nProvider>
  );
}
