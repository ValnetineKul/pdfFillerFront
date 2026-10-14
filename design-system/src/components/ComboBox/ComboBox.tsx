import { Icon } from '@front/icons';
import type { ReactElement, ReactNode } from 'react';
import type {
  ComboBoxProps as PrimitiveComboBoxProps,
  ListBoxProps,
  ValidationResult,
} from 'react-aria-components';
import {
  Button,
  FieldError,
  Group,
  Input,
  Label,
  ListBox,
  Popover,
  Text,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { css } from '#styled-system/css';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import type { RemoveButtonProps } from '../RemoveButton';
import { RemoveButton } from '../RemoveButton';
import { ComboBox as CustomComboBox } from './base/CustomComboBox';
import { EmptyStateMessage } from './components/EmptyStateMessage';

export interface ComboBoxProps<T extends object>
  extends
    AsteriskFieldProps,
    Omit<PrimitiveComboBoxProps<T>, 'children'>,
    Omit<
      ListBoxProps<T>,
      | 'onBlur'
      | 'style'
      | 'onSelectionChange'
      | 'render'
      | 'onFocus'
      | 'children'
      | 'autoFocus'
      | 'className'
      | 'selectionMode'
    >,
    DataAttributes {
  label?: string;
  isRequired?: boolean;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: ReactNode | ((item: T) => ReactNode);
  placeholder?: string;
  emptyStateText?: string;
  hideInputClearButton?: boolean;
  clearButtonProps?: RemoveButtonProps;
}

export function ComboBox<T extends object>(
  props: ComboBoxProps<T>,
): ReactElement {
  const {
    label,
    description,
    errorMessage,
    children,
    necessityIndicator,
    customAsterisk,
    isRequired,
    emptyStateText = 'No results found',
    hideInputClearButton,
    clearButtonProps,
    ...otherProps
  } = props;

  return (
    <CustomComboBox {...otherProps} isRequired={isRequired}>
      {label && (
        <Label>
          {label}
          {isRequired && necessityIndicator && (
            <Asterisk>{customAsterisk}</Asterisk>
          )}
        </Label>
      )}
      <Group>
        <Input />
        {!hideInputClearButton && (
          <RemoveButton
            size="md"
            colorScheme="grayLight"
            slot="clear"
            {...clearButtonProps}
          />
        )}
        <Button>
          <Icon
            name="arrows/chevron-down"
            className={css({ iconSize: 'md' })}
          />
        </Button>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
      <Popover>
        <ListBox
          renderEmptyState={() => (
            <EmptyStateMessage emptyStateText={emptyStateText} />
          )}
        >
          {children}
        </ListBox>
      </Popover>
    </CustomComboBox>
  );
}
