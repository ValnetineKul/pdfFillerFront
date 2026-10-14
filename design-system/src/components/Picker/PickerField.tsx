import type { ReactElement } from 'react';
import type { ValidationResult } from 'react-aria-components';
import { FieldError, Label, Text } from 'react-aria-components';
import type { GroupBase } from 'react-select5';

import type { DataAttributes } from '#shared/types';
import { splitDataAttributes } from '#shared/utils';
import { pickerFieldRecipe } from '#styled-system/recipes';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import { Picker } from './Picker';
import type { SelectProps } from './types';

export interface PickerFieldProps<
  OptionType,
  IsMulti extends boolean = false,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>,
>
  extends
    SelectProps<OptionType, IsMulti, Group>,
    AsteriskFieldProps,
    DataAttributes {
  label?: string;
  description?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  necessityIndicator?: boolean;
  errorMessage?: string | ((validation: ValidationResult) => string);
  contentStart?: ReactElement;
}

export function PickerField<
  OptionType = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  label,
  errorMessage,
  isRequired,
  description,
  customAsterisk,
  necessityIndicator,
  ...props
}: PickerFieldProps<OptionType, IsMulti, Group>): ReactElement {
  const classes = pickerFieldRecipe();

  const [dataAttributes, pickerProps] = splitDataAttributes(props);

  return (
    <div className={classes.root} {...dataAttributes}>
      {label && (
        <Label className={classes.label}>
          {label}
          {isRequired && necessityIndicator && (
            <Asterisk>{customAsterisk}</Asterisk>
          )}
        </Label>
      )}
      <Picker {...pickerProps} />
      {!errorMessage && description && (
        <Text slot="description" className={classes.textMessage}>
          {description}
        </Text>
      )}
      {errorMessage && (
        <FieldError className={classes.errorMessage}>{errorMessage}</FieldError>
      )}
    </div>
  );
}
