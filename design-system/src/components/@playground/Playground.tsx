import type { ReactElement } from 'react';

import { scrollable } from '#styled-system/patterns';

export const Playground = (): ReactElement => {
  return <div className={scrollable({ height: 200 })}>Lorem</div>;
};
