import type { ForwardedRef, ReactElement } from 'react';
import { forwardRef } from 'react';
import type {
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from 'react-aria-components';
import { FieldError, Group, Input, Label, Text } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import { TextField as CustomTextField } from './CustomTextField';

export interface TextFieldProps
  extends AriaTextFieldProps, AsteriskFieldProps, DataAttributes {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  contentStart?: ReactElement;
  contentEnd?: ReactElement;
  ref?: ForwardedRef<HTMLDivElement>;
}

/**
 * TextField позволяет пользователю вводить простое текстовое значение с помощью клавиатуры.
 *
 * ## Особенности
 * - **Стилизация**: Поддерживает встроенные состояния для стилизации, такие как фокус, ошибка и отключенное состояние.
 * - **Доступность**: Использует встроенный элемент <input> для обеспечения совместимости с технологиями экранного доступа и формами HTML.
 * - **Навигация с клавиатуры**: Поддерживает взаимодействие через клавиши Tab, Enter и другие, что обеспечивает удобство использования.
 * - **Интеграция с формами HTML**: Позволяет использовать автозаполнение и навигацию с помощью клавиатуры.
 *
 * ## Применение
 * TextField идеально подходит для ввода текста, такого как имена, адреса электронной почты или другие текстовые данные.
 *
 * ## Анатомия
 *
 * Текстовые поля состоят из элемента ввода и метки. TextField автоматически управляет
 * связью между этими двумя элементами, используя атрибут for на элементе <label> и атрибут
 * aria-labelledby на элементе <input>.
 * TextField также поддерживает дополнительные элементы описания и сообщения об ошибках,
 * которые можно использовать для предоставления дополнительной информации о поле и любых
 * сообщениях о валидации. Эти элементы связаны с полем ввода с помощью атрибута aria-describedby.
 *
 * ## Дополнительная кастомизация
 * TextField имеет возможность добавлять элементы в начале и конце компонента при помощи аддонов contentStart и contentEnd (дополнительными элементами которые передаются слотами).
 * Данные аддоны используются для отрисовки иконки, внедрения выпадающего списка с выбором, кнопки, тултипы, текст и.т.д.
 * Это сделано для гибкой адаптации под требования бизнез задач в которых могут участвовать поля текстового ввода.
 *
 * ## Примечание
 * Если Label отсутствует, необходимо передать атрибут aria-label
 * или aria-labelledby, чтобы идентифицировать элемент для экранных считывателей.
 *
 * [Ссылка на документацию TextField](https://react-spectrum.adobe.com/react-aria/TextField.html#textfield)
 */

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(function (
  props: TextFieldProps,
  ref,
): ReactElement {
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
        {contentStart}
        <Input />
        {contentEnd}
      </Group>

      {description && <Text slot="description">{description}</Text>}

      <FieldError>{errorMessage}</FieldError>
    </CustomTextField>
  );
});
