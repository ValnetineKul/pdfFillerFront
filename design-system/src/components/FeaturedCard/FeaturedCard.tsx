import type { ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import { pickDataAttributes } from '#shared/utils';
import type { FeaturedCardRecipeVariantProps } from '#styled-system/recipes';
import { featuredCardRecipe } from '#styled-system/recipes';

import { FeaturedIcon } from '../FeaturedIcon';

export type FeaturedCardProps = FeaturedCardRecipeVariantProps & {
  label: string;
  icon?: ReactElement;
  description?: string;
  isSelected?: boolean;
  isPressed?: boolean;
  isFocusVisible?: boolean;
  isHovered?: boolean;
} & DataAttributes;

export function FeaturedCard(props: FeaturedCardProps): ReactElement {
  const [variantProps, otherProps] =
    featuredCardRecipe.splitVariantProps(props);
  const classNames = featuredCardRecipe(variantProps);

  const { icon, label, description } = otherProps;
  const { isSelected, isPressed } = variantProps;
  return (
    <div {...pickDataAttributes(props)} className={classNames.root}>
      {icon && (
        <FeaturedIcon
          size="md"
          colorScheme={isSelected || isPressed ? 'primary' : 'secondary'}
        >
          {icon}
        </FeaturedIcon>
      )}
      <span className={classNames.content}>
        <span className={classNames.label}>{label}</span>
        {description && (
          <span className={classNames.description}>{description}</span>
        )}
      </span>
    </div>
  );
}
