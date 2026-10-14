import type { ReactElement } from 'react';

import type { DataAttributes } from '#shared/types';
import { semiCircleProgressBarRecipe } from '#styled-system/recipes';

const cleanPercentage = (percentage: number): number => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0;
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const calculateMinPercentage = (minValue: number, maxValue: number): number => {
  if (minValue < 0 || minValue > maxValue) {
    return 0;
  }
  return (minValue / maxValue) * 100;
};

type Size = 'xs' | 'sm' | 'md' | 'lg';

export interface SemiCircleProgressBarProps extends DataAttributes {
  currentValue: number;
  maxValue: number;
  minValue?: number;
  showValue?: boolean;
  size: Size;
  textMode?: 'percent' | 'value';
  currency?: string;
  title?: string;
}

export const SemiCircleProgressBar = ({
  currentValue,
  maxValue,
  minValue,
  showValue = true,
  size,
  textMode = 'value',
  currency,
  title,
  ...dataAttributes
}: SemiCircleProgressBarProps): ReactElement => {
  const hasMaxValue = Boolean(maxValue);
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const effectiveMaxValue = hasMaxValue ? maxValue : minValue || 1;
  const pct = cleanPercentage((currentValue / effectiveMaxValue) * 100);
  const minPct =
    hasMaxValue && minValue ? calculateMinPercentage(minValue, maxValue) : 0;

  const getDimensions = (
    progressBarSize: Size,
  ): {
    svgSize: number;
    extraHeight: number;
    radius: number;
    innerRadius: number;
    arcLength: number;
    arcLengthOrange: number;
    strokeDashOffset: number;
    correction: number;
    offsetCorrection: number;
  } => {
    const angleInDegrees = 160;
    const angleInRadians = (angleInDegrees / 360) * 2 * Math.PI;

    let svgSize = 240;
    let radius = 90;
    let innerRadius = radius - 12 / 2 - 12;
    let arcLength = radius * angleInRadians;
    let arcLengthOrange = (radius - 24 - 12 / 2) * angleInRadians;
    let strokeDashOffset = -30;
    let correction = 36;
    let offsetCorrection = 8;
    let extraHeight = 12;

    switch (progressBarSize) {
      case 'xs':
        svgSize = 160;
        radius = 70;
        innerRadius = radius - 8 / 2 - 8;
        arcLength = radius * angleInRadians + 8;
        arcLengthOrange = (radius - 14 - 8 / 2) * angleInRadians;
        strokeDashOffset = -20;
        correction = 25;
        offsetCorrection = 4;
        extraHeight = 6;
        break;
      case 'sm':
        svgSize = 200;
        radius = 90;
        innerRadius = radius - 8 / 2 - 12;
        arcLength = radius * angleInRadians + 8;
        arcLengthOrange = (radius - 20 - 18 / 2) * angleInRadians;
        strokeDashOffset = -30;
        correction = 40;
        offsetCorrection = 4;
        extraHeight = 8;
        break;
      case 'md':
        svgSize = 240;
        radius = 104;
        innerRadius = radius - 12 / 2 - 14;
        arcLength = radius * angleInRadians + 12;
        arcLengthOrange = (radius - 24 - 12 / 2) * angleInRadians;
        strokeDashOffset = -30;
        correction = 36;
        offsetCorrection = 6;
        extraHeight = 10;
        break;
      case 'lg':
        svgSize = 280;
        radius = 126;
        innerRadius = radius - 16 / 2 - 16;
        arcLength = radius * angleInRadians + 12;
        arcLengthOrange = (radius - 28 - 18 / 2) * angleInRadians;
        strokeDashOffset = -40;
        correction = 40;
        offsetCorrection = 8;
        extraHeight = 12;
        break;
    }

    return {
      svgSize,
      radius,
      innerRadius,
      arcLength,
      arcLengthOrange,
      strokeDashOffset,
      correction,
      offsetCorrection,
      extraHeight,
    };
  };

  const {
    svgSize,
    radius,
    innerRadius,
    arcLength,
    arcLengthOrange,
    strokeDashOffset,
    correction,
    offsetCorrection,
    extraHeight,
  } = getDimensions(size);

  const classNames = semiCircleProgressBarRecipe({
    size,
    withoutTitle: !title,
  });

  return (
    <div {...dataAttributes} className={classNames.root}>
      <div
        className={classNames.mainWrapper}
        style={{
          height:
            textMode === 'percent' ? svgSize / 2 + extraHeight : svgSize / 2,
        }}
      >
        <svg
          width={svgSize}
          height={svgSize / 2}
          className={classNames.container}
        >
          <g transform={`rotate(170 ${svgSize / 2} ${svgSize / 2})`}>
            <circle
              r={radius}
              cx={svgSize / 2}
              cy={svgSize / 2}
              fill="transparent"
              strokeDasharray={arcLength}
              strokeDashoffset={strokeDashOffset}
              className={classNames.circle}
            />
            {pct > 0 && (
              <circle
                r={radius}
                cx={svgSize / 2}
                cy={svgSize / 2}
                fill="transparent"
                strokeDasharray={
                  pct > 10
                    ? `${(arcLength * pct) / 100}, ${arcLength}`
                    : `${(arcLength * pct) / 100}, ${arcLength + 100}`
                }
                strokeDashoffset={strokeDashOffset}
                strokeLinecap="round"
                className={classNames.valueCircle}
              />
            )}
            {hasMaxValue && minValue && minPct > 0 && (
              <circle
                r={innerRadius}
                cx={svgSize / 2}
                cy={svgSize / 2}
                fill="transparent"
                strokeDasharray={`${
                  (arcLengthOrange * minPct) / 100 +
                  correction * (minPct < 10 ? minPct / 20 : minPct / 100)
                }, ${arcLengthOrange + arcLength}`}
                strokeDashoffset={strokeDashOffset + offsetCorrection}
                strokeLinecap="round"
                className={classNames.minCircle}
              />
            )}
          </g>
        </svg>
        <div className={classNames.textContainer}>
          {textMode && (
            <div className={classNames.textWrapper}>
              {textMode === 'percent' && showValue && (
                <>
                  {title && <div className={classNames.title}>{title}</div>}
                  <div className={classNames.text}>{`${pct.toFixed(0)}%`}</div>
                </>
              )}
              {textMode === 'value' && (
                <>
                  {title && <div className={classNames.textTitle}>{title}</div>}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {textMode === 'value' && (
        <div className={classNames.valueWrapper}>
          <div className={classNames.textValue}>{currentValue}</div>
          {currency && (
            <div className={classNames.textCurrency}>
              {currency.toUpperCase()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
