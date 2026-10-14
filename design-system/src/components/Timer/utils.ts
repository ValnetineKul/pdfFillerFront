import {
  fromAbsolute,
  getLocalTimeZone,
  type ZonedDateTime,
} from '@internationalized/date';

/** Самая крупная единица времени, которую рассчитывает таймер. */
export type TimerGranularity = 'hours' | 'days' | 'months' | 'years';

export type TimerValue = {
  years?: string;
  months?: string;
  days?: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

type CalendarUnit = 'years' | 'months' | 'days';

/** Дополняет число одним ведущим нулём, например `5` → `"05"`. */
export function addZero(digit: number): string {
  return digit < 10 ? `0${digit}` : `${digit}`;
}

/** Проверяет, что отсчёт закончился: все единицы времени равны нулю. */
export function isTimeUp(timer: TimerValue): boolean {
  return (
    (!timer.years || timer.years === '0') &&
    (!timer.months || timer.months === '0') &&
    (!timer.days || timer.days === '0') &&
    timer.hours === '00' &&
    timer.minutes === '00' &&
    timer.seconds === '00'
  );
}

function getCompleteCalendarUnits(
  start: ZonedDateTime,
  end: ZonedDateTime,
  unit: CalendarUnit,
): number {
  function fits(units: number): boolean {
    return start.add({ [unit]: units }).compare(end) <= 0;
  }

  if (!fits(1)) return 0;

  // Расширяем верхнюю границу удвоением, пока `high` не перестанет помещаться,
  // затем бинарным поиском находим наибольшее число целых единиц.
  let low = 1;
  let high = 2;
  while (fits(high)) {
    low = high;
    high *= 2;
  }

  while (high - low > 1) {
    const mid = low + Math.floor((high - low) / 2);
    if (fits(mid)) low = mid;
    else high = mid;
  }

  return low;
}

function getElapsedTime(milliseconds: number) {
  return {
    hours: Math.floor(milliseconds / HOUR),
    minutes: Math.floor((milliseconds % HOUR) / MINUTE),
    seconds: Math.floor((milliseconds % MINUTE) / SECOND),
  };
}

/**
 * Считает, сколько времени осталось до `timestamp`.
 *
 * Для `hours` и `days` используются обычные часы и 24-часовые дни. Для
 * `months` и `years` сначала считаются полные календарные годы, месяцы и дни в
 * указанном часовом поясе, а затем — оставшиеся часы, минуты и секунды.
 * Например, следующий месяц после 31 января закончится в последний день
 * февраля.
 *
 * Если указанное время уже прошло, функция возвращает нули. Все значения
 * времени передаются в секундах от начала эпохи Unix.
 */
export function calculateTime({
  timestamp,
  dateNow,
  granularity,
  timeZone = getLocalTimeZone(),
}: {
  timestamp: number;
  granularity: TimerGranularity;
  dateNow?: number;
  timeZone?: string;
}): TimerValue {
  const now = dateNow ?? Math.floor(Date.now() / 1000);

  if (timestamp <= now) {
    return {
      ...(granularity === 'years' && { years: '0', months: '0' }),
      ...(granularity === 'months' && { months: '0' }),
      ...(granularity === 'days' && { days: '0' }),
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  const difference = (timestamp - now) * SECOND;

  if (granularity === 'hours') {
    const { hours, minutes, seconds } = getElapsedTime(difference);

    return {
      hours: `${hours}`,
      minutes: addZero(minutes),
      seconds: addZero(seconds),
    };
  }

  if (granularity === 'days') {
    const days = Math.floor(difference / DAY);
    const { hours, minutes, seconds } = getElapsedTime(difference % DAY);

    return {
      days: `${days}`,
      hours: addZero(hours),
      minutes: addZero(minutes),
      seconds: addZero(seconds),
    };
  }

  const end = fromAbsolute(timestamp * SECOND, timeZone);
  const start = fromAbsolute(now * SECOND, timeZone);

  const years =
    granularity === 'years' ? getCompleteCalendarUnits(start, end, 'years') : 0;
  const afterYears = start.add({ years });
  const months = getCompleteCalendarUnits(afterYears, end, 'months');
  const afterMonths = afterYears.add({ months });
  const days = getCompleteCalendarUnits(afterMonths, end, 'days');
  const afterDays = afterMonths.add({ days });
  const remainder = end.toDate().getTime() - afterDays.toDate().getTime();
  const { hours, minutes, seconds } = getElapsedTime(remainder);

  if (granularity === 'months') {
    return {
      months: `${months}`,
      days: addZero(days),
      hours: addZero(hours),
      minutes: addZero(minutes),
      seconds: addZero(seconds),
    };
  }

  return {
    years: `${years}`,
    months: `${months}`,
    days: addZero(days),
    hours: addZero(hours),
    minutes: addZero(minutes),
    seconds: addZero(seconds),
  };
}

/** Единица времени для отрисовки: значение и подпись под ним. */
export type Unit = {
  /** Уникальный ключ для React, например `years` или `hours`. */
  key: string;
  /** Отформатированное значение, например `05`. */
  value: string;
  /** Подпись из `translation`, например `дней`. */
  title: string | undefined;
};
