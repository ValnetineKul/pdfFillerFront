import type { CSSProperties, ReactNode } from 'react';

import type { DataAttributes } from '#shared/types';

export type AsteriskProps = {
  className?: string;
  style?: CSSProperties;
} & DataAttributes;

export type AsteriskFieldProps = {
  necessityIndicator?: boolean;
  customAsterisk?: ReactNode;
};
