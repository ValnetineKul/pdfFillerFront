import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import type { GroupBase, MultiValueRemoveProps } from 'react-select5';

import { css } from '#styled-system/css';
import { pickerRecipe } from '#styled-system/recipes';

export function MultiValueRemove<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: MultiValueRemoveProps<Option, IsMulti, Group>): ReactElement {
  const { innerProps } = props;
  const classes = pickerRecipe();

  return (
    <div {...innerProps} tabIndex={-1} className={classes.multiValueRemove}>
      <Icon name="general/x-close" className={css({ iconSize: 'xs' })} />
    </div>
  );
}
