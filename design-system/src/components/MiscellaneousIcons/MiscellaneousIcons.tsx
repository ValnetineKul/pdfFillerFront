import { Icon } from '@front/icons';
import type { FC } from 'react';

import type { MiscellaneousIconsRecipeVariantProps } from '#styled-system/recipes';
import { miscellaneousIconsRecipe } from '#styled-system/recipes';

export const MiscellaneousIcons: FC<MiscellaneousIconsRecipeVariantProps> = (
  props,
) => {
  const [variantProps, otherProps] =
    miscellaneousIconsRecipe.splitVariantProps(props);
  const classNames = miscellaneousIconsRecipe(variantProps);

  return (
    <span {...otherProps} className={classNames.root}>
      <Icon name="general/check-alt" className={classNames.icon} />
    </span>
  );
};
