import type { CalendarDate, DateDuration } from '@internationalized/date';
import { getLocalTimeZone } from '@internationalized/date';
import type { ReactElement } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import type { DateValue, RangeCalendarProps } from 'react-aria';
import { useDateFormatter } from 'react-aria';
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  RangeCalendar,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import {
  calendarCellRecipe,
  multiMonthCalendarRecipe,
} from '#styled-system/recipes';

import {
  getMonthsDifference,
  isEndOfMonth,
  isEndOfWeek,
  isStartOfMonth,
  isStartOfWeek,
} from './helpers';

const timeZone = getLocalTimeZone();

export type MonthCalendarProps = {
  monthsOffset?: number;
};

const MonthCalendar: React.FC<MonthCalendarProps> = ({ monthsOffset }) => {
  const [monthTitleDate, setMonthTitleDate] = useState<CalendarDate | null>(
    null,
  );
  const monthDate = useRef<CalendarDate | null>(null);
  const formatterMonth = useDateFormatter({
    month: 'long',
  });
  const formatterYear = useDateFormatter({
    year: 'numeric',
  });

  useLayoutEffect(() => {
    setMonthTitleDate(monthDate.current);
  }, [monthDate.current]);

  const recipe = multiMonthCalendarRecipe();

  return (
    <div className={recipe.wrapper}>
      {monthTitleDate && (
        <Heading className={recipe.title} level={3}>
          {`${formatterMonth.format(monthTitleDate.toDate(timeZone))} ${formatterYear.format(monthTitleDate.toDate(timeZone))}`}
        </Heading>
      )}
      <CalendarGrid
        offset={{
          months: monthsOffset,
        }}
        className={recipe.table}
        weekdayStyle="short"
      >
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className={recipe.header}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody className={recipe.body}>
          {(date) => {
            if (!monthDate.current && isStartOfMonth(date.toDate(timeZone)))
              monthDate.current = date;

            const cellRecipe = calendarCellRecipe({
              isEndOfMonth: isEndOfMonth(date.toDate(timeZone)),
              isStartOfMonth: isStartOfMonth(date.toDate(timeZone)),
              isStartOfWeek: isStartOfWeek(date.toDate(timeZone)),
              isEndOfWeek: isEndOfWeek(date.toDate(timeZone)),
            });
            return (
              <CalendarCell className={cellRecipe.root} date={date}>
                {({
                  date: cellDate,
                  formattedDate,
                  isSelected,
                  isSelectionEnd,
                  isSelectionStart,
                  isOutsideMonth,
                  isDisabled,
                }) => (
                  <div
                    className={
                      calendarCellRecipe({
                        isSelected,
                        isSelectionEnd,
                        isSelectionStart,
                        isOutsideMonth,
                        isEndOfMonth: isEndOfMonth(cellDate.toDate(timeZone)),
                        isStartOfMonth: isStartOfMonth(
                          cellDate.toDate(timeZone),
                        ),
                        isStartOfWeek: isStartOfWeek(cellDate.toDate(timeZone)),
                        isEndOfWeek: isEndOfWeek(cellDate.toDate(timeZone)),
                        isDisabled,
                      }).cell
                    }
                  >
                    {formattedDate}
                  </div>
                )}
              </CalendarCell>
            );
          }}
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  );
};

export type MultiMonthCalendarProps<T extends DateValue> =
  RangeCalendarProps<T> & {
    visibleDuration?: DateDuration;
    orientation?: 'vertical' | 'horizontal';
  } & DataAttributes;

export const MultiMonthCalendar = ({
  visibleDuration = { months: 1 },
  orientation,
  ...props
}: MultiMonthCalendarProps<DateValue>): ReactElement => {
  const recipe = multiMonthCalendarRecipe({ orientation });

  return (
    <RangeCalendar
      visibleDuration={visibleDuration}
      pageBehavior="visible"
      className={recipe.root}
      {...props}
    >
      {Array.from({ length: getMonthsDifference(visibleDuration) }).map(
        (_, index) => (
          <MonthCalendar monthsOffset={index} key={index} />
        ),
      )}
    </RangeCalendar>
  );
};
