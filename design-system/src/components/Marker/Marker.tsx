import type { ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import { pickDataAttributes } from '#shared/utils';
import type { MarkerRecipeVariantProps } from '#styled-system/recipes';
import { markerRecipe } from '#styled-system/recipes';

export type MarkerProps = {
  text?: string;
} & DataAttributes;

export function Marker(
  props: MarkerProps & MarkerRecipeVariantProps,
): ReactElement {
  const [variantProps, otherProps] = markerRecipe.splitVariantProps(props);
  const classNames = markerRecipe(variantProps);

  const { text } = otherProps;
  return (
    <span {...pickDataAttributes(props)} className={classNames.root}>
      {text && <span className={classNames.text}>{text}</span>}
    </span>
  );
}
