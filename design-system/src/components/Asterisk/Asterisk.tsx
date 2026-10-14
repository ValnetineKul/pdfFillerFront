import type { FC, PropsWithChildren } from 'react';

import { cx } from '#styled-system/css';
import { asteriskRecipe } from '#styled-system/recipes';

import type { AsteriskProps } from './types';

export const Asterisk: FC<PropsWithChildren<AsteriskProps>> = (props) => {
  const { style, className, children = '*' } = props;

  const asteriskClassName = asteriskRecipe();

  return (
    <span className={cx(asteriskClassName, className)} style={style}>
      {children}
    </span>
  );
};
