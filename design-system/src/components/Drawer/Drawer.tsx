import type { ReactElement, ReactNode } from 'react';
import type {
  DialogTriggerProps,
  ModalOverlayProps,
} from 'react-aria-components';
import {
  DialogTrigger,
  Heading,
  Modal as AriaModal,
  ModalOverlay,
  Text,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import type { DrawerAnimatedRecipeVariantProps } from '#styled-system/recipes';
import { drawerAnimatedRecipe, drawerRecipe } from '#styled-system/recipes';

import { CloseButton, type CloseButtonProps } from '../CloseButton';

export interface DrawerProps
  extends
    Omit<ModalOverlayProps, 'className'>,
    DrawerAnimatedRecipeVariantProps,
    DataAttributes {
  title?: string | ReactNode;
  description?: string | ReactNode;
  closeButtonProps?: CloseButtonProps;
}
/**
 * Drawer — это выдвижная панель, которая появляется сбоку экрана, чтобы отображать дополнительную информацию или действия.
 * Drawer помогает предоставить пользователю доступ к контенту, не покидая основную страницу.
 *
 * ## Особенности
 * - **Встроенные свойства**: Поддерживает встроенные пропсы для заголовка (`title`) и описания (`description`), которые автоматически отображаются в верхней части панели.
 * - **Стилизация**: Поддерживает анимации открытия и закрытия для плавного перехода. Можно настроить ширину и внешний вид панели.
 * - **Доступность**: Управляется через клавиатуру и совместим с технологиями экранного доступа. Панель может быть закрыта нажатием клавиши Escape или кликом вне панели.
 * - **Фокус**: При открытии фокус перемещается внутрь панели, а при закрытии — возвращается на предыдущий элемент.
 * - **Позиционирование**: Появляется сбоку экрана (слева или справа) либо сверху или снизу, и может перекрывать основной контент при необходимости.
 *
 * Drawer идеально подходит для отображения меню, настроек или других второстепенных элементов интерфейса.
 */
export function DrawerTrigger({
  children,
  ...props
}: DialogTriggerProps): ReactElement {
  return <DialogTrigger {...props}>{children}</DialogTrigger>;
}

export function Drawer(props: DrawerProps): ReactElement {
  const [variantProps, otherProps] =
    drawerAnimatedRecipe.splitVariantProps(props);
  const {
    children,
    title,
    description,
    closeButtonProps,
    ...modalOverlayProps
  } = otherProps;
  const classes = drawerRecipe();

  return (
    <ModalOverlay
      {...modalOverlayProps}
      className={({ isExiting, isEntering }) =>
        cx(
          drawerAnimatedRecipe({
            isEntering,
            isExiting,
          }).overlay,
          classes.overlay,
        )
      }
    >
      <AriaModal
        className={({ isEntering, isExiting }) =>
          cx(
            classes.root,
            drawerAnimatedRecipe({
              isEntering,
              isExiting,
              ...variantProps,
            }).root,
          )
        }
      >
        {({ state, isExiting, isEntering, defaultChildren }) => (
          <>
            <div className={classes.headerWrapper}>
              <Heading className={classes.header}>{title}</Heading>
              {description && (
                <Text className={classes.description}>{description}</Text>
              )}
              <CloseButton
                onPress={state.close}
                size="md"
                {...closeButtonProps}
              />
            </div>
            <div
              className={cx(
                classes.content,
                scrollable({ direction: 'vertical' }),
              )}
            >
              {typeof children === 'function'
                ? children({
                    state,
                    isExiting,
                    isEntering,
                    defaultChildren,
                  })
                : children}
            </div>
          </>
        )}
      </AriaModal>
    </ModalOverlay>
  );
}
