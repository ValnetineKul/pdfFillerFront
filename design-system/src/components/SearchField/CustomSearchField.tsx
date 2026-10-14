import { filterDOMProps } from '@react-aria/utils';
import type { ForwardedRef, ReactElement } from 'react';
import { forwardRef, useRef } from 'react';
import { mergeProps, useFocusRing, useSearchField } from 'react-aria';
import type { SearchFieldProps } from 'react-aria-components';
import {
  ButtonContext,
  FieldErrorContext,
  GroupContext,
  InputContext,
  LabelContext,
  Provider,
  SearchFieldContext,
  SeparatorContext,
  TextContext,
  useContextProps,
} from 'react-aria-components';
import { useSearchFieldState } from 'react-stately';

import { useRenderProps, useSlot } from '#shared/hooks';
import { removeDataAttributes } from '#shared/utils';
import { cx } from '#styled-system/css';
import { textFieldRecipe } from '#styled-system/recipes';

import { ButtonVariantContext } from '../shared';

const textFieldClasses = textFieldRecipe();

function SearchField(
  props: SearchFieldProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  [props, ref] = useContextProps(props, ref, SearchFieldContext);

  const inputRef = useRef(null);
  const state = useSearchFieldState(props);
  const [labelRef, hasLabel] = useSlot();
  const [groupRef, hasGroup] = useSlot();

  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    clearButtonProps,
    ...validation
  } = useSearchField(
    {
      ...removeDataAttributes(props),
      label: hasLabel,
      validationBehavior: props.validationBehavior ?? 'native',
    },
    state,
    inputRef,
  );

  /*
   Intercept setting the input ref, so we can determine what kind of element we have.
   useSearchField uses this to determine what props to include.
  */

  const renderProps = useRenderProps({
    ...props,
    values: {
      state,
      isEmpty: state.value === '',
      isDisabled: props.isDisabled ?? false,
      isInvalid: validation.isInvalid,
      isReadOnly: props.isReadOnly ?? false,
      isRequired: props.isRequired ?? false,
    },
    defaultClassName: 'react-aria-SearchField',
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
              ...clearButtonProps,
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
 * A search field allows a user to enter and clear a search query.
 */
const _SearchField = /* #__PURE__ */ forwardRef(SearchField);

export { _SearchField as SearchField };
