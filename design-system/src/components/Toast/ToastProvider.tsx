import type { ReactElement, ReactNode } from 'react';
import { type ToastState, useToastState } from 'react-stately';

import type { DataAttributes } from '#shared/types';

import { ToastRegion } from './ToastRegion';

export type ToastProviderProps<T> = {
  children: ReactNode | ((state: ToastState<T>) => ReactNode);
  maxVisibleToasts?: number;
} & DataAttributes;

export function ToastProvider<T extends ReactNode>(
  props: ToastProviderProps<T>,
): ReactElement {
  const { children, maxVisibleToasts, ...otherProps } = props;

  const state = useToastState<T>({
    maxVisibleToasts: maxVisibleToasts ?? 5,
  });

  return (
    <>
      {typeof children === 'function' ? children(state) : children}
      {state.visibleToasts.length > 0 && (
        <ToastRegion {...otherProps} state={state} />
      )}
    </>
  );
}
