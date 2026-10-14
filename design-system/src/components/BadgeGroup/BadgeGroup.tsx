import type { ReactElement } from 'react';
import type {
  TagGroupProps as AriaTagGroupProps,
  TagListProps as AriaTagListProps,
} from 'react-aria-components';
import {
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { BadgeGroupRecipeVariantProps } from '#styled-system/recipes';
import { badgeGroupRecipe } from '#styled-system/recipes';

export type BadgeGroupProps<T> = Omit<AriaTagGroupProps, 'children'> &
  Pick<AriaTagListProps<T>, 'items' | 'children' | 'renderEmptyState'> &
  BadgeGroupRecipeVariantProps &
  DataAttributes;

export function BadgeGroup<T extends Record<string, unknown>>({
  children,
  items,
  ...props
}: BadgeGroupProps<T>): ReactElement {
  const classNames = badgeGroupRecipe();

  return (
    <AriaTagGroup {...props} className={classNames.group}>
      <AriaTagList className={classNames.list} items={items}>
        {children}
      </AriaTagList>
    </AriaTagGroup>
  );
}
