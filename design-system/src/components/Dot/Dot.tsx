import type { ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import { cx } from '#styled-system/css';
import type { DotRecipeVariantProps } from '#styled-system/recipes';
import { dotRecipe } from '#styled-system/recipes';

export type DotProps = DotRecipeVariantProps & {
  className?: string;
} & DataAttributes;

export function Dot({ className, ...props }: DotProps): ReactElement {
  const [variantProps, otherProps] = dotRecipe.splitVariantProps(props);
  return (
    <span {...otherProps} className={cx(dotRecipe(variantProps), className)} />
  );
}
