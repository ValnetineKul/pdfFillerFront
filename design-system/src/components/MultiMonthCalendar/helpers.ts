import type { DateDuration } from '@internationalized/date';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';

export const getCalendarDateFromDate = (date: Date | string): CalendarDate => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new CalendarDate(year, month, day);
};

export function isStartOfWeek(date: Date): boolean {
  return date.getDay() === 1;
}

export function isEndOfWeek(date: Date): boolean {
  return date.getDay() === 0;
}

export const getMonthsDifference = (dateDuration: DateDuration): number => {
  const todayDate = today(getLocalTimeZone());
  const dateWithAdditionalDate = todayDate.add(dateDuration);

  let months = 0;

  months += dateWithAdditionalDate.month - todayDate.month;
  months += (dateWithAdditionalDate.year - todayDate.year) * 12;

  return months;
};

export function isEndOfMonth(date: Date): boolean {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  return nextDay.getDate() === 1;
}

export function isStartOfMonth(date: Date): boolean {
  return date.getDate() === 1;
}
