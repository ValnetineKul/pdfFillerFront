import type { DatePickerProps, DateValue } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

import type { ButtonProps } from '../shared';

export type CalendarTimeFieldProps = Pick<
  DatePickerProps<DateValue>,
  'hideTimeZone' | 'hourCycle' | 'granularity'
> & {
  'aria-label'?: string;
  okButtonProps?: ButtonProps;
} & DataAttributes;
