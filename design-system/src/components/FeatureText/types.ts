import type { ReactNode } from 'react';

import type { DataAttributes } from '#shared/types';

export type FeatureTextProps = {
  align?: 'start' | 'center' | 'end';
  title?: string;
  text?: string;
  iconSlot?: ReactNode;
  buttonSlot?: ReactNode;
} & DataAttributes;
