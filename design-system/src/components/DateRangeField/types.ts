import type {
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from '@internationalized/date';
import type { ValidationError } from '@react-types/shared/src/inputs';
import type {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
  ValidationResult,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

import type { AsteriskFieldProps } from '../Asterisk';

type MappedDateValue<T> = T extends ZonedDateTime
  ? ZonedDateTime
  : T extends CalendarDateTime
    ? CalendarDateTime
    : T extends CalendarDate
      ? CalendarDate
      : never;

export type RangeValue<T> = {
  start?: T | null;
  end?: T | null;
};

export interface DateRangeFieldProps<T extends DateValue>
  extends
    Omit<
      AriaDatePickerProps<T>,
      'value' | 'defaultValue' | 'onChange' | 'validate'
    >,
    AsteriskFieldProps,
    DataAttributes {
  value?: RangeValue<T>;
  defaultValue?: RangeValue<T>;
  onChange?: (value: RangeValue<MappedDateValue<T> | T>) => void;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  validate?: (
    value: MappedDateValue<T>,
    type: 'left' | 'right',
    compareValue?: T | null,
  ) => ValidationError | true | null | undefined;
  startAriaLabel?: string;
  endAriaLabel?: string;
}
