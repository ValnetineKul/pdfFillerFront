import type { ReactElement } from 'react';
import { Heading } from 'react-aria-components';

import { cx } from '#styled-system/css';
import { metricItemRecipe } from '#styled-system/recipes';
import { token } from '#styled-system/tokens';

import { RichText } from '../RichText';
import type { MetricItemProps } from './types';

export const MetricItem = (props: MetricItemProps): ReactElement => {
  const {
    background,
    contentSlot,
    itemBorderRadius = '0',
    imageSlot,
    title,
  } = props;
  const itemBgGradientVariableStyles = background?.colorEnd
    ? {
        '--bgItemGradient': `linear-gradient(${
          background?.deg ?? 0
        }deg, ${background?.colorEnd}, ${background?.colorStart})`,
      }
    : undefined;

  const itemBgStyles = background?.colorStart
    ? {
        background: background?.colorStart,
      }
    : undefined;

  const styles = itemBgGradientVariableStyles ?? itemBgStyles;

  const classname = metricItemRecipe();

  return (
    <div
      className={cx(classname.container)}
      style={{
        ...styles,
        '--borderToken': token(`radii.${itemBorderRadius}`),
      }}
    >
      {imageSlot && <div className={classname.image}>{imageSlot}</div>}
      {title && (
        <Heading className={classname.title} level={3}>
          {title}
        </Heading>
      )}
      {contentSlot && (
        <div className={cx(classname.content)}>
          <RichText>{contentSlot}</RichText>
        </div>
      )}
    </div>
  );
};
