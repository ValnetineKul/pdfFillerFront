import type { MouseEventHandler, ReactElement, ReactNode } from 'react';

import type { DataAttributes } from '#shared/types';
import { pickDataAttributes } from '#shared/utils';
import { css, cx } from '#styled-system/css';
import { sectionWrapperRecipe } from '#styled-system/recipes';
import type { RadiusToken } from '#styled-system/tokens';
import type { CssProperties } from '#styled-system/types';

export type SectionWrapperProps = {
  background?: {
    backgroundImage: string;
    size?: CssProperties['backgroundSize'];
    position?: CssProperties['backgroundPosition'];
    backgroundRepeat?: CssProperties['backgroundRepeat'];
    aspectRation?: string;
    borderRadius?: RadiusToken;
  };
  contentPositionX?: 'start' | 'center' | 'end';
  contentPositionY?: 'start' | 'center' | 'end';
  theme?: 'secondary' | 'brand';
  viewType?: 'column' | 'row';
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
} & DataAttributes;

export const SectionWrapper = (props: SectionWrapperProps): ReactElement => {
  const { background, children } = props;
  const [variantProps] = sectionWrapperRecipe.splitVariantProps(props);

  const recipeClassname = sectionWrapperRecipe({
    ...variantProps,
    withClick: !!props.onClick,
  });

  const backgroundStyles = background?.backgroundImage
    ? {
        backgroundImage: background?.backgroundImage,
        backgroundSize: background?.size ? String(background?.size) : 'contain',
        backgroundPosition: background?.position
          ? String(background?.position)
          : 'center',
        backgroundRepeat: background?.backgroundRepeat
          ? String(background?.backgroundRepeat)
          : 'no-repeat',
        aspectRatio: background?.aspectRation ?? '5 / 3',
      }
    : {};

  const className = cx(
    recipeClassname,
    css({
      borderRadius: background?.borderRadius ?? '0',
    }),
  );

  return (
    <section
      {...pickDataAttributes(props)}
      onClick={props.onClick}
      style={backgroundStyles}
      className={className}
    >
      {children}
    </section>
  );
};
