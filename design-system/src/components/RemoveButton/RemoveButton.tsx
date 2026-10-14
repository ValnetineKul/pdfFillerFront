import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import type { AriaButtonProps } from 'react-aria';
import type { SlotProps } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { makeColorLighter } from '#shared/utils/makeColorLighter';
import type { RemoveButtonRecipeVariantProps } from '#styled-system/recipes';
import { removeButtonRecipe } from '#styled-system/recipes';

export type RemoveButtonProps = AriaButtonProps &
  RemoveButtonRecipeVariantProps &
  SlotProps & {
    customColor?: string;
  } & DataAttributes;

/**
 * RemoveButton применяется для компонентов которые имеют свойство удалятся из списка. например Tag и Badge
 *
 * Данный компонент базируется на принципах работы компоненты Button, при этом имеет собственные стили для использования внутри небольших по размеру компонентах.
 *
 * Может изменять цвет в зависимости от переданного параметра colorScheme.
 * Может изменять размер в зависимости от переданного параметра size.
 *
 * Имеет встроенную иконку "крестик".
 * Не принимает дочерних элементов.
 *
 * Ссылка на документацию: https://react-spectrum.adobe.com/react-aria/button.html
 */

export function RemoveButton(props: RemoveButtonProps): ReactElement {
  const { customColor, ...rest } = props;

  const [variantProps, otherProps] = removeButtonRecipe.splitVariantProps(rest);

  const className = removeButtonRecipe(variantProps);

  const customStyle =
    variantProps.colorScheme === 'custom' && customColor
      ? {
          color: makeColorLighter(customColor, 36),
        }
      : {};

  return (
    <AriaButton {...otherProps} className={className.root} style={customStyle}>
      <Icon name="general/x-close" className={className.icon} />
    </AriaButton>
  );
}
