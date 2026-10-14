import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import { useRef } from 'react';
import type {
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue,
  ValidationResult,
} from 'react-aria-components';
import {
  DateInput,
  DateRangePicker as AriaDateRangePicker,
  DateSegment,
  FieldError,
  Group,
  Label,
  Popover as AriaPopover,
  Text,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { css, cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import { datePickerRecipe } from '#styled-system/recipes';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import { RangeCalendar } from '../Calendar';
import { TooltipButton, type TooltipButtonProps } from '../TooltipButton';
import { DateRangePickerClearButton } from './DateRangePickerClearButton';

export interface DateRangePickerProps<T extends DateValue>
  extends AriaDateRangePickerProps<T>, AsteriskFieldProps, DataAttributes {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  visibleMonthDuration?: number;
  startAriaLabel?: string;
  endAriaLabel?: string;
  calendarButtonProps?: TooltipButtonProps;
}

export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  defaultValue,
  granularity = 'minute',
  hourCycle = 24,
  hideTimeZone = true,
  isRequired,
  necessityIndicator,
  customAsterisk,
  visibleMonthDuration,
  startAriaLabel,
  endAriaLabel,
  calendarButtonProps,
  ...props
}: DateRangePickerProps<T>): ReactElement {
  const classes = datePickerRecipe();
  const triggerRef = useRef(null);

  return (
    <AriaDateRangePicker
      {...props}
      className={classes.root}
      granularity={granularity}
      hourCycle={hourCycle}
      hideTimeZone={hideTimeZone}
      defaultValue={defaultValue}
    >
      {({ isOpen, isInvalid }) => (
        <>
          {label && (
            <Label className={classes.label}>
              {label}
              {isRequired && necessityIndicator && (
                <Asterisk>{customAsterisk}</Asterisk>
              )}
            </Label>
          )}
          <Group className={classes.wrapper} isInvalid={isInvalid}>
            <DateInput
              slot="start"
              className={classes.dateInput}
              aria-label={startAriaLabel}
            >
              {(segment) => (
                <DateSegment segment={segment} className={classes.input} />
              )}
            </DateInput>
            <span aria-hidden="true">–</span>
            <DateInput
              slot="end"
              className={classes.dateInput}
              aria-label={endAriaLabel}
            >
              {(segment) => (
                <DateSegment segment={segment} className={classes.input} />
              )}
            </DateInput>
            <DateRangePickerClearButton />
            <span ref={triggerRef} className={classes.trigger}>
              <TooltipButton isInvalid={isInvalid} {...calendarButtonProps}>
                <Icon
                  name="time/calendar"
                  className={css({ iconSize: 'sm' })}
                />
              </TooltipButton>
            </span>
          </Group>
          {description && (
            <Text slot="description" className={classes.description}>
              {description}
            </Text>
          )}
          {errorMessage && (
            <FieldError className={classes.errorMessage}>
              {errorMessage}
            </FieldError>
          )}
          {isOpen && (
            <AriaPopover
              className={cx(
                classes.popover,
                scrollable({ direction: 'vertical', width: 'auto' }),
              )}
              triggerRef={triggerRef}
              placement="bottom end"
            >
              <RangeCalendar visibleMonthDuration={visibleMonthDuration} />
            </AriaPopover>
          )}
        </>
      )}
    </AriaDateRangePicker>
  );
}
