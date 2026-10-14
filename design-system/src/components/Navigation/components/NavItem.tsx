import { Icon } from '@front/icons';
import type { ReactElement, ReactNode } from 'react';
import { mergeProps } from 'react-aria';
import type { TreeItemContentRenderProps } from 'react-aria-components';
import { Button } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { pickDataAttributes } from '#shared/utils';
import type { NavigationItemRecipeVariantProps } from '#styled-system/recipes';
import { navigationItemRecipe } from '#styled-system/recipes';

import { Badge } from '../../Badge';
import { FeaturedIcon } from '../../FeaturedIcon';

export type Item = {
  dot?: boolean | ReactNode;
  icon?: ReactNode;
  colorScheme?: NavigationItemRecipeVariantProps['colorScheme'];
  size?: NavigationItemRecipeVariantProps['size'];
  iconType?: NavigationItemRecipeVariantProps['iconType'];
  badge?: number | string;
  name?: string;
  isCollapsed?: boolean;
  addon?: ReactNode;
};

export type NavItemProps = Item & TreeItemContentRenderProps & DataAttributes;

export function NavItem(props: NavItemProps): ReactElement {
  const [variantProps, otherProps] =
    navigationItemRecipe.splitVariantProps(props);
  const { colorScheme, iconType, isCollapsed } = variantProps;
  const { dot, icon, name, badge, hasChildItems, addon } = otherProps;

  const combinedProps = mergeProps(variantProps, variantProps);
  const itemClassNames = navigationItemRecipe(combinedProps);

  const dataAttributes = pickDataAttributes(props);

  return (
    <>
      <div className={itemClassNames.item} {...dataAttributes}>
        <div className={itemClassNames.content}>
          {icon && iconType === 'icon' && (
            <div className={itemClassNames.icon}>
              {icon}
              {dot === true ? (
                <Icon name="shapes/circle" className={itemClassNames.dot} />
              ) : typeof dot !== 'boolean' ? (
                dot
              ) : null}
            </div>
          )}
          {icon && iconType === 'featuredIcon' && (
            <div>
              <FeaturedIcon
                size={'sm'}
                colorScheme={colorScheme === 'gray' ? 'secondary' : colorScheme}
                type={'square'}
              >
                {icon}
              </FeaturedIcon>
            </div>
          )}

          {!isCollapsed && <div className={itemClassNames.text}>{name}</div>}
        </div>
        {!isCollapsed && (
          <div className={itemClassNames.dropdownWrapper}>
            {badge && (
              <div className={itemClassNames.badge}>
                <Badge
                  size={'sm'}
                  colorScheme={
                    colorScheme === 'gray' ? 'grayLight' : colorScheme
                  }
                >
                  {badge}
                </Badge>
              </div>
            )}
            {hasChildItems ? (
              <Button slot="chevron" className={itemClassNames.chevron}>
                <Icon name="arrows/chevron-down" />
              </Button>
            ) : addon ? (
              <div className={itemClassNames.addon}>{addon}</div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}
