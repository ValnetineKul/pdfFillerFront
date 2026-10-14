import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import type { DropdownIndicatorProps, GroupBase } from 'react-select5';
import { components } from 'react-select5';

import { css } from '#styled-system/css';
import { pickerRecipe } from '#styled-system/recipes';

export function DropdownIndicator<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: DropdownIndicatorProps<Option, IsMulti, Group>): ReactElement {
  const classes = pickerRecipe();

  return (
    <components.DropdownIndicator
      {...props}
      className={classes.dropdownIndicator}
    >
      <Icon name="arrows/chevron-down" className={css({ iconSize: 'md' })} />
    </components.DropdownIndicator>
  );
}
