import type { ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import { pickDataAttributes } from '#shared/utils';
import type { TimerRecipeVariantProps } from '#styled-system/recipes';
import { timerRecipe } from '#styled-system/recipes';

import { TimerUnits } from './TimerUnits';
import type { TimerGranularity } from './useTimer';
import { useTimer } from './useTimer';
import type { Unit } from './utils';

/** Параметры таймера обратного отсчёта. */
export type TimerProps = {
  /** Время окончания отсчёта: Unix timestamp в секундах. */
  time: number;
  /**
   * Текущее время сервера: Unix timestamp в секундах.
   *
   * Передайте его вместе с `time`, если часы клиента могут отличаться от
   * серверных. Таймер запомнит, сколько времени осталось между `dateNow` и
   * `time`, и продолжит отсчёт по часам клиента.
   */
  dateNow?: number;
  /** Скрывает таймер, когда время закончилось. */
  hideTimerWhenTheTimeIsOver?: boolean;
  /** Показывает годы, если значение больше нуля. */
  showYear?: boolean;
  /** Показывает месяцы, если значение больше нуля. */
  showMonth?: boolean;
  /** Показывает дни, если значение больше нуля. */
  showDay?: boolean;
  /** Показывает часы. */
  showHour?: boolean;
  /** Показывает минуты. */
  showMinute?: boolean;
  /** Показывает секунды. */
  showSecond?: boolean;
  /**
   * Самая крупная единица времени в таймере.
   *
   * Для `hours` и `days` расчёт не зависит от часового пояса: день всегда равен
   * 24 часам. Для `months` и `years` учитываются календарь и `timeZone`, поэтому
   * длина месяца, високосный год и переход на летнее время влияют на результат.
   *
   * @default 'years'
   */
  granularity?: TimerGranularity;
  /**
   * Часовой пояс в формате IANA, например `Europe/Moscow`.
   * Нужен только для `granularity="months"` и `granularity="years"`.
   *
   * @default Часовой пояс браузера или среды выполнения.
   */
  timeZone?: string;
  /** Подписи для годов, месяцев, дней, часов, минут и секунд. */
  translation?: {
    years?: string;
    months?: string;
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
} & TimerRecipeVariantProps &
  DataAttributes;
/**
 * Показывает, сколько времени осталось до указанного момента.
 *
 * Таймер обновляется раз в секунду. Когда время заканчивается, он показывает
 * нули и больше не запускает обновления. Передайте `timeZone`, если месяцы и
 * годы должны считаться одинаково в браузере и при серверном рендеринге.
 */

export function Timer(props: TimerProps): ReactElement | null {
  const [variantProps, otherProps] = timerRecipe.splitVariantProps(props);
  const classNames = timerRecipe(variantProps);

  const {
    time,
    hideTimerWhenTheTimeIsOver = false,
    showYear,
    showMonth,
    dateNow,
    timeZone,
    showDay,
    showHour,
    showMinute,
    showSecond,
    granularity,
    translation,
  } = otherProps;

  const {
    timer: { years, months, days, hours, minutes, seconds },
    timeIsUp,
  } = useTimer(time, dateNow, granularity, timeZone);

  if (hideTimerWhenTheTimeIsOver && timeIsUp) return null;

  const dataAttributes = pickDataAttributes(props);

  if (variantProps.variant === 'text') {
    const date = [years, months, days].filter((value) => value !== undefined);

    return (
      <span {...dataAttributes} className={classNames.unstyled}>
        {date.length > 0 && `${date.join('-')} `}
        {hours}:{minutes}:{seconds}
      </span>
    );
  }

  const isSolid = variantProps.variant === 'solid';
  const dateUnits: Unit[] = [];
  const timeUnits: Unit[] = [];

  if (showYear && years && Number(years) > 0) {
    dateUnits.push({
      key: 'years',
      value: years,
      title: translation?.years,
    });
  }

  if (showMonth && months && Number(months) > 0) {
    dateUnits.push({
      key: 'months',
      value: months,
      title: translation?.months,
    });
  }

  if (showDay && days && Number(days) > 0) {
    dateUnits.push({
      key: 'days',
      value: days,
      title: translation?.days,
    });
  }

  if (showHour) {
    timeUnits.push({ key: 'hours', value: hours, title: translation?.hours });
  }

  if (showMinute) {
    timeUnits.push({
      key: 'minutes',
      value: minutes,
      title: translation?.minutes,
    });
  }

  if (showSecond) {
    timeUnits.push({
      key: 'seconds',
      value: seconds,
      title: translation?.seconds,
    });
  }

  return (
    <div {...dataAttributes} className={classNames.root}>
      <TimerUnits
        units={dateUnits}
        classNames={classNames}
        wrapper="unitWrapper"
        showColonBetween={isSolid}
        showColonAfterLast={isSolid && timeUnits.length > 0}
      />
      {timeUnits.length > 0 && (
        <div className={classNames.timeWrapper}>
          <TimerUnits
            units={timeUnits}
            classNames={classNames}
            wrapper="timeUnitWrapper"
            showColonBetween
          />
        </div>
      )}
    </div>
  );
}
