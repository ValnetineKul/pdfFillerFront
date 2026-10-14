import type { ReactElement } from 'react';
import { type DateValue, Label } from 'react-aria-components';

import { datePickerRecipe } from '#styled-system/recipes';

import { Asterisk } from '../Asterisk';
import { DateTimeField } from '../DateField';
import type { DateRangeFieldProps } from './types';

export function DateTimeRangeField<T extends DateValue>({
  label,
  isRequired,
  shouldCloseOnSelect = false,
  granularity = 'minute',
  hourCycle = 24,
  hideTimeZone = true,
  value,
  onChange,
  validate,
  necessityIndicator,
  customAsterisk,
  defaultValue,
  ...props
}: DateRangeFieldProps<T>): ReactElement {
  const classes = datePickerRecipe();

  return (
    <div className={classes.root}>
      {label && (
        <Label className={classes.label}>
          {label}
          {isRequired && necessityIndicator && (
            <Asterisk>{customAsterisk}</Asterisk>
          )}
        </Label>
      )}
      <div className={classes.content}>
        <DateTimeField
          {...props}
          defaultValue={defaultValue?.start}
          calendar={{
            slot: 'left',
            variant: {
              type: 'multiple',
            },
          }}
          shouldCloseOnSelect={shouldCloseOnSelect}
          granularity={granularity}
          hourCycle={hourCycle}
          hideTimeZone={hideTimeZone}
          value={value?.start}
          maxValue={value?.end}
          onChange={(date) => {
            onChange?.({
              start: date,
              end: value?.end,
            });
          }}
          validate={(date) => validate?.(date, 'left', value?.end)}
        />
        <span aria-hidden="true" className={classes.divider}>
          –
        </span>
        <DateTimeField
          {...props}
          defaultValue={defaultValue?.end}
          calendar={{
            slot: 'right',
            variant: {
              type: 'multiple',
            },
          }}
          shouldCloseOnSelect={shouldCloseOnSelect}
          granularity={granularity}
          hourCycle={hourCycle}
          hideTimeZone={hideTimeZone}
          value={value?.end}
          minValue={value?.start}
          onChange={(date) => {
            onChange?.({
              start: value?.start,
              end: date,
            });
          }}
          validate={(date) => validate?.(date, 'right', value?.start)}
        />
      </div>
    </div>
  );
}
