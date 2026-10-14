import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import type { ClearIndicatorProps, GroupBase } from 'react-select5';
import { components } from 'react-select5';

import { css } from '#styled-system/css';
import { pickerRecipe } from '#styled-system/recipes';

export function ClearIndicator<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: ClearIndicatorProps<Option, IsMulti, Group>): ReactElement {
  const classes = pickerRecipe();

  return !props.isMulti ? (
    <components.ClearIndicator {...props} className={classes.clearIndicator}>
      <Icon name="general/x-close" className={css({ iconSize: 'md' })} />
    </components.ClearIndicator>
  ) : (
    <></>
  );
}
