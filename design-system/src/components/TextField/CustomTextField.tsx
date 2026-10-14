/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { filterDOMProps } from '@react-aria/utils';
import type { ForwardedRef, ReactElement } from 'react';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { mergeProps, useFocusRing, useTextField } from 'react-aria';
import type { TextFieldProps } from 'react-aria-components';
import {
  ButtonContext,
  FieldErrorContext,
  GroupContext,
  InputContext,
  LabelContext,
  Provider,
  SeparatorContext,
  TextAreaContext,
  TextContext,
  TextFieldContext,
  useContextProps,
} from 'react-aria-components';

import { useRenderProps, useSlot } from '#shared/hooks';
import { removeDataAttributes } from '#shared/utils';
import { cx } from '#styled-system/css';
import { textFieldRecipe } from '#styled-system/recipes';

import { ButtonVariantContext } from '../shared';

const textFieldClasses = textFieldRecipe();

function TextField(
  props: TextFieldProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  [props, ref] = useContextProps(props, ref, TextFieldContext);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [labelRef, hasLabel] = useSlot();
  const [groupRef, hasGroup] = useSlot();
  const [inputElementType, setInputElementType] = useState('input');

  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    ...validation
  } = useTextField<any>(
    {
      ...removeDataAttributes(props),
      inputElementType,
      label: hasLabel,
      validationBehavior: props.validationBehavior ?? 'native',
    },
    inputRef,
  );

  // Intercept setting the input ref so we can determine what kind of element we have.
  // useTextField uses this to determine what props to include.
  const inputOrTextAreaRef = useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement) => {
      inputRef.current = el;
      if (el) {
        setInputElementType(
          el instanceof HTMLTextAreaElement ? 'textarea' : 'input',
        );
      }
    },
    [],
  );

  const renderProps = useRenderProps({
    ...props,
    values: {
      isDisabled: props.isDisabled ?? false,
      isInvalid: validation.isInvalid,
      isReadOnly: props.isReadOnly ?? false,
      isRequired: props.isRequired ?? false,
    },
    defaultClassName: 'react-aria-TextField',
  });

  const { isFocused, focusProps } = useFocusRing({
    isTextInput: true,
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

  const inputContextProps = mergeProps(inputProps, focusProps);

  return (
    <div
      {...filterDOMProps(props)}
      {...renderProps}
      ref={ref}
      // eslint-disable-next-line
      slot={props.slot || undefined}
      // eslint-disable-next-line
      data-disabled={props.isDisabled || undefined}
      data-invalid={validation.isInvalid || undefined}
      className={rootClasses}
    >
      <Provider
        values={[
          [
            LabelContext,
            { ...labelProps, ref: labelRef, className: textFieldClasses.label },
          ],
          [
            InputContext,
            {
              ...inputContextProps,
              ref: inputOrTextAreaRef,
              className: inputClasses,
            },
          ],
          [
            TextAreaContext,
            {
              ...inputContextProps,
              ref: inputOrTextAreaRef,
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
 * A text field allows a user to enter a plain text value with a keyboard.
 */
const _TextField = /* #__PURE__ */ forwardRef(TextField);

export { _TextField as TextField };
