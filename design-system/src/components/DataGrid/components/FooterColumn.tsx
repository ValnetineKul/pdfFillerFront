import type { Header } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { ReactElement } from 'react';
import { useContext } from 'react';

import { cx } from '#styled-system/css';
import { dataGridRecipe } from '#styled-system/recipes';

import { DataGridContext } from '../DataGrid';
import { getHeaderCommonPinningStyles } from '../helpers';
import type { ColumnDef, DefaultDataGrid } from '../types';

export function FooterColumn<T extends DefaultDataGrid>({
  header,
}: {
  header: Header<T, unknown>;
}): ReactElement {
  const context = useContext(DataGridContext);
  const classes = dataGridRecipe(context);

  const isPinned = header.column.getIsPinned();
  const isResizing = header.column.getIsResizing();
  const { footerClassName } = header.column.columnDef as ColumnDef<T>;
  const className =
    typeof footerClassName === 'function'
      ? footerClassName(header.getContext())
      : footerClassName;

  return (
    <th
      id={header.id}
      key={header.id}
      colSpan={header.colSpan}
      className={cx(classes.column, className)}
      data-resizing={isResizing}
      data-is-pin={Boolean(isPinned)}
      style={getHeaderCommonPinningStyles({
        header,
      })}
    >
      <div className={classes.columnWrapper}>
        <div className={classes.columnContent}>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.footer, header.getContext())}
        </div>
      </div>
    </th>
  );
}
