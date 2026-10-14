import { Icon } from '@front/icons';
import type { ReactElement } from 'react';

import { css } from '#styled-system/css';
import { pickerRecipe } from '#styled-system/recipes';

import { useSelect } from '../Picker';

export function NoOptionsMessage(): ReactElement {
  const classes = pickerRecipe();
  const { translations } = useSelect();

  return (
    <div className={classes.noOptions}>
      <div className={classes.noOptionsIcon}>
        <Icon name="general/not-found" className={css({ iconSize: 'md' })} />
      </div>
      <div className={classes.noOptionsText}>{translations?.noOption}</div>
    </div>
  );
}
