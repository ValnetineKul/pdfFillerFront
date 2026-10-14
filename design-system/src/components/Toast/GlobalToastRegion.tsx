import type { ReactNode, ReactPortal } from 'react';
import type { AriaToastRegionProps } from 'react-aria';
import { createPortal } from 'react-dom';
import { ToastQueue, useToastQueue } from 'react-stately';

import type { ToastRecipeVariantProps } from '#styled-system/recipes';

import { ToastRegion } from './ToastRegion';

export const toastQueue = new ToastQueue<ReactNode>({
  maxVisibleToasts: 5,
});

export const GlobalToastRegion = (
  props: AriaToastRegionProps & ToastRecipeVariantProps,
): ReactPortal | null => {
  const state = useToastQueue(toastQueue);

  return state.visibleToasts.length > 0
    ? createPortal(<ToastRegion {...props} state={state} />, document.body)
    : null;
};
