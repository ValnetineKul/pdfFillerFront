import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import { useRef } from 'react';
import type { DateValue } from 'react-aria-components';
import {
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  FieldError,
  Group,
  Label,
  Popover as AriaPopover,
  Text,
} from 'react-aria-components';

import { css, cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import { datePickerRecipe } from '#styled-system/recipes';

import { Asterisk } from '../Asterisk';
import { Calendar, CalendarTimeField } from '../Calendar';
import { TooltipButton } from '../TooltipButton';
import { DateFieldClearButton } from './DateFieldClearButton';
import type { DateFieldProps } from './types';

export function DateTimeField<T extends DateValue>({
  label,
  description,
  errorMessage,
  defaultValue,
  isRequired,
  shouldCloseOnSelect = false,
  granularity = 'minute',
  hourCycle = 24,
  hideTimeZone = true,
  calendar,
  necessityIndicator,
  customAsterisk,
  isDisabled,
  hideClearButton,
  timeAriaLabel,
  calendarButtonProps,
  ...props
}: DateFieldProps<T>): ReactElement {
  const classes = datePickerRecipe();
  const triggerRef = useRef(null);

  return (
    <AriaDatePicker
      {...props}
      isDisabled={isDisabled}
      className={classes.root}
      granularity={granularity}
      hourCycle={hourCycle}
      hideTimeZone={hideTimeZone}
      shouldCloseOnSelect={shouldCloseOnSelect}
      defaultValue={defaultValue}
    >
      {({
        isInvalid,
        isOpen,
        state: {
          realtimeValidation: { validationErrors },
        },
      }) => (
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
            <DateInput className={classes.dateInput}>
              {(segment) => (
                <DateSegment segment={segment} className={classes.input} />
              )}
            </DateInput>
            {!hideClearButton && !isDisabled && <DateFieldClearButton />}
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
          {(errorMessage ?? Boolean(validationErrors.length)) && (
            <FieldError className={classes.errorMessage}>
              {errorMessage ?? validationErrors.join(',')}
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
              <div>
                <Calendar calendar={calendar} />
                <CalendarTimeField
                  hourCycle={hourCycle}
                  hideTimeZone={hideTimeZone}
                  granularity={granularity}
                  aria-label={timeAriaLabel}
                />
              </div>
            </AriaPopover>
          )}
        </>
      )}
    </AriaDatePicker>
  );
}
