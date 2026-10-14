import type { CalendarDate } from '@internationalized/date';
import type { DateValue } from 'react-aria-components';

export const checkSelectedRange = ({
  slot,
  minValue,
  maxValue,
  date,
  value,
}: {
  slot: string;
  date: CalendarDate;
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
  value?: CalendarDate | null;
}): boolean | undefined => {
  if (slot === 'left' && maxValue && value) {
    return date.compare(value) >= 0 && date.compare(maxValue) <= 0;
  }
  if (slot === 'right' && minValue && value) {
    return date.compare(value) <= 0 && date.compare(minValue) >= 0;
  }
};
export const checkStartRangeDate = ({
  slot,
  minValue,
  date,
  value,
}: {
  slot: string;
  date: CalendarDate;
  minValue?: DateValue | null;
  value?: CalendarDate | null;
}): boolean | undefined => {
  if (slot === 'left' && value) {
    return date.compare(value) === 0;
  }
  if (slot === 'right' && minValue) {
    return date.compare(minValue) === 0;
  }
};
export const checkEndRangeDate = ({
  slot,
  maxValue,
  date,
  value,
}: {
  slot: string;
  date: CalendarDate;
  maxValue?: DateValue | null;
  value?: CalendarDate | null;
}): boolean | undefined => {
  if (slot === 'left' && maxValue) {
    return date.compare(maxValue) === 0;
  }
  if (slot === 'right' && value) {
    return date.compare(value) === 0;
  }
};
