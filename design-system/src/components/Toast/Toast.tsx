import type { ReactElement, ReactNode } from 'react';
import { useRef } from 'react';
import { type AriaToastProps, useToast } from 'react-aria';
import type { ToastState } from 'react-stately';

import type { DataAttributes } from '#shared/types';
import { toastRecipe } from '#styled-system/recipes';

import { CloseButton } from '../CloseButton';

export interface ToastProps<T> extends AriaToastProps<T>, DataAttributes {
  state: ToastState<T>;
}

/**
 * Тостер управляет и отображает уведомления в виде тостов на
 * пользовательском интерфейсе. Он использует внутреннее состояние для контроля
 * количества одновременно видимых тостов и отображает их через компонент ToastRegion.
 *
 * ## Особенности
 *
 * Тостер устроен так что в него можно передать строку или компонент.
 * Это позволяет отображать контент любой сложности, что повышает гибкость применения.
 */

export function Toast<T extends ReactNode>({
  state,
  ...props
}: ToastProps<T>): ReactElement {
  const ref = useRef(null);
  const { toastProps, contentProps, titleProps, closeButtonProps } =
    useToast<T>(props, state, ref);

  const classNames = toastRecipe();
  return (
    <div {...toastProps} ref={ref} className={classNames.root}>
      <div {...contentProps} className={classNames.content}>
        <div {...titleProps}>{props.toast.content}</div>
      </div>
      <CloseButton {...closeButtonProps} />
    </div>
  );
}
