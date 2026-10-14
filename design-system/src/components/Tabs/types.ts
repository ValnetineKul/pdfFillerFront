import type { DataAttributes } from '#shared/types';
import type {
  ButtonRecipeVariantProps,
  TabsRecipeVariantProps,
} from '#styled-system/recipes';

export type TabsRecipeVariantList = NonNullable<
  TabsRecipeVariantProps['variant']
>;
export type ButtonVariantsSizeList = NonNullable<
  ButtonRecipeVariantProps['size']
>;
export type TabsRecipeSizeList = NonNullable<TabsRecipeVariantProps['size']>;

export type VariantScrollButtonProps = {
  [K in TabsRecipeVariantList]: Required<
    Pick<ButtonRecipeVariantProps, 'variant' | 'colorScheme'>
  >;
} & DataAttributes;
