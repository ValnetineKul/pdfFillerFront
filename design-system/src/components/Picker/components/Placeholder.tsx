import type { ReactElement } from 'react';
import type { GroupBase, PlaceholderProps } from 'react-select5';
import { components } from 'react-select5';

import { pickerRecipe } from '#styled-system/recipes';

export function Placeholder<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: PlaceholderProps<Option, IsMulti, Group>): ReactElement {
  const classes = pickerRecipe();

  return (
    <components.Placeholder className={classes.placeholder} {...props}>
      {props.children}
    </components.Placeholder>
  );
}
