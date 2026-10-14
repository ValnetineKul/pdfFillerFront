import type { ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import { pickDataAttributes } from '#shared/utils';
import type { SpinnerRecipeVariantProps } from '#styled-system/recipes';
import { spinnerRecipe } from '#styled-system/recipes';

export type SpinnerProps = SpinnerRecipeVariantProps & DataAttributes;

export function Spinner(props: SpinnerProps): ReactElement {
  const classNames = spinnerRecipe(props);
  return (
    <svg
      {...pickDataAttributes(props)}
      className={classNames.root}
      viewBox="0 0 50 50"
    >
      <circle
        className={classNames.path}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  );
}
