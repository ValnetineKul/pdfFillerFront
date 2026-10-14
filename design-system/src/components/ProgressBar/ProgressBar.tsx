import type { ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import { progressBarRecipe } from '#styled-system/recipes';

const cleanPercentage = (percentage: number): number => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0;
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

type Size = 'xs' | 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends DataAttributes {
  percentage: number;
  centerText?: string;
  showValue?: boolean;
  size?: Size;
}

export const ProgressBar = ({
  percentage,
  centerText,
  showValue = true,
  size = 'xs',
  ...dataAttributes
}: ProgressBarProps): ReactElement => {
  const pct = cleanPercentage(percentage);

  const getDimensions = (
    progressBarSize: Size,
  ): { svgSize: number; radius: number } => {
    switch (progressBarSize) {
      case 'xs':
        return {
          svgSize: 160,
          radius: 60,
        };
      case 'sm':
        return {
          svgSize: 200,
          radius: 80,
        };
      case 'md':
        return {
          svgSize: 240,
          radius: 90,
        };
      case 'lg':
        return {
          svgSize: 280,
          radius: 110,
        };
      default:
        return {
          svgSize: 240,
          radius: 90,
        };
    }
  };

  const { svgSize, radius } = getDimensions(size);
  const circ = 2 * Math.PI * radius;
  const strokePct = ((100 - pct) * circ) / 100;

  const classNames = progressBarRecipe({ size });

  return (
    <svg
      {...dataAttributes}
      width={svgSize}
      height={svgSize}
      className={classNames.root}
    >
      <g transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}>
        <circle
          r={radius}
          cx={svgSize / 2}
          cy={svgSize / 2}
          fill="transparent"
          strokeDasharray={circ}
          strokeDashoffset={0}
          className={classNames.circle}
        />
        <circle
          r={radius}
          cx={svgSize / 2}
          cy={svgSize / 2}
          fill="transparent"
          strokeDasharray={circ}
          strokeDashoffset={strokePct}
          className={classNames.valueCircle}
        />
      </g>
      <foreignObject
        x="0"
        y="0"
        width={svgSize}
        height={svgSize}
        className={classNames.textContainer}
      >
        <div className={classNames.textWrapper}>
          {centerText && (
            <div className={classNames.centerText}>{centerText}</div>
          )}
          {showValue && (
            <div className={classNames.text}>{`${pct.toFixed(0)}%`}</div>
          )}
        </div>
      </foreignObject>
    </svg>
  );
};
