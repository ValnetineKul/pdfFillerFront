import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import { useContext } from 'react';
import {
  Button as AriaButton,
  DateRangePickerStateContext,
} from 'react-aria-components';

import { css, cx } from '#styled-system/css';
import { buttonRecipe, datePickerRecipe } from '#styled-system/recipes';

export function DateRangePickerClearButton(): ReactElement | null {
  const state = useContext(DateRangePickerStateContext);
  const dateFieldClasses = datePickerRecipe();
  const buttonClassName = buttonRecipe({ variant: 'subtle', onlyIcon: true });

  return state?.dateRange && state.timeRange ? (
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
