import type { ReactElement } from 'react';
import type { GroupBase, MultiValueProps } from 'react-select5';
import { components } from 'react-select5';

import { pickerRecipe } from '#styled-system/recipes';

import { useSelect } from '../Picker';

export function MultiValue<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: MultiValueProps<Option, IsMulti, Group>): ReactElement {
  const { children, index, getValue } = props;
  const { multiSelectedItemsLimit } = useSelect();
  const classes = pickerRecipe();

  const selectedQuantity = getValue().length;

  if (!multiSelectedItemsLimit) {
    return <components.MultiValue {...props}>{children}</components.MultiValue>;
  }

  return index < multiSelectedItemsLimit ? (
    <components.MultiValue {...props}>{children}</components.MultiValue>
  ) : index === multiSelectedItemsLimit ? (
    <div className={classes.counter}>{`+ ${
      selectedQuantity - multiSelectedItemsLimit
    }`}</div>
  ) : (
    <></>
  );
}
