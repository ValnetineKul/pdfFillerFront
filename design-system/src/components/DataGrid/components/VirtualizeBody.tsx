import type { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { ReactElement, RefObject } from 'react';
import { useContext } from 'react';

import { dataGridRecipe } from '#styled-system/recipes';

import { DataGridContext } from '../DataGrid';
import type { DefaultDataGrid } from '../types';
import { Cell } from './Cell';

export function VirtualizeBody<T extends DefaultDataGrid>({
  rows,
  tableContainerRef,
}: {
  rows: Array<Row<T>>;
  tableContainerRef: RefObject<HTMLDivElement | null>;
}): ReactElement {
  const context = useContext(DataGridContext);
  const classes = dataGridRecipe(context);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 40,
    getScrollElement: () => tableContainerRef.current,
    overscan: 5,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <tbody
      className={classes.tbody}
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
      }}
    >
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index];
        const visibleCells = row.getVisibleCells();
        return (
          <tr
            key={row.id}
            className={classes.row}
            data-index={virtualRow.index} // needed for dynamic row height measurement
            style={{
              position: 'absolute',
              transform: `translateY(${virtualRow.start}px)`, // this should always be a `style` as it changes on scroll
            }}
          >
            {visibleCells.map((cell, index) => (
              <Cell key={index} cell={cell} />
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}
