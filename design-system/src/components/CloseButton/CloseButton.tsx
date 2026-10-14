import { Icon } from '@front/icons';
import { type ReactElement, useContext } from 'react';
import type { AriaButtonProps, PressEvent } from 'react-aria';
import { Button as AriaButton } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { CloseButtonRecipeVariantProps } from '#styled-system/recipes';
import { closeButtonRecipe } from '#styled-system/recipes';

import { useConfigProvider } from '../ConfigProvider';
import { ButtonFixWrongCapturingContext } from '../shared';

export type CloseButtonProps = AriaButtonProps &
  CloseButtonRecipeVariantProps & {
    slot?: string;
  } & DataAttributes;

/**
 * CloseButton применяется для компонентов которые имеют свойство закрываться например такие, как: Drawer, Modal, Toast.
 *
 * Данный компонент базируется на принципах работы компоненты Button, при этом имеет собственные стили для использования внутри небольших по размеру компонентах.
 *
 * Может изменять размер в зависимости от переданного параметра size.
 *
 * Имеет встроенную иконку "крестик".
 * Не принимает дочерних элементов.
 *
 * Ссылка на документацию: https://react-spectrum.adobe.com/react-aria/button.html
 */

export function CloseButton(props: CloseButtonProps): ReactElement {
  const { buttonPressHandlerDelay } = useConfigProvider();

  const [variantProps, otherProps] = closeButtonRecipe.splitVariantProps(props);

  const { onPress, slot = 'close' } = otherProps;
  const classNames = closeButtonRecipe(variantProps);

  const buttonFixWrongCapturingContext = useContext(
    ButtonFixWrongCapturingContext,
  );

  /**
   * Workaround https://issues.chromium.org/issues/40851596
   */
  const pressHandler = (e: PressEvent): void => {
    if (
      !buttonFixWrongCapturingContext.fixWrongCapturing ||
      e.pointerType === 'mouse' ||
      e.pointerType === 'keyboard'
    ) {
      onPress?.(e);
      return;
    }
    setTimeout(() => {
      onPress?.(e);
    }, buttonPressHandlerDelay);
  };

  return (
    <AriaButton
      {...otherProps}
      className={classNames.root}
      slot={slot}
      onPress={pressHandler}
    >
      <Icon name="general/x-close" className={classNames.icon} />
    </AriaButton>
  );
}
