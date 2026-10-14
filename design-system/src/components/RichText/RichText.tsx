import type { PropsWithChildren, ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import { pickDataAttributes } from '#shared/utils';
import type { RichTextRecipeVariantProps } from '#styled-system/recipes';
import { richTextRecipe } from '#styled-system/recipes';

export type RichTextProps = RichTextRecipeVariantProps & DataAttributes;

export function RichText(
  props: PropsWithChildren<RichTextProps>,
): ReactElement {
  const [variantProps, otherProps] = richTextRecipe.splitVariantProps(props);
  const classNames = richTextRecipe(variantProps);

  const { children } = otherProps;
  return (
    <div {...pickDataAttributes(props)} className={classNames}>
      {children}
    </div>
  );
}
