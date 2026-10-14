import type { ReactElement } from 'react';
import type { CellProps } from 'react-aria-components';
import { Cell as AriaCell } from 'react-aria-components';

import { tableRecipe } from '#styled-system/recipes';

export function Cell(props: CellProps): ReactElement {
  const classNames = tableRecipe();
  return <AriaCell {...props} className={classNames.cell} />;
}
