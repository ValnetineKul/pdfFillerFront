import type { ReactElement } from 'react';
import type { GridListItemProps as AriaGridListItemProps } from 'react-aria-components';
import { GridListItem as AriaGridListItem } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { StepIndicatorItemRecipeVariantProps } from '#styled-system/recipes';
import { stepIndicatorItemRecipe } from '#styled-system/recipes';

export type PaginationItemProps = AriaGridListItemProps &
  StepIndicatorItemRecipeVariantProps &
  DataAttributes;

export function StepIndicatorItem(props: PaginationItemProps): ReactElement {
  const [variantProps, otherProps] =
    stepIndicatorItemRecipe.splitVariantProps(props);

  const className = stepIndicatorItemRecipe(variantProps);
  return <AriaGridListItem {...otherProps} className={className} />;
}
