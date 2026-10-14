import { Icon } from '@front/icons';
import {
  createContext,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { mergeProps, useFilter, useFocusRing } from 'react-aria';
import type {
  ComboBoxProps as ComboBoxPrimitiveProps,
  Key,
  Selection,
  ValidationResult,
} from 'react-aria-components';
import {
  Button as AriaButton,
  ComboBox,
  FieldError,
  Group,
  Input,
  Label,
  LabelContext,
  ListBox,
  Popover,
  Text,
} from 'react-aria-components';
import type { ListData } from 'react-stately';
import { useListData } from 'react-stately';

import type { DataAttributes } from '#shared/types';
import { splitDataAttributes } from '#shared/utils';
import { css, cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import { comboboxRecipe } from '#styled-system/recipes';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';
import type { RemoveButtonProps } from '../RemoveButton';
import { RemoveButton } from '../RemoveButton';
import { Tag, TagGroup } from '../TagGroup';
import type { TextFieldProps } from '../TextField';
import { EmptyStateMessage } from './components/EmptyStateMessage';

interface FieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  'aria-label'?: TextFieldProps['aria-label'];
  'aria-labelledby'?: TextFieldProps['aria-labelledby'];
}

export interface MultiComboBoxProps<T extends object>
  extends
    AsteriskFieldProps,
    FieldProps,
    Omit<
      ComboBoxPrimitiveProps<T>,
      | 'children'
      | 'validate'
      | 'allowsEmptyCollection'
      | 'inputValue'
      | 'selectedKey'
      | 'className'
      | 'value'
      | 'onSelectionChange'
      | 'onInputChange'
    >,
    DataAttributes {
  getKey?: (item: T) => Key;
  getLabel?: (item: T) => string;
  items: Array<T>;
  selectedItems?: Omit<ListData<T>, 'setSelectedKeys'>;
  className?: string;
  onItemInserted?: (key: Key) => void;
  onItemCleared?: (key: Key) => void;
  onRemoveItems?: () => void;
  renderEmptyState?: (inputValue: string) => ReactNode;
  children: ReactNode | ((item: T) => ReactNode);
  errorMessage?: string | ((validation: ValidationResult) => string);
  emptyStateText?: string;
  hideClearButton?: boolean;
  clearButtonProps?: RemoveButtonProps;
  removeButtonProps?: RemoveButtonProps;
  hideTags?: boolean;
  isRequired?: boolean;
  showInputCounter?: boolean;
  onSelectionChange?: (keys: Selection) => void;
  getItemsOnSelectionChange?: (items: Array<T>) => void;
}

export const DescriptionContext = createContext<{
  'aria-describedby'?: string;
} | null>(null);

export const MultiComboBox = <T extends object>({
  children,
  items,
  onItemCleared,
  onItemInserted,
  name,
  errorMessage,
  emptyStateText,
  hideClearButton,
  clearButtonProps,
  removeButtonProps,
  onRemoveItems,
  hideTags,
  necessityIndicator,
  customAsterisk,
  label,
  isRequired,
  onSelectionChange: setSelectedKeys,
  getItemsOnSelectionChange,
  selectedItems: selectedItemsProps,
  getKey: getKeyProps,
  getLabel: getLabelProps,
  placeholder,
  description,
  ...props
}: MultiComboBoxProps<T>): ReactElement => {
  const tagGroupIdentifier = useId();

  const listData = useListData<T>({
    initialItems: [],
  });
  const selectedItems = selectedItemsProps ?? listData;
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  const { contains } = useFilter({ sensitivity: 'base' });
  const getKey = getKeyProps ?? ((item: T) => (item as any).id);
  const getLabel = getLabelProps ?? ((item: T) => (item as any).name);
  const selectedKeys = selectedItems.items.map(getKey);

  const filter = useCallback(
    (item: T, filterText: string) => {
      return (
        !selectedKeys.includes(getKey(item)) &&
        contains(getLabel(item), filterText)
      );
    },
    [contains, selectedKeys],
  );

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys?.(new Set(selectedKeys));
      getItemsOnSelectionChange?.(selectedItems.items);
    }
  }, [
    selectedKeys,
    setSelectedKeys,
    selectedItems.items,
    getItemsOnSelectionChange,
  ]);

  const accessibleList = useListData({
    initialItems: items,
    filter,
  });

  const [fieldState, setFieldState] = useState<{
    selectedKey: Key | null;
    inputValue: string;
  }>({
    selectedKey: null,
    inputValue: '',
  });

  const onRemove = useCallback(
    (keys: Set<Key>) => {
      const key = keys.values().next().value;
      if (key) {
        selectedItems.remove(key);
        setFieldState({
          inputValue: '',
          selectedKey: null,
        });
        onItemCleared?.(key);
      }
    },
    [selectedItems, onItemCleared],
  );

  const onClear = useCallback(() => {
    selectedKeys.forEach((key) => selectedItems.remove(key));
    setFieldState({
      inputValue: '',
      selectedKey: null,
    });
    onRemoveItems?.();
  }, [selectedItems, onRemoveItems]);

  const onSelectionChange = (id: Key | null): void => {
    if (!id) {
      return;
    }

    const item = accessibleList.getItem(id);

    if (!item) {
      return;
    }

    if (!selectedKeys.includes(id)) {
      selectedItems.append(item);
      setFieldState({
        inputValue: '',
        selectedKey: id,
      });
      onItemInserted?.(id);
    }
    accessibleList.setFilterText('');
  };

  const onInputChange = (value: string): void => {
    setFieldState((prev) => ({
      inputValue: value,
      selectedKey: value === '' ? null : prev.selectedKey,
    }));

    accessibleList.setFilterText(value);
  };

  const popLast = useCallback(() => {
    if (selectedItems.items.length === 0) {
      return;
    }

    const endKey = selectedItems.items[selectedItems.items.length - 1];

    if (endKey) {
      const key = getKey(endKey);
      selectedItems.remove(key);
      onItemCleared?.(key);
    }

    setFieldState({
      inputValue: '',
      selectedKey: null,
    });
  }, [selectedItems, onItemCleared]);

  const onKeyDownCapture = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && fieldState.inputValue === '') {
        popLast();
      }
    },
    [popLast, fieldState.inputValue],
  );

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.target.clientWidth);
      }
    });

    observer.observe(trigger);
    return () => {
      observer.unobserve(trigger);
    };
  }, []);

  const classNames = comboboxRecipe({ isMulti: true });

  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  const labelContext = (useContext(LabelContext) ?? {}) as {
    id?: string;
  };

  const descriptionContext = useContext(DescriptionContext);

  const hasSelectedItems = selectedItems.items.length > 0;

  const { isFocusVisible, focusProps } = useFocusRing();

  const [dataAttributes, comboBoxProps] = splitDataAttributes(props);

  return (
    <div className={classNames.root} ref={triggerRef} {...dataAttributes}>
      {label && (
        <Label className={classNames.label}>
          {label}
          {isRequired && necessityIndicator && (
            <Asterisk>{customAsterisk}</Asterisk>
          )}
        </Label>
      )}
      <div className={classNames.group} data-focus-visible={isFocusVisible}>
        {!hideTags && hasSelectedItems && (
          <div className={classNames.tagGroupWrapper}>
            <TagGroup
              aria-labelledby={labelContext.id}
              items={selectedItems.items}
              id={tagGroupIdentifier}
              onRemove={onRemove}
            >
              {(item) => (
                <Tag textValue={getLabel(item)}>
                  {getLabel(item)}
                  <RemoveButton
                    size="sm"
                    colorScheme="pale"
                    slot="remove"
                    {...removeButtonProps}
                  />
                </Tag>
              )}
            </TagGroup>
            {!hideClearButton && hasSelectedItems && (
              <RemoveButton
                size="xl"
                colorScheme="grayLight"
                onPress={onClear}
                {...clearButtonProps}
              />
            )}
          </div>
        )}

        <ComboBox
          {...mergeProps(comboBoxProps, focusProps)}
          aria-label={label}
          allowsEmptyCollection
          aria-labelledby={labelContext.id}
          items={accessibleList.items}
          selectedKey={fieldState.selectedKey}
          inputValue={fieldState.inputValue}
          onSelectionChange={onSelectionChange}
          onInputChange={onInputChange}
        >
          <Group className={classNames.inputWrapper}>
            <Input
              placeholder={!hasSelectedItems ? placeholder : ''}
              className={classNames.input}
              onBlur={() => {
                setFieldState({
                  inputValue: '',
                  selectedKey: null,
                });
                accessibleList.setFilterText('');
              }}
              onKeyDownCapture={onKeyDownCapture}
              aria-describedby={descriptionContext?.['aria-describedby'] ?? ''}
            />
            <AriaButton className={classNames.arrow} ref={triggerButtonRef}>
              <Icon
                name="arrows/chevron-down"
                className={css({ iconSize: 'md' })}
              />
            </AriaButton>
          </Group>
          <Popover
            className={classNames.dropdown}
            triggerRef={triggerRef}
            trigger="ComboBox"
            isNonModal
            style={{ width: `${width}px` }}
          >
            <ListBox
              className={cx(
                classNames.list,
                scrollable({
                  direction: 'vertical',
                }),
              )}
              selectionMode="multiple"
              selectedKeys={accessibleList.selectedKeys}
              renderEmptyState={() => (
                <EmptyStateMessage emptyStateText={emptyStateText} />
              )}
            >
              {children}
            </ListBox>
          </Popover>
          {description && (
            <Text slot="description" className={classNames.textMessage}>
              {description}
            </Text>
          )}
          {errorMessage && (
            <FieldError className={classNames.errorMessage}>
              {errorMessage}
            </FieldError>
          )}
          {errorMessage && <FieldError>{errorMessage}</FieldError>}
          {name && (
            <input hidden name={name} value={selectedKeys.join(',')} readOnly />
          )}
        </ComboBox>
      </div>
    </div>
  );
};
