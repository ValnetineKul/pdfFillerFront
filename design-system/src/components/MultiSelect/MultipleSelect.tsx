import { Icon } from '@front/icons';
import { useResizeObserver } from '@react-aria/utils';
import {
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Placement } from 'react-aria';
import { useFilter, useFocusRing } from 'react-aria';
import type {
  ComboBoxProps,
  GroupProps,
  Key,
  ListBoxProps,
  Selection,
} from 'react-aria-components';
import {
  Button,
  Group,
  Input,
  Label,
  ListBox,
  Popover as PopoverContent,
  Text,
} from 'react-aria-components';
import { useListData } from 'react-stately';
import { useControlledState } from 'react-stately/useControlledState';

import { useClickOutside } from '#shared/hooks/useClickOutside';
import type { DataAttributes } from '#shared/types';
import { cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import { multiSelectRecipe } from '#styled-system/recipes';

import { Asterisk } from '../Asterisk';

type ItemKeyGetter<T> = (item: T) => Key;
type ItemLabelGetter<T> = (item: T) => string;

interface MultipleSelectProps<T>
  extends
    Omit<ListBoxProps<T>, 'renderEmptyState'>,
    Pick<
      ComboBoxProps<T & { selectedKeys: Selection }>,
      'isRequired' | 'validate' | 'validationBehavior'
    >,
    Pick<GroupProps, 'isDisabled' | 'isInvalid'> {
  label?: ReactNode;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  customAsterisk?: string;
  maxItems?: number;
  renderEmptyState?: (inputValue: string) => React.ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  listBoxTopSlot?: ReactNode;
  getKey?: ItemKeyGetter<T>;
  getLabel?: ItemLabelGetter<T>;
  items: Array<T>;
  selectedKeys?: ReturnType<typeof useListData<T>>['selectedKeys'];
  onSelectionChange?: ReturnType<typeof useListData<T>>['setSelectedKeys'];
  inputValue?: string;
  onInputChange?: (value: string) => void;
  placement?: Placement;
  searchable?: boolean;
  triggerProps?: DataAttributes;
}

const MultipleSelect = <T extends object>({
  maxItems = Number.POSITIVE_INFINITY,
  renderEmptyState,
  children,
  items: itemsFromProps,
  searchable = false,
  ...props
}: MultipleSelectProps<T>): ReactElement => {
  const listBoxRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useControlledState(
    props.inputValue,
    '',
    (v) => {
      if (props.isDisabled) return;

      props?.onInputChange?.(v);
    },
  );
  const getKey = useCallback(
    (item: T) => (props.getKey ? props.getKey(item) : (item as any).id),
    [props.getKey],
  );
  const getLabel: ItemLabelGetter<T> = useCallback(
    (item) => (props.getLabel ? props.getLabel(item) : (item as any).name),
    [props.getLabel],
  );

  const { contains } = useFilter({ sensitivity: 'base' });

  const { isFocused, focusProps } = useFocusRing({
    isTextInput: true,
  });

  const [isOpen, setIsOpenState] = useState(false);

  const listData = useListData({
    initialItems: itemsFromProps,
    getKey,
    initialSelectedKeys: props?.selectedKeys,
  });

  const setIsOpen = (v: boolean): void => {
    if (props.isDisabled) return;

    setIsOpenState(v);
  };

  const items = itemsFromProps ?? listData?.items;
  const [selectedKeys, setSelectedKeys] = useControlledState(
    props?.selectedKeys,
    listData?.selectedKeys,
    (keys) => {
      listData.setSelectedKeys(keys);
      props.onSelectionChange?.(keys);
    },
  );

  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue('');
  }, [selectedKeys]);

  const [menuWidth, setMenuWidth] = useState<string | null>(null);
  const onResize = useCallback(() => {
    if (!groupRef?.current) return;

    return setMenuWidth(`${groupRef.current.offsetWidth}px`);
  }, [groupRef, setMenuWidth]);

  useResizeObserver({
    ref: groupRef,
    onResize,
  });

  const onKeyDownCapture = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Backspace' || inputValue !== '') return;

    const newKeys = new Set([...selectedKeys].slice(0, -1));
    setSelectedKeys(newKeys);
  };

  useClickOutside([groupRef, listBoxRef], () => setIsOpen(false), [
    'mousedown',
    'touchstart',
  ]);

  const classnames = multiSelectRecipe({
    isOpen,
    isFocused: isFocused || isOpen,
    isDisabled: props.isDisabled,
  });

  const accessibleList = searchable
    ? items.filter((item) => contains(getLabel(item), inputValue))
    : items;

  return (
    <Group
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid}
      className={classnames.root}
    >
      {({ isInvalid, isDisabled }) => (
        <>
          {props.label && (
            <Label
              onClick={() => {
                setIsOpen(true);
                inputRef.current?.focus();
              }}
              {...props.triggerProps}
            >
              <>
                <span className={classnames.label}>{props.label}</span>
                {props.isRequired && (
                  <Asterisk>{props.customAsterisk}</Asterisk>
                )}
              </>
            </Label>
          )}
          <Group
            className={classnames.fieldGroup}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            ref={groupRef}
            onClick={() => {
              setIsOpen(true);
            }}
            {...props.triggerProps}
          >
            {props.leftSlot}
            <div className={classnames.inputWrapper}>
              <Input
                className={classnames.input}
                ref={inputRef}
                onBlur={() => {
                  if (searchable) {
                    setInputValue('');
                  }
                }}
                disabled={isDisabled}
                value={inputValue}
                onChange={(e) => {
                  if (searchable) {
                    setInputValue(e.target.value);
                  }
                }}
                onKeyDownCapture={onKeyDownCapture}
                placeholder={props.placeholder}
                inputMode={searchable ? undefined : 'none'}
                tabIndex={searchable ? undefined : 0}
                {...focusProps}
              />
              {props.rightSlot}
              <Button
                ref={triggerButtonRef}
                aria-label="Open"
                className={classnames.button}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Icon
                  name="arrows/chevron-down"
                  data-slot="chevron"
                  className={classnames.chevron}
                />
              </Button>
            </div>
            <PopoverContent
              className={cx(
                classnames.popover,
                scrollable({
                  direction: 'vertical',
                }),
              )}
              triggerRef={groupRef}
              ref={listBoxRef}
              isNonModal
              trigger="Combobox"
              style={
                menuWidth
                  ? {
                      '--trigger-width': menuWidth,
                    }
                  : {}
              }
              isOpen={isOpen}
              placement={props.placement ?? 'bottom start'}
            >
              {accessibleList?.length > 0 && props.listBoxTopSlot}
              <ListBox
                className={classnames.listBox}
                selectionMode="multiple"
                renderEmptyState={() =>
                  renderEmptyState ? (
                    <div className={classnames.empty}>
                      {renderEmptyState(inputValue)}
                    </div>
                  ) : undefined
                }
                selectedKeys={selectedKeys}
                items={accessibleList}
                onSelectionChange={(keys) => {
                  const newKeys = new Set(keys);
                  if (newKeys.size > maxItems) return;

                  setSelectedKeys(keys);
                  inputRef.current?.focus();
                }}
                selectionBehavior="toggle"
                orientation="vertical"
              >
                {children}
              </ListBox>
            </PopoverContent>
          </Group>
          {props.description && (
            <Text slot="description" className={classnames.description}>
              {props.description}
            </Text>
          )}
          {props.errorMessage && (
            <Text slot="errorMessage" className={classnames.error}>
              {props.errorMessage}
            </Text>
          )}
        </>
      )}
    </Group>
  );
};

export { MultipleSelect };
export type { MultipleSelectProps };
