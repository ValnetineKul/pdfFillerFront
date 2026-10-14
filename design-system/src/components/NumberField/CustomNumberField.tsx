/*
 * In this implementation, we've based our TextField component on React Aria's NumberField.
 * The library typically only accepts decrement and increment slots as buttons.
 * However, for our TextField, we need to accept any HTML elements as slots, with any name for the slot attribute.
 * To achieve this, we've applied a custom implementation:
 * We've added [DEFAULT_SLOT](https://react-spectrum.adobe.com/react-aria/advanced.html#default-slot) to the button context.
 * Additionally, we explicitly state the usage of decrement and increment slots for the button context.
 */

import { filterDOMProps } from '@react-aria/utils';
import type { ForwardedRef, ReactElement } from 'react';
import { forwardRef, useRef } from 'react';
import {
  mergeProps,
  useFocusRing,
  useLocale,
  useNumberField,
} from 'react-aria';
import type { NumberFieldProps } from 'react-aria-components';
import {
  ButtonContext,
  DEFAULT_SLOT,
  FieldErrorContext,
  FormContext,
  GroupContext,
  InputContext,
  LabelContext,
  NumberFieldContext,
  NumberFieldStateContext,
  Provider,
  SeparatorContext,
  TextContext,
  useContextProps,
  useSlottedContext,
} from 'react-aria-components';
import { useNumberFieldState } from 'react-stately';

import { useRenderProps, useSlot } from '#shared/hooks';
import { removeDataAttributes } from '#shared/utils';
import { cx } from '#styled-system/css';
import { textFieldRecipe } from '#styled-system/recipes';

import { ButtonVariantContext } from '../shared';

const textFieldClasses = textFieldRecipe();

function NumberField(
  props: NumberFieldProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  [props, ref] = useContextProps(props, ref, NumberFieldContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const { locale } = useLocale();
  const { validationBehavior: formValidationBehavior } =
    useSlottedContext(FormContext) ?? {};
  const validationBehavior =
    props.validationBehavior ?? formValidationBehavior ?? 'native';

  const state = useNumberFieldState({ ...props, locale, validationBehavior });
  const [labelRef, hasLabel] = useSlot();
  const [groupRef, hasGroup] = useSlot();

  const {
    labelProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
    descriptionProps,
    errorMessageProps,
    ...validation
  } = useNumberField(
    {
      ...removeDataAttributes(props),
      label: hasLabel,
      validationBehavior: props.validationBehavior ?? 'native',
    },
    state,
    inputRef,
  );

  const renderProps = useRenderProps({
    ...props,
    values: {
      state,
      isDisabled: props.isDisabled ?? false,
      isInvalid: validation.isInvalid,
      isReadOnly: props.isReadOnly ?? false,
      isRequired: props.isRequired ?? false,
    },
    defaultClassName: 'react-aria-NumberField',
  });

  const { isFocused, focusProps } = useFocusRing({
    isTextInput: true,
    within: true,
    autoFocus: props.autoFocus,
  });

  const rootClasses = cx(textFieldClasses.root, renderProps.className);

  const inputWrapperClasses = cx(
    textFieldClasses.inputWrapper,
    isFocused ? textFieldClasses.inputFocusWrapper : '',
  );

  const inputClasses = cx(
    textFieldClasses.input,
    textFieldClasses.inputElement,
    !hasGroup ? inputWrapperClasses : '',
  );

  const mergedInputProps = mergeProps(inputProps, focusProps);

  return (
    <div
      {...filterDOMProps(props)}
      {...renderProps}
      ref={ref}
      slot={props.slot ?? undefined}
      data-disabled={props.isDisabled ?? undefined}
      data-invalid={validation.isInvalid || undefined}
      className={rootClasses}
    >
      <Provider
        values={[
          [NumberFieldStateContext, state],
          [
            LabelContext,
            { ...labelProps, ref: labelRef, className: textFieldClasses.label },
          ],
          [
            InputContext,
            {
              ...mergedInputProps,
              ref: inputRef,
              className: inputClasses,
            },
          ],
          [
            TextContext,
            {
              slots: {
                description: {
                  ...descriptionProps,
                  className: textFieldClasses.description,
                  hidden: validation.isInvalid,
                },
                errorMessage: {
                  ...errorMessageProps,
                  className: textFieldClasses.error,
                },
              },
            },
          ],
          [FieldErrorContext, validation],
          [
            GroupContext,
            {
              ref: groupRef,
              isDisabled: props.isDisabled,
              isInvalid: validation.isInvalid,
              className: inputWrapperClasses,
              role: 'presentation',
            },
          ],
          [
            ButtonContext,
            {
              slots: {
                [DEFAULT_SLOT]: {
                  className: textFieldClasses.button,
                },
                decrement: {
                  ...decrementButtonProps,
                  className: textFieldClasses.button,
                },
                increment: {
                  ...incrementButtonProps,
                  className: textFieldClasses.button,
                },
              },
              isDisabled: props.isDisabled,
              className: textFieldClasses.button,
            },
          ],
          [
            ButtonVariantContext,
            { variant: 'outline', colorScheme: 'secondary' },
          ],
          [SeparatorContext, { orientation: 'vertical' }],
        ]}
      >
        {renderProps.children}
      </Provider>
    </div>
  );
}

/**
 * NumberFields allow users to enter a number,
 * and increment or decrement the value using stepper buttons.
 */
const _NumberField = /* #__PURE__ */ forwardRef(NumberField);

export { _NumberField as NumberField };
