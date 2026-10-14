import type { CSSProperties, ReactElement } from 'react';
import { useMemo } from 'react';

import { getConditionalCssVariables } from '#shared/utils';
import { metricGroupRecipe } from '#styled-system/recipes';
import type { Token } from '#styled-system/tokens';
import { token } from '#styled-system/tokens';

import { MetricItem } from './MetricItem';
import type { MetricGroupProps } from './types';

export function MetricGroup(props: MetricGroupProps): ReactElement {
  const {
    items,
    gridBackground,
    gap,
    gridBorderRadius,
    itemBorderRadius,
    columns,
  } = props;

  const cssVariables = useMemo<CSSProperties | undefined>(
    () => getConditionalCssVariables('columns', columns),
    [columns],
  );

  const classname = metricGroupRecipe();
  const bgVariableStyles = gridBackground?.colorEnd
    ? {
        backgroundImage: `linear-gradient(${
          gridBackground?.deg ?? 0
        }deg, ${gridBackground?.colorEnd}, ${gridBackground?.colorStart})`,
      }
    : undefined;

  const bgStyles = gridBackground?.colorStart
    ? {
        background: gridBackground?.colorStart,
      }
    : undefined;

  const bg = bgVariableStyles ?? bgStyles;

  const style = {
    [`--children-count`]: items?.length,
    '--gridBorderRadius': token(`radii.${gridBorderRadius ?? 0}`),
    '--gridGap': token(`spacing.${gap ?? 0}` as Token),
    ...cssVariables,
    ...bg,
  };

  return (
    <div style={style} className={classname}>
      {items?.map((metricItem, index) => (
        <MetricItem
          key={index}
          itemBorderRadius={itemBorderRadius}
          {...metricItem}
        />
      ))}
    </div>
  );
}
