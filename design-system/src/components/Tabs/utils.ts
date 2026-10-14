import type {
  ButtonVariantsSizeList,
  TabsRecipeSizeList,
  TabsRecipeVariantList,
} from './types';

export const getScrollButtonSize = (
  variant?: TabsRecipeVariantList,
  size?: TabsRecipeSizeList,
): ButtonVariantsSizeList => {
  const sizeForScroll = size === 'xs' ? 'sm' : size;

  const isModernVariant = variant === 'modern';

  if (isModernVariant) {
    return sizeForScroll === 'sm' ? 'sm' : 'lg';
  }

  return sizeForScroll || 'sm';
};
