import type { FC, PropsWithChildren } from 'react';

import { cx } from '#styled-system/css';
import { containerRecipe } from '#styled-system/recipes';

import type { ContainerProps } from './types';

export const Container: FC<PropsWithChildren<ContainerProps>> = (props) => {
  const { maxWidth = 'w1920', className, children } = props;

  const classNameRecipe = containerRecipe({ maxWidth });

  return <div className={cx(classNameRecipe, className)}>{children}</div>;
};
