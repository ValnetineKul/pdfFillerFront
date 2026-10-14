import { Icon } from '@front/icons';
import { type ReactElement } from 'react';
import type {
  CalendarProps as AriaCalendarProps,
  DateValue,
} from 'react-aria-components';
import {
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  Text,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { css } from '#styled-system/css';
import type { CalendarRecipeVariantProps } from '#styled-system/recipes';
import { calendarRecipe } from '#styled-system/recipes';

import { IconButton } from '../IconButton';
import type { ButtonProps } from '../shared';
import {
  checkEndRangeDate,
  checkSelectedRange,
  checkStartRangeDate,
} from './utils';

export type CalendarDependency = {
  variant: CalendarRecipeVariantProps;
  slot: string;
};

export interface CalendarProps<T extends DateValue>
  extends AriaCalendarProps<T>, DataAttributes {
  errorMessage?: string;
  calendar?: CalendarDependency;
  prevButtonProps?: ButtonProps;
  nextButtonProps?: ButtonProps;
}

export function Calendar<T extends DateValue>({
  errorMessage,
  calendar,
  prevButtonProps,
  nextButtonProps,
  ...props
}: CalendarProps<T>): ReactElement {
  const classNames = calendarRecipe(
    calendar ? { type: calendar.variant.type } : undefined,
  );

  const now = new Date();
  const currentDate = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };

  return (
    <AriaCalendar {...props} className={classNames.root}>
      {({ state }) => (
        <>
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
          <CalendarGrid className={classNames.grid}>
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
                  {...(calendar
                    ? {
                        'data-selected': checkSelectedRange({
                          slot: calendar.slot,
                          minValue: state.minValue,
                          maxValue: state.maxValue,
                          date,
                          value: state.value,
                        }),
                        'data-selection-start': checkStartRangeDate({
                          slot: calendar.slot,
                          minValue: state.minValue,
                          date,
                          value: state.value,
                        }),
                        'data-selection-end': checkEndRangeDate({
                          slot: calendar.slot,
                          maxValue: state.maxValue,
                          date,
                          value: state.value,
                        }),
                      }
                    : undefined)}
                />
              )}
            </CalendarGridBody>
          </CalendarGrid>
          {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
        </>
      )}
    </AriaCalendar>
  );
}
