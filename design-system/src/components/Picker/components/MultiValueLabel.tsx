import type { ReactElement } from 'react';
import type { GroupBase, MultiValueGenericProps } from 'react-select5';

import { pickerRecipe } from '#styled-system/recipes';

export function MultiValueLabel<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: MultiValueGenericProps<Option, IsMulti, Group>): ReactElement {
  const { children } = props;
  const classes = pickerRecipe();

  return <div className={classes.multiValueLabel}>{children}</div>;
}
