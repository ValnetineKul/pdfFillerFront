import type { ReactElement } from 'react';
import type { ToggleButtonProps as AriaToggleButtonProps } from 'react-aria-components';
import { ToggleButton as AriaToggleButton } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { ButtonRecipeVariantProps } from '#styled-system/recipes';
import { buttonRecipe } from '#styled-system/recipes';

export type ToggleButtonProps = AriaToggleButtonProps &
  ButtonRecipeVariantProps &
  DataAttributes;

/**
 * Кнопка переключения позволяет пользователю включать и выключать выбор, например, переключаться между двумя состояниями или режимами.
 *
 * ToggleButton имеет стили кнопок.
 *
 * Кнопки переключения похожи на кнопки действий, но поддерживают дополнительное состояние выбора isSelected, которое переключается, когда пользователь нажимает кнопку.
 * Встроенного элемента HTML, представляющего кнопку переключения, нет, поэтому React Aria реализует его с помощью атрибутов ARIA.
 *
 * Узнать больше: https://react-spectrum.adobe.com/react-aria/ToggleButton.html
 */

export function ToggleButton(props: ToggleButtonProps): ReactElement {
  const [variantProps, otherProps] = buttonRecipe.splitVariantProps(props);
  const className = buttonRecipe(variantProps);

  return <AriaToggleButton {...otherProps} className={className} />;
}
