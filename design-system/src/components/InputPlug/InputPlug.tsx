import type { FC, PropsWithChildren } from 'react';

import { inputPlugRecipe } from '#styled-system/recipes';

export const InputPlug: FC<PropsWithChildren> = ({ children }) => {
  const classes = inputPlugRecipe();
  return <div className={classes}>{children}</div>;
};
