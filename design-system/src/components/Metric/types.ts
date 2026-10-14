import type { ReactNode } from 'react';

import type { DataAttributes } from '#shared/types';
import type { BreakpointToken, Tokens } from '#styled-system/tokens';

export type MetricItem = {
  imageSlot?: ReactNode;
  title?: string;
  contentSlot?: ReactNode;
  background?: {
    colorStart: string;
    colorEnd?: string;
    deg?: number;
  };
};

export type MetricItemProps = MetricItem &
  Pick<MetricGroupProps, 'itemBorderRadius'> &
  DataAttributes;

export type MetricGroupProps = {
  items: Array<MetricItem>;
  gridBackground?: {
    colorStart: string;
    colorEnd?: string;
    deg?: number;
  };
  columns?:
    | number
    | (Record<'base', number> & Partial<Record<BreakpointToken, number>>);
  gridBorderRadius?: Tokens['radii'];
  gap?: Tokens['spacing'];
  itemBorderRadius?: Tokens['radii'];
} & DataAttributes;
