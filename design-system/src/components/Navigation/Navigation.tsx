import type { ReactElement } from 'react';
import type { TreeProps as AriaTreeProps } from 'react-aria-components';
import { Tree as AriaTree } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { NavigationRecipeVariantProps } from '#styled-system/recipes';
import { navigationRecipe } from '#styled-system/recipes';

export type NavigationProps<T extends object> = AriaTreeProps<T> &
  NavigationRecipeVariantProps &
  DataAttributes;

/**
 * Компонент Navigation на основе компонента Tree из React Aria предоставляет доступное и настраиваемое дерево навигации.
 *
 * Он поддерживает навигацию с помощью клавиатуры, озвучивание с помощью экранных ридеров и взаимодействие с пунктами навигации на разных уровнях вложенности.
 *
 * ### Основные функции:
 *
 * - Поддержка клавиатуры: навигация с использованием стрелок, клавиш Enter и Space.
 * - Поддержка вложенных списков.
 * - Пользовательские действия для каждого пункта навигации.
 * - Вариативность стилей.
 *
 * > Подходит для использования в навигационных панелях и приложениях с раскрывающимися списками.
 */

export function Navigation<T extends object>(
  props: NavigationProps<T>,
): ReactElement {
  const [variantProps, otherProps] = navigationRecipe.splitVariantProps(props);
  const { children } = otherProps;
  const { list } = navigationRecipe(variantProps);

  return (
    <AriaTree {...otherProps} className={list}>
      {children}
    </AriaTree>
  );
}
