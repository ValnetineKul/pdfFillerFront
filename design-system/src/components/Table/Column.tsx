import type { ReactElement } from 'react';
import type { ColumnProps } from 'react-aria-components';
import { Column as AriaColumn } from 'react-aria-components';

import { tableRecipe } from '#styled-system/recipes';

export function Column(props: ColumnProps): ReactElement {
  const classNames = tableRecipe();
  return (
    <AriaColumn {...props} className={classNames.column}>
      {({ allowsSorting, sortDirection }) => (
        <>
          {props.children}
          {allowsSorting && (
            <span aria-hidden="true" className="sort-indicator">
              {sortDirection === 'ascending' ? '▲' : '▼'}
            </span>
          )}
        </>
      )}
    </AriaColumn>
  );
}
