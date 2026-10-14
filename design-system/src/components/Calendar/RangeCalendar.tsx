import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import type {
  DateValue,
  RangeCalendarProps as AriaRangeCalendarProps,
} from 'react-aria-components';
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  RangeCalendar as AriaRangeCalendar,
  Text,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { css } from '#styled-system/css';
import { calendarRecipe } from '#styled-system/recipes';

import { IconButton } from '../IconButton';
import type { ButtonProps } from '../shared';

export interface RangeCalendarProps<T extends DateValue>
  extends AriaRangeCalendarProps<T>, DataAttributes {
  errorMessage?: string;
  visibleMonthDuration?: number;
  prevButtonProps?: ButtonProps;
  nextButtonProps?: ButtonProps;
}

export function RangeCalendar<T extends DateValue>({
  errorMessage,
  visibleMonthDuration = 1,
  prevButtonProps,
  nextButtonProps,
  ...props
}: RangeCalendarProps<T>): ReactElement {
  const classNames = calendarRecipe({ type: 'multiple' });

  const now = new Date();
  const currentDate = {
    day: now.getDay(),
    month: now.getMonth(),
    year: now.getFullYear(),
  };

  return (
    <AriaRangeCalendar
      {...props}
      className={classNames.root}
      visibleDuration={{ months: visibleMonthDuration }}
      pageBehavior="single"
    >
      <div className={classNames.header}>
        <IconButton
          slot="previous"
          size="sm"
          variant="subtle"
          colorScheme="secondary"
          {...prevButtonProps}
        >
          <Icon
            className={css({ iconSize: 'md' })}
            name="arrows/chevron-left"
          />
        </IconButton>
        <Heading className={classNames.month} />
        <IconButton
          slot="next"
          size="sm"
          variant="subtle"
          colorScheme="secondary"
          {...nextButtonProps}
        >
          <Icon
            className={css({ iconSize: 'md' })}
            name="arrows/chevron-right"
          />
        </IconButton>
      </div>
      <div className={classNames.wrapper}>
        {Array.from({ length: visibleMonthDuration }, (_, index) => index).map(
          (index) => (
            <CalendarGrid
              key={index}
              className={classNames.grid}
              offset={{ months: index }}
            >
              <CalendarGridHeader className={classNames.gridHeader}>
                {(day) => (
                  <CalendarHeaderCell className={classNames.headerCell}>
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody className={classNames.gridBody}>
                {(date) => (
                  <CalendarCell
                    date={date}
                    data-current-date={
                      date.day === currentDate.day &&
                      date.month === currentDate.month &&
                      date.year === currentDate.year
                    }
                    data-first-day-on-month={date.day === 1}
                    data-last-day-on-month={
                      date.day === date.calendar.getDaysInMonth(date)
                    }
                    className={classNames.cell}
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          ),
        )}
      </div>
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </AriaRangeCalendar>
  );
}
