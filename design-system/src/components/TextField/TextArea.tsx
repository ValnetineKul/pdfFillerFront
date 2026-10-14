import type { ForwardedRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import type {
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from 'react-aria-components';
import {
  FieldError,
  Group,
  Label,
  Text,
  TextArea as AriaTextArea,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import { TextField as CustomTextField } from './CustomTextField';

export interface TextAreaProps
  extends AriaTextFieldProps, AsteriskFieldProps, DataAttributes {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  ref?: ForwardedRef<HTMLDivElement>;
}

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(function (
  props: TextAreaProps,
  ref,
): ReactElement {
  const {
    label,
    description,
    errorMessage,
    isRequired,
    necessityIndicator,
    customAsterisk,
    ...otherProps
  } = props;

  return (
    <CustomTextField {...otherProps} isRequired={isRequired} ref={ref}>
      {label && (
        <Label>
          {label}
          {isRequired && necessityIndicator && (
            <Asterisk>{customAsterisk}</Asterisk>
          )}
        </Label>
      )}
      <Group>
        <AriaTextArea />
      </Group>
      {description && <Text slot="description">{description}</Text>}

      <FieldError>{errorMessage}</FieldError>
    </CustomTextField>
  );
});
