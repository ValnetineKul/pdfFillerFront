import type { ReactElement } from 'react';
import { createContext, useContext } from 'react';
import { useIsSSR } from 'react-aria';
import type { GroupBase } from 'react-select5';
import ReactSelect, { createFilter } from 'react-select5';

import { splitDataAttributes } from '#shared/utils';

import { InputPlug } from '../InputPlug';
import { ClearIndicator } from './components/ClearIndicator';
import { Control } from './components/Control';
import { DropdownIndicator } from './components/DropdownIndicator';
import { Input } from './components/Input';
import { MenuList } from './components/MenuList';
import { MultiValue } from './components/MultiValue';
import { MultiValueContainer } from './components/MultiValueContainer';
import { MultiValueLabel } from './components/MultiValueLabel';
import { MultiValueRemove } from './components/MultiValueRemove';
import { NoOptionsMessage } from './components/NoOptionsMessage';
import { Option } from './components/Option';
import { Placeholder } from './components/Placeholder';
import { SingleValue } from './components/SingleValue';
import { ValueContainer } from './components/ValueContainer';
import type { CustomSelectProps, SelectProps } from './types';

export const SelectContext = createContext<null | CustomSelectProps>(null);

export const useSelect = (): CustomSelectProps => {
  const selectContext = useContext(SelectContext);
  if (selectContext === null) {
    throw new Error(
      'Select context cannot be null, please add a context provider',
    );
  }
  return selectContext;
};

const defaultTranslations = {
  noOption: 'No options',
  clearValues: 'Clear all',
};

export function Picker<
  OptionType = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  isMulti,
  isInvalid = false,
  isFixed = false,
  maxMenuHeight = 200,
  multiSelectedItemsLimit = 1,
  noOptionsMessage,
  translations,
  contentStart,
  ...props
}: SelectProps<OptionType, IsMulti, Group>): ReactElement {
  const isSSR = useIsSSR();

  const [dataAttributes, restProps] = splitDataAttributes(props);

  return (
    <SelectContext.Provider
      value={{
        isInvalid,
        isFixed,
        maxMenuHeight,
        multiSelectedItemsLimit,
        translations: {
          ...defaultTranslations,
          ...translations,
        },
        contentStart,
        ...dataAttributes,
      }}
    >
      {isSSR ? (
        <InputPlug>{props.placeholder}</InputPlug>
      ) : (
        <ReactSelect
          filterOption={createFilter({ ignoreAccents: false })}
          maxMenuHeight={maxMenuHeight}
          styles={{
            control: () => ({}),
            option: () => ({}),
            dropdownIndicator: (_, { selectProps: { menuIsOpen } }) =>
              menuIsOpen ? { transform: 'scale(-1)' } : {},
            indicatorSeparator: () => ({
              display: 'none',
            }),
            clearIndicator: () => ({}),
            indicatorsContainer: () => ({
              display: 'flex',
              alignItems: 'center',
            }),
            menuList: ({ maxHeight }) => ({
              maxHeight: `${maxHeight}px`,
            }),
            valueContainer: () => ({}),
            singleValue: () => ({}),
            input: () => ({}),
            placeholder: () => ({}),
            multiValue: () => ({}),
            multiValueLabel: () => ({}),
            multiValueRemove: () => ({}),
            noOptionsMessage: () => ({}),
            menuPortal: (provided) =>
              isFixed ? { ...provided, zIndex: 9999 } : provided,
            menu: (provided) => {
              const baseStyles = {
                top: provided.top,
                bottom: provided.bottom,
                left: provided.left,
                right: provided.right,
                position: provided.position,
                width: provided.width,
                zIndex: 9999,
                marginTop: provided.marginTop,
                marginBottom: provided.marginBottom,
                label: provided.label,
              };
              return isFixed ? { ...baseStyles, zIndex: 9999 } : baseStyles;
            },
          }}
          components={{
            MenuList,
            DropdownIndicator,
            ClearIndicator,
            Option,
            MultiValue,
            MultiValueContainer,
            MultiValueLabel,
            MultiValueRemove,
            Control,
            SingleValue,
            Placeholder,
            Input,
            ValueContainer,
          }}
          noOptionsMessage={(args) => {
            return noOptionsMessage?.(args) ?? <NoOptionsMessage />;
          }}
          menuPosition={isFixed ? 'fixed' : 'absolute'}
          isMulti={isMulti}
          {...(isMulti
            ? { closeMenuOnSelect: false, hideSelectedOptions: false }
            : undefined)}
          menuPlacement="auto"
          isClearable
          {...restProps}
        />
      )}
    </SelectContext.Provider>
  );
}
