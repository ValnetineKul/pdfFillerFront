import { createContext } from 'react';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { ButtonRecipeVariantProps } from '#styled-system/recipes';

export const ButtonVariantContext = createContext<ButtonRecipeVariantProps>({});

export type ButtonFixWrongCapturingProps = {
  /**
   *  Workaround https://issues.chromium.org/issues/40851596
   */
  fixWrongCapturing?: boolean;
};

export const ButtonFixWrongCapturingContext =
  createContext<ButtonFixWrongCapturingProps>({});

export type ButtonProps = AriaButtonProps &
  ButtonRecipeVariantProps &
  ButtonFixWrongCapturingProps &
  DataAttributes;
