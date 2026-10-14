import type {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
  ValidationResult,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

import type { AsteriskFieldProps } from '../Asterisk';
import type { CalendarDependency } from '../Calendar';
import type { TooltipButtonProps } from '../TooltipButton';

export interface DateFieldProps<T extends DateValue>
  extends AriaDatePickerProps<T>, AsteriskFieldProps, DataAttributes {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  calendar?: CalendarDependency;
  hideClearButton?: boolean;
  timeAriaLabel?: string;
  showCalendarButton?: boolean;
  calendarButtonProps?: TooltipButtonProps;
}
