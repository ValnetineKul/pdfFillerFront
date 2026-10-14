import type { PropsWithChildren, ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import type { FeaturedIconRecipeVariantProps } from '#styled-system/recipes';
import { featuredIconRecipe } from '#styled-system/recipes';

export type FeaturedIconProps = PropsWithChildren<
  FeaturedIconRecipeVariantProps & {
    slot?: string;
  }
> &
  DataAttributes;

export function FeaturedIcon(props: FeaturedIconProps): ReactElement {
  const [variantProps, otherProps] =
    featuredIconRecipe.splitVariantProps(props);

  const classNames = featuredIconRecipe(variantProps);

  return <span {...otherProps} className={classNames} />;
}
