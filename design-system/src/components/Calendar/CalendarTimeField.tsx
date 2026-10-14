import { Time } from '@internationalized/date';
import type { ReactElement } from 'react';
import { useContext, useEffect } from 'react';
import {
  DateInput,
  DatePickerStateContext,
  DateSegment,
  Group,
  TimeField,
} from 'react-aria-components';

import { datePickerRecipe } from '#styled-system/recipes';

import { IconButton } from '../IconButton';
import type { CalendarTimeFieldProps } from './types';

export function CalendarTimeField({
  hideTimeZone,
  hourCycle,
  granularity,
  'aria-label': ariaLabel,
  okButtonProps,
}: CalendarTimeFieldProps): ReactElement {
  const state = useContext(DatePickerStateContext);
  const classes = datePickerRecipe();
  const defaultTime = new Time(0, 0);

  useEffect(() => {
    if (!state?.timeValue && state?.dateValue) {
      state?.setTimeValue(defaultTime);
    }
  }, [state?.timeValue, state?.dateValue]);

  return (
    <Group className={classes.timeWrapper}>
      <TimeField
        aria-label={ariaLabel}
        className={classes.wrapper}
        onChange={(value) => value && state?.setTimeValue(value)}
        value={state?.timeValue ?? defaultTime}
        hideTimeZone={hideTimeZone}
        hourCycle={hourCycle}
        granularity={granularity === 'day' ? 'minute' : granularity}
      >
        <DateInput className={classes.dateInput}>
          {(segment) => (
            <DateSegment segment={segment} className={classes.input} />
          )}
        </DateInput>
      </TimeField>
      <IconButton
        colorScheme="secondary"
        variant="subtle"
        onPress={state?.close}
        {...okButtonProps}
      >
        OK
      </IconButton>
    </Group>
  );
}
