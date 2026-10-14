import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  calculateTime,
  isTimeUp,
  type TimerGranularity,
  type TimerValue,
} from './utils';

export type { TimerGranularity } from './utils';

type UseTimerOutput = {
  timer: TimerValue;
  timeIsUp: boolean;
};

/**
 * Возвращает оставшееся время и сообщает, закончился ли отсчёт.
 *
 * `dateNow` позволяет учитывать разницу между часами сервера и клиента.
 * `timeZone` нужен для правильного расчёта календарных месяцев и лет.
 */
export function useTimer(
  timestamp: number,
  dateNow?: number,
  granularity: TimerGranularity = 'years',
  timeZone?: string,
): UseTimerOutput {
  const adjustedTimestamp = useMemo(() => {
    if (dateNow === undefined) return timestamp;
    const clockDifference = Math.floor(Date.now() / 1000) - dateNow;
    return timestamp + clockDifference;
  }, [timestamp, dateNow]);

  const getCurrentTime = useCallback(() => {
    return calculateTime({
      timestamp: adjustedTimestamp,
      granularity,
      timeZone,
    });
  }, [adjustedTimestamp, granularity, timeZone]);

  const [timer, setTimer] = useState<TimerValue>(getCurrentTime);
  const timeIsUp = isTimeUp(timer);

  useEffect(() => {
    const currentTime = getCurrentTime();
    setTimer(currentTime);

    if (isTimeUp(currentTime)) return;

    const interval = setInterval(() => {
      const nextTime = getCurrentTime();
      setTimer(nextTime);

      if (isTimeUp(nextTime)) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [getCurrentTime]);

  return { timer, timeIsUp };
}
