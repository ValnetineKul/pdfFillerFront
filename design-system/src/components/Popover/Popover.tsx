import type { ReactElement, ReactNode } from 'react';
import type { PopoverProps as AriaPopoverProps } from 'react-aria-components';
import { OverlayArrow, Popover as AriaPopover } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { popoverRecipe } from '#styled-system/recipes';

/**
 * Popover — это элемент наложения, позиционируемый относительно триггера.
 * В HTML нет встроенного способа создания поповеров, поэтому Popover помогает создать доступные и стилизуемые поповеры.
 *
 * ## Особенности
 * - **Стилизация**: Включает состояния для анимации появления и исчезновения. Можно добавить стрелку.
 * - **Доступность**: Триггер и поповер связаны с помощью ARIA. Контент за пределами поповера скрыт от вспомогательных технологий. Закрывается при клике вне области или нажатии Escape.
 * - **Управление фокусом**: Фокус перемещается в поповер при его открытии и возвращается к триггеру при закрытии.
 * - **Позиционирование**: Поповер позиционируется относительно триггера и автоматически подстраивается, чтобы не пересекаться с краями окна браузера.
 *
 * Примечание: Popover предоставляет только наложение. Для полной доступности комбинируйте с диалогами. В поповере также можно размещать другие наложения, например, меню.
 * Узнать больше: https://react-spectrum.adobe.com/react-aria/Popover.html#popover
 */

export interface PopoverProps
  extends Omit<AriaPopoverProps, 'children'>, DataAttributes {
  children: ReactNode;
  useArrow?: boolean;
  useOffset?: boolean;
}

export function Popover({
  children,
  useArrow = false,
  useOffset,
  ...props
}: PopoverProps): ReactElement {
  const classes = popoverRecipe({ useOffset });
  return (
    <AriaPopover {...props} offset={0} className={classes.root}>
      {useArrow && (
        <OverlayArrow slot="arrow" className={classes.arrow}>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      <div className={classes.content}>{children}</div>
    </AriaPopover>
  );
}
