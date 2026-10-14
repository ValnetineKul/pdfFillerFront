import type { DataAttributes } from '#shared/types';
import type { BreakpointToken } from '#styled-system/tokens';

export type ContainerProps = {
  maxWidth?: BreakpointToken;
  className?: string;
} & DataAttributes;
