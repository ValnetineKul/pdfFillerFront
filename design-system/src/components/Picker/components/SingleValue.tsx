import type { ReactElement } from 'react';
import type { GroupBase, SingleValueProps } from 'react-select5';
import { components } from 'react-select5';

import { pickerRecipe } from '#styled-system/recipes';

export function SingleValue<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: SingleValueProps<Option, IsMulti, Group>): ReactElement {
  const classes = pickerRecipe();

  return (
    <components.SingleValue className={classes.singleValue} {...props}>
      {props.children}
    </components.SingleValue>
  );
}
