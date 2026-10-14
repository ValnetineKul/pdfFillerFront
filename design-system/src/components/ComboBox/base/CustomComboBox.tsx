import { filterDOMProps, useResizeObserver } from '@react-aria/utils';
import type { ForwardedRef, ReactElement } from 'react';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { AriaComboBoxProps } from 'react-aria';
import { useComboBox, useFilter } from 'react-aria';
import {
  ButtonContext,
  DEFAULT_SLOT,
  FieldErrorContext,
  FormContext,
  GroupContext,
  InputContext,
  LabelContext,
  ListBoxContext,
  ListStateContext,
  OverlayTriggerStateContext,
  PopoverContext,
  Provider,
  TextContext,
  useContextProps,
  useSlottedContext,
} from 'react-aria-components';
import { CollectionBuilder } from 'react-aria-components';
import type { Collection, ComboBoxState, Node } from 'react-stately';
import { useComboBoxState } from 'react-stately';

import { useRenderProps, useSlot } from '#shared/hooks';
import type {
  ContextValue,
  DataAttributes,
  RACValidation,
  RenderProps,
  SlotProps,
} from '#shared/types';
import { removeDataAttributes } from '#shared/utils';
import { cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import { comboboxRecipe } from '#styled-system/recipes';

export interface ComboBoxRenderProps {
  /**
   * Whether the combobox is currently open.
   * @selector [data-open]
   */
  isOpen: boolean;
  /**
   * Whether the combobox is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the combobox is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the combobox is read only.
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the combobox is required.
   * @selector [data-required]
   */
  isRequired: boolean;
}

export interface ComboBoxProps<T extends object>
  extends
    Omit<
      AriaComboBoxProps<T>,
      | 'children'
      | 'placeholder'
      | 'label'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    RACValidation,
    RenderProps<ComboBoxRenderProps>,
    SlotProps,
    DataAttributes {
  /** The filter function used to determine if a option should be included in the combo box list. */
  defaultFilter?: (textValue: string, inputValue: string) => boolean;
  /**
   * Whether the text or key of the selected item is submitted as part of an HTML form.
   * When `allowsCustomValue` is `true`, this option does not apply and the text is always submitted.
   * @default 'key'
   */
  formValue?: 'text' | 'key';
  /** Whether the combo box allows the menu to be open when the collection is empty. */
  allowsEmptyCollection?: boolean;
}

export const ComboBoxContext =
  createContext<ContextValue<ComboBoxProps<any>, HTMLDivElement>>(null);

export const ComboBoxStateContext = createContext<ComboBoxState<any> | null>(
  null,
);

const classNames = comboboxRecipe();

interface ComboBoxInnerProps<T extends object> {
  props: ComboBoxProps<T>;
  collection: Collection<Node<T>>;
  comboBoxRef: ForwardedRef<HTMLDivElement | null>;
}

function ComboBoxInner<T extends object>({
  props,
  collection,
  comboBoxRef: ref,
}: ComboBoxInnerProps<T>): ReactElement {
  let { name, formValue = 'key', allowsCustomValue } = props;
  if (allowsCustomValue) {
    formValue = 'text';
  }

  const { validationBehavior: formValidationBehavior } =
    useSlottedContext(FormContext) ?? {};
  const validationBehavior =
    props.validationBehavior ?? formValidationBehavior ?? 'native';

  const { contains } = useFilter({ sensitivity: 'base' });

  const state = useComboBoxState({
    ...props,
    defaultFilter: props.defaultFilter ?? contains,
    children: undefined,
    collection,
    validationBehavior,
    allowsEmptyCollection: true,
  });

  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [labelRef, label] = useSlot();

  const {
    buttonProps,
    inputProps,
    listBoxProps,
    labelProps,
    descriptionProps,
    errorMessageProps,
    ...validation
  } = useComboBox(
    {
      ...removeDataAttributes(props),
      label,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
      name: formValue === 'text' ? name : undefined,
      validationBehavior,
      onSelectionChange: () => null,
    },
    state,
  );

  const [menuWidth, setMenuWidth] = useState<string | null>(null);
  const onResize = useCallback(() => {
    if (groupRef?.current) {
      const buttonRect = buttonRef.current?.getBoundingClientRect();
      const groupRect = groupRef.current.getBoundingClientRect();

      const minX = buttonRect
        ? Math.min(buttonRect.left, groupRect.left)
        : groupRect.left;
      const maxX = buttonRect
        ? Math.max(buttonRect.right, groupRect.right)
        : groupRect.right;
      setMenuWidth(maxX - minX + 'px');
    }
  }, [buttonRef, groupRef, setMenuWidth]);

  useResizeObserver({
    ref: inputRef,
    onResize,
  });

  // Only expose a subset of state to renderProps function to avoid infinite render loop
  const renderPropsState = useMemo(
    () => ({
      isOpen: state.isOpen,
      isDisabled: props.isDisabled ?? false,
      isInvalid: validation.isInvalid ?? false,
      isReadOnly: props.isReadOnly ?? false,
      isRequired: props.isRequired ?? false,
    }),
    [
      state.isOpen,
      props.isDisabled,
      validation.isInvalid,
      props.isReadOnly,
      props.isRequired,
    ],
  );

  const renderProps = useRenderProps<ComboBoxRenderProps>({
    ...props,
    values: renderPropsState,
    defaultClassName: 'react-aria-ComboBox',
  });

  const DOMProps = filterDOMProps(props);
  delete DOMProps.id;

  return (
    <Provider
      values={[
        [ComboBoxStateContext, state],
        [
          LabelContext,
          { ...labelProps, ref: labelRef, className: classNames.label },
        ],
        [
          ButtonContext,
          {
            ...buttonProps,
            ref: buttonRef,
            isPressed: state.isOpen,
            className: classNames.arrow,
            slots: {
              [DEFAULT_SLOT]: {
                ...buttonProps,
                ref: buttonRef,
                isPressed: state.isOpen,
                className: classNames.arrow,
              },
              clear: {
                ...(!state.inputValue && {
                  style: {
                    display: 'none',
                  },
                }),
                onPress: () => {
                  state.inputValue = '';
                  state.setSelectedKey(null);
                },
              },
            },
          },
        ],
        [
          InputContext,
          {
            ...inputProps,
            ref: inputRef,
            className: classNames.input,
          },
        ],
        [OverlayTriggerStateContext, state],
        [
          ListBoxContext,
          {
            ...listBoxProps,
            ref: listBoxRef,
            className: cx(
              classNames.list,
              scrollable({
                direction: 'vertical',
              }),
            ),
          },
        ],
        [ListStateContext, state],
        [
          PopoverContext,
          {
            ref: popoverRef,
            triggerRef: groupRef,
            scrollRef: listBoxRef,
            placement: 'bottom start',
            isNonModal: true,
            trigger: 'ComboBox',
            style: { '--trigger-width': menuWidth } as React.CSSProperties,
            className: classNames.dropdown,
          },
        ],
        [
          TextContext,
          {
            slots: {
              description: {
                ...descriptionProps,
                className: classNames.textMessage,
              },
              errorMessage: {
                ...errorMessageProps,
                className: classNames.errorMessage,
              },
            },
          },
        ],
        [
          GroupContext,
          {
            role: 'presentation',
            ref: groupRef,
            isInvalid: validation.isInvalid,
            isDisabled: props.isDisabled ?? false,
            className: classNames.group,
          },
        ],
        [FieldErrorContext, validation],
      ]}
    >
      <div
        {...DOMProps}
        {...renderProps}
        ref={ref}
        slot={props.slot || undefined}
        data-focused={state.isFocused || undefined}
        data-open={state.isOpen || undefined}
        data-disabled={props.isDisabled ?? undefined}
        data-invalid={validation.isInvalid || undefined}
        data-readonly={props.isReadOnly || undefined}
        data-required={props.isRequired ?? undefined}
        className={classNames.root}
      />
      {name && formValue === 'key' && (
        <input type="hidden" name={name} value={state.selectedKey ?? ''} />
      )}
    </Provider>
  );
}
/**
 * A combo box combines a text input with a listbox, allowing users to filter a list of options to items matching a query.
 */
function ComboBox<T extends object>(
  props: ComboBoxProps<T>,
  ref: ForwardedRef<HTMLDivElement> | null,
): ReactElement {
  [props, ref] = useContextProps(props, ref, ComboBoxContext);

  const {
    children,
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
    isRequired = false,
  } = props;

  const content = useMemo(
    () => (
      <ListBoxContext.Provider
        value={{ items: props.items ?? props.defaultItems }}
      >
        {typeof children === 'function'
          ? children({
              isOpen: false,
              isDisabled,
              isInvalid,
              isReadOnly,
              isRequired,
              defaultChildren: null,
            })
          : children}
      </ListBoxContext.Provider>
    ),
    [
      children,
      isDisabled,
      isInvalid,
      isReadOnly,
      isRequired,
      props.items,
      props.defaultItems,
    ],
  );

  return (
    <CollectionBuilder content={content}>
      {(collection) => (
        <ComboBoxInner
          props={props}
          collection={collection}
          comboBoxRef={ref}
        />
      )}
    </CollectionBuilder>
  );
}

const _ComboBox = /* #__PURE__ */ forwardRef(ComboBox);

export { _ComboBox as ComboBox };
