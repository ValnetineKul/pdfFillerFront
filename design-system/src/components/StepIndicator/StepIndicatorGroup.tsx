import type { ReactElement } from 'react';
import type { GridListProps as AreaGridListProps } from 'react-aria-components';
import { GridList as AreaGridList } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { StepIndicatorGroupRecipeVariantProps } from '#styled-system/recipes';
import { stepIndicatorGroupRecipe } from '#styled-system/recipes';

export type PaginationItemGroupProps = AreaGridListProps<object> &
  StepIndicatorGroupRecipeVariantProps &
  DataAttributes;

export function StepIndicatorGroup(
  props: PaginationItemGroupProps,
): ReactElement {
  const [variantProps, otherProps] =
    stepIndicatorGroupRecipe.splitVariantProps(props);

  const className = stepIndicatorGroupRecipe(variantProps);
  return (
    <AreaGridList {...otherProps} className={className}>
      {props.children}
    </AreaGridList>
  );
}
