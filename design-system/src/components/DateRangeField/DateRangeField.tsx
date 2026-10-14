import type { ReactElement } from 'react';
import { type DateValue, Label } from 'react-aria-components';

import { datePickerRecipe } from '#styled-system/recipes';

import { Asterisk } from '../Asterisk';
import { DateField } from '../DateField';
import type { DateRangeFieldProps } from './types';

export function DateRangeField<T extends DateValue>({
  label,
  defaultValue,
  isRequired,
  value,
  onChange,
  validate,
  necessityIndicator,
  customAsterisk,
  startAriaLabel,
  endAriaLabel,
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
        <DateField
          {...props}
          calendar={{
            slot: 'left',
            variant: {
              type: 'multiple',
            },
          }}
          value={value?.start}
          defaultValue={defaultValue?.start}
          maxValue={value?.end}
          aria-label={startAriaLabel}
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
        <DateField
          {...props}
          calendar={{
            slot: 'right',
            variant: {
              type: 'multiple',
            },
          }}
          value={value?.end}
          defaultValue={defaultValue?.end}
          minValue={value?.start}
          aria-label={endAriaLabel}
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
