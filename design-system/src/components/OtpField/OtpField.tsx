import type { OTPInputProps } from 'input-otp';
import { OTPInput } from 'input-otp';
import type { ReactElement } from 'react';
import { useRef } from 'react';
import { useTextField } from 'react-aria';
import type { TextFieldProps as AriaTextFieldProps } from 'react-aria-components';
import {
  FieldError,
  Label,
  Text,
  TextField as AriaTextField,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { OtpFieldRecipeVariantProps } from '#styled-system/recipes';
import { otpFieldRecipe } from '#styled-system/recipes';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';

export type OtpFieldProps = Omit<AriaTextFieldProps, 'onChange' | 'children'> &
  Omit<OTPInputProps, 'autoCapitalize' | 'children'> &
  OtpFieldRecipeVariantProps &
  AsteriskFieldProps & {
    label?: string;
    isRequired?: boolean;
    isValid?: boolean;
    description?: string;
    errorMessage?: string;
    placeholder?: string;
    isDisabled?: boolean;
  } & DataAttributes;

/**
 * OTPField — это компонент, позволяющий пользователю вводить одноразовые пароли,
 * часто используемые для аутентификации. Он обеспечивает более безопасный вход в
 * систему, используя временные коды, которые отправляются пользователю через
 * SMS или электронную почту.
 *
 * ## Особенности
 * - **Гибкость**: Поддерживает различные форматы одноразовых паролей и может
 *   быть настроен для ввода нескольких кодов.
 * - **Клавиатурная навигация**: Пользователи могут перемещаться между полями
 *   ввода с помощью клавиш Tab и Shift+Tab, а также могут использовать
 *   клавиши стрелок для навигации.
 * - **Доступность**: OTPField соответствует стандартам ARIA, обеспечивая
 *   поддержку для экранных считывателей и других вспомогательных технологий.
 * - **Валидация**: Поддерживает валидацию введенных значений с возможностью
 *   настройки UI для отображения ошибок валидации.
 * - **Стилизация**: Поля ввода включают встроенные состояния для стилей, такие
 *   как фокусировка, ошибка и активное состояние.
 *
 * ## Анатомия
 * OTPField состоит из нескольких полей ввода, каждое из которых отвечает за
 * одну цифру или символ одноразового пароля. Эти поля могут быть расположены
 * в ряд, чтобы создать единый визуальный элемент.
 *
 * Данный компонент кастомный и НЕ базируется на библиотеке React Aria Components
 */

export function OtpField(props: OtpFieldProps): ReactElement {
  const [variantProps, otherProps] = otpFieldRecipe.splitVariantProps(props);

  const {
    maxLength = 4,
    label,
    isRequired,
    description,
    errorMessage,
    isValid,
    isDisabled,
    inputMode = 'numeric',
    pushPasswordManagerStrategy = 'none',
    necessityIndicator,
    customAsterisk,
    ...otpInputProps
  } = otherProps;

  const classNames = otpFieldRecipe(variantProps);

  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const { inputProps, descriptionProps, errorMessageProps, isInvalid } =
    useTextField(otherProps, textFieldRef);

  return (
    <AriaTextField
      {...otherProps}
      ref={textFieldRef}
      className={classNames.root}
    >
      {label && (
        <Label className={classNames.label}>
          {label}
          {isRequired && necessityIndicator && (
            <Asterisk>{customAsterisk}</Asterisk>
          )}
        </Label>
      )}

      <OTPInput
        {...otpInputProps}
        disabled={isDisabled}
        pushPasswordManagerStrategy={pushPasswordManagerStrategy}
        inputMode={inputMode}
        maxLength={maxLength}
        containerClassName={classNames.wrapper}
        id={inputProps.id}
        render={({ slots }) => (
          <>
            {slots.slice(0, maxLength).map((slot, idx) => (
              <div
                {...inputProps}
                key={idx}
                id={`opt-segment-${idx}`}
                aria-describedby={inputProps.id}
                className={classNames.input}
                data-active={slot.isActive}
                data-invalid={isInvalid}
                data-valid={!isInvalid}
                data-filled={!!slot.char}
                data-disabled={isDisabled}
                role="textbox"
              >
                {slot.char !== null && <div>{slot.char}</div>}
                {slot.hasFakeCaret && (
                  <div className={classNames.caret}>
                    <div />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      />

      {!errorMessage && description && (
        <Text
          {...descriptionProps}
          slot="description"
          data-valid={isValid}
          className={classNames.description}
        >
          {description}
        </Text>
      )}
      {errorMessage && (
        <FieldError {...errorMessageProps} className={classNames.errorMessage}>
          {errorMessage}
        </FieldError>
      )}
    </AriaTextField>
  );
}
