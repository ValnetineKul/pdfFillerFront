import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import { useContext } from 'react';
import {
  Button as AriaButton,
  DatePickerStateContext,
} from 'react-aria-components';

import { css, cx } from '#styled-system/css';
import { buttonRecipe, datePickerRecipe } from '#styled-system/recipes';

export function DateFieldClearButton(): ReactElement | null {
  const state = useContext(DatePickerStateContext);
  const dateFieldClasses = datePickerRecipe();
  const buttonClassName = buttonRecipe({ variant: 'subtle', onlyIcon: true });

  return state?.value ? (
    <AriaButton
      slot={null}
      className={cx(buttonClassName, dateFieldClasses.clearButton)}
      aria-label="Clear"
      onPress={() => state.setValue(null)}
    >
      <Icon name="general/x-close" className={css({ iconSize: 'xs' })} />
    </AriaButton>
  ) : null;
}
