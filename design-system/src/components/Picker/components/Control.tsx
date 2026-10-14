import type { ReactElement } from 'react';
import type { ControlProps, GroupBase } from 'react-select5';
import { components } from 'react-select5';

import { pickDataAttributes } from '#shared/utils';
import { pickerRecipe } from '#styled-system/recipes';

import { useSelect } from '../Picker';

export function Control<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  innerProps,
  ...props
}: ControlProps<Option, IsMulti, Group>): ReactElement {
  const select = useSelect();
  const { isInvalid, contentStart } = select;
  const { isFocused, isDisabled, menuIsOpen, children } = props;
  const classes = pickerRecipe();
  return (
    <components.Control
      className={classes.control}
      {...props}
      innerProps={{
        ...innerProps,
        ...pickDataAttributes(select),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        'data-focused': menuIsOpen && isFocused,
        'data-invalid': isInvalid,
        'data-open': menuIsOpen,
        'data-has-content-start': Boolean(contentStart),
        ...(isDisabled && { 'data-disabled': isDisabled }),
      }}
    >
      {contentStart && (
        <div className={classes.contentStart}>{contentStart}</div>
      )}
      {children}
    </components.Control>
  );
}
