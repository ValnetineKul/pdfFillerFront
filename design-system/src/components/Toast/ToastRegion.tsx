import type { ReactElement, ReactNode } from 'react';
import { useRef } from 'react';
import { type AriaToastRegionProps, useToastRegion } from 'react-aria';
import type { ToastState } from 'react-stately';

import type { ToastRecipeVariantProps } from '#styled-system/recipes';
import { toastRecipe } from '#styled-system/recipes';

import { Toast } from './Toast';

interface ToastRegionProps<T>
  extends AriaToastRegionProps, ToastRecipeVariantProps {
  state: ToastState<T>;
}

export function ToastRegion<T extends ReactNode>({
  state,
  position,
  ...props
}: ToastRegionProps<T>): ReactElement {
  const ref = useRef(null);
  const { regionProps } = useToastRegion<T>(props, state, ref);
  const classNames = toastRecipe({ position });
  return (
    <div {...regionProps} ref={ref} className={classNames.region}>
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}
