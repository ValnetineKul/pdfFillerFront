import type { ReactElement } from 'react';
import type { GroupBase, InputProps } from 'react-select5';
import { components } from 'react-select5';

import { pickerRecipe } from '#styled-system/recipes';

export function Input<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: InputProps<Option, IsMulti, Group>): ReactElement {
  const classes = pickerRecipe();

  return (
    <components.Input className={classes.inputContainer} {...props}>
      {props.children}
    </components.Input>
  );
}
