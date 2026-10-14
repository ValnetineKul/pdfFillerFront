import type { ForwardedRef, ReactElement, ReactNode } from 'react';
import { forwardRef } from 'react';
import type {
  SearchFieldProps as AriaSearchFieldProps,
  SearchFieldRenderProps,
  ValidationResult,
} from 'react-aria-components';
import { FieldError, Group, Input, Label, Text } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import { SearchField as CustomSearchField } from './CustomSearchField';

export interface SearchFieldProps
  extends AriaSearchFieldProps, AsteriskFieldProps, DataAttributes {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  contentStart?: ReactNode | ((state: SearchFieldRenderProps) => ReactNode);
  contentEnd?: ReactNode | ((state: SearchFieldRenderProps) => ReactNode);
  ref?: ForwardedRef<HTMLDivElement>;
}

export const SearchField = forwardRef<HTMLDivElement, SearchFieldProps>(
  function (props: SearchFieldProps, ref): ReactElement {
    const {
      label,
      description,
      errorMessage,
      contentStart,
      contentEnd,
      isRequired,
      necessityIndicator,
      customAsterisk,
      ...otherProps
    } = props;

    return (
      <CustomSearchField {...otherProps} isRequired={isRequired} ref={ref}>
        {(renderProps) => (
          <>
            {label && (
              <Label>
                {label}
                {isRequired && necessityIndicator && (
                  <Asterisk>{customAsterisk}</Asterisk>
                )}
              </Label>
            )}

            <Group>
              {typeof contentStart === 'function'
                ? contentStart(renderProps)
                : contentStart}
              <Input />
              {typeof contentEnd === 'function'
                ? contentEnd(renderProps)
                : contentEnd}
            </Group>

            {description && <Text slot="description">{description}</Text>}

            <FieldError>{errorMessage}</FieldError>
          </>
        )}
      </CustomSearchField>
    );
  },
);
