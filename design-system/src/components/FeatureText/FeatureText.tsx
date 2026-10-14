import { forwardRef } from 'react';
import { Heading, Text } from 'react-aria-components';

import { featureTextRecipe } from '#styled-system/recipes';

import type { FeatureTextProps } from './types';

export const FeatureText = forwardRef<HTMLDivElement, FeatureTextProps>(
  (props, ref) => {
    const [variantProps, otherProps] =
      featureTextRecipe.splitVariantProps(props);

    const { iconSlot, text, title, buttonSlot } = otherProps;

    const classNames = featureTextRecipe(variantProps);

    return (
      <div className={classNames.root} ref={ref}>
        {iconSlot && <div className={classNames.icon}>{iconSlot}</div>}
        <div className={classNames.content}>
          {title && (
            <Heading level={3} className={classNames.title}>
              {title}
            </Heading>
          )}
          {text && (
            <Text elementType="p" className={classNames.text}>
              {text}
            </Text>
          )}
          {buttonSlot && <div className={classNames.button}>{buttonSlot}</div>}
        </div>
      </div>
    );
  },
);
