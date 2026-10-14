import type { ForwardedRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import type {
  NumberFieldProps as AriaNumberFieldProps,
  ValidationResult,
} from 'react-aria-components';
import { FieldError, Group, Input, Label, Text } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import { NumberField as CustomNumberField } from './CustomNumberField';

export interface NumberFieldProps
  extends AriaNumberFieldProps, AsteriskFieldProps, DataAttributes {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  contentStart?: ReactElement;
  contentEnd?: ReactElement;
  ref?: ForwardedRef<HTMLDivElement>;
}

/**
 * Поля чисел позволяют пользователям вводить и изменять числовые значения, такие как количества, размеры и валюты.
 *
 * ### Основные особенности:
 * - Ввод с клавиатуры и поддержка стрелок
 * - Увеличение/уменьшение через кнопки и прокрутку мыши
 * - Форматирование в соответствии с локальными стандартами (например, `.` в США и `,` в Германии)
 *
 * Поля чисел поддерживают различные числовые форматы, включая десятичные числа, проценты и валюты. Форматирование реализуется с помощью API `Intl.NumberFormat`, а парсинг — через собственный парсер.
 *
 * ### Шаги:
 * Увеличение/уменьшение значений контролируется свойством `step`, и применяется округление при потере фокуса.
 *
 * ### Разрешенные символы:
 * Ввод ограничивается допустимыми символами в зависимости от формата (например, цифры и знак процента для процентов), поддерживая различные системы счисления.
 */

export const NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(
  function (props: NumberFieldProps, ref): ReactElement {
    const {
      label,
      description,
      errorMessage,
      contentStart,
      contentEnd,
      necessityIndicator,
      isRequired,
      customAsterisk,
      ...otherProps
    } = props;

    return (
      <CustomNumberField {...otherProps} ref={ref}>
        {label && (
          <Label>
            {label}
            {isRequired && necessityIndicator && (
              <Asterisk>{customAsterisk}</Asterisk>
            )}
          </Label>
        )}

        <Group>
          {contentStart}
          <Input />
          {contentEnd}
        </Group>

        {description && <Text slot="description">{description}</Text>}

        <FieldError>{errorMessage}</FieldError>
      </CustomNumberField>
    );
  },
);

export { FieldAddon } from '../FieldAddon';
