import type { CSSProperties } from 'react';

import type { BreakpointToken } from '#styled-system/tokens';

export type ConditionalValue = {
  base: string | number;
} & {
  [key in BreakpointToken]?: string | number;
};

export type GetConditionalCssVariables = (
  nameVariable: string,
  value?: string | number | ConditionalValue,
  prepareValue?: (
    value: string | number,
    breakpoint: keyof ConditionalValue,
  ) => string | number | undefined,
) => CSSProperties | undefined;
