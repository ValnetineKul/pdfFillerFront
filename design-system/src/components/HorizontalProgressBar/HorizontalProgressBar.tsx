import type { PropsWithChildren } from 'react';

import type { DataAttributes } from '#shared/types';
import { pickDataAttributes } from '#shared/utils';
import type { HorizontalProgressBarRecipeVariantProps } from '#styled-system/recipes';
import { horizontalProgressBarRecipe } from '#styled-system/recipes';

export type HorizontalProgressBarProps = PropsWithChildren<
  HorizontalProgressBarRecipeVariantProps & {
    min: string;
    max: string;
    current: string;
    title?: string;
    value?: string;
  }
> &
  DataAttributes;

export const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({
  min,
  max,
  current,
  size,
  title,
  value,
  ...rest
}) => {
  const minNum = parseFloat(min) || 0;
  const maxNum = parseFloat(max) || minNum || 100;
  const currentNum = parseFloat(current) || 0;

  const currentPercentage = max
    ? Math.min(100, Math.max(0, (currentNum / maxNum) * 100))
    : Math.min(100, Math.max(0, (currentNum / minNum) * 100));

  const minPercentage =
    min && max ? Math.min(100, Math.max(0, (minNum / maxNum) * 100)) : 0;

  const hasProgress = currentPercentage > 0;
  const hasMinBar = minPercentage > 0;

  const {
    container,
    progressBar,
    progressFill,
    minBar,
    textContainer,
    title: titleClass,
    value: valueClass,
  } = horizontalProgressBarRecipe({
    size,
  });

  return (
    <div {...pickDataAttributes(rest)} className={container}>
      <div className={progressBar}>
        {hasProgress && (
          <div
            className={progressFill}
            style={{ width: `${currentPercentage}%` }}
          />
        )}
      </div>

      {hasMinBar && (
        <div className={minBar} style={{ width: `${minPercentage}%` }} />
      )}

      {(Boolean(title) || Boolean(value)) && (
        <div className={textContainer}>
          {title && <div className={titleClass}>{title}</div>}
          {value && <div className={valueClass}>{value}</div>}
        </div>
      )}
    </div>
  );
};
