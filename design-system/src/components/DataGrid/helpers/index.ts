import type {
  Column,
  ColumnSizingState,
  Header,
  VisibilityState,
} from '@tanstack/react-table';
import type { CSSProperties } from 'react';

import type { ColumnDef, DefaultDataGrid } from '../types';

export const getFlatColumns = <T extends DefaultDataGrid>(
  columns: Array<ColumnDef<T>>,
): Array<ColumnDef<T>> => {
  const reduces = (
    acc: Array<ColumnDef<T>>,
    column: ColumnDef<T>,
  ): Array<ColumnDef<T>> => {
    if ('columns' in column && column?.columns?.length) {
      const nestedColumns = (column?.columns ?? []).reduce(reduces, []);
      acc.push(...nestedColumns);
    } else {
      acc.push(column);
    }
    return acc;
  };
  return columns.reduce(reduces, []);
};

export const getMinColumnWidth = <T extends DefaultDataGrid>({
  clientTableWidth,
  columns,
  columnVisibility,
  columnSizing,
}: {
  clientTableWidth: number;
  columns: Array<ColumnDef<T>>;
  columnVisibility?: VisibilityState;
  columnSizing?: ColumnSizingState;
}): number => {
  const visibleList = Object.entries(columnVisibility ?? [])
    .filter((obj) => obj[0] && obj[1])
    .map((x) => x[0]);

  const flatColumns = getFlatColumns(columns);

  const defaultColumnWidth = flatColumns.reduce(
    (acc, column) => {
      // eslint-disable-next-line
      // @ts-ignore
      const key = column.id ?? column?.accessorKey;
      if (visibleList.includes(key)) {
        if (column.size && column.minSize) {
          return {
            w:
              acc.w +
              (columnSizing?.[key] ?? Math.max(column.size, column.minSize)),
            l: acc.l,
          };
        } else if (column.size) {
          return {
            w: acc.w + (columnSizing?.[key] ?? column.size),
            l: acc.l,
          };
        } else if (column.minSize) {
          return {
            w: acc.w + (columnSizing?.[key] ?? column.minSize),
            l: acc.l,
          };
        } else if (columnSizing?.[key]) {
          return {
            w: acc.w + columnSizing?.[key],
            l: acc.l,
          };
        }
        return {
          w: acc.w,
          l: acc.l + 1,
        };
      }
      return acc;
    },
    { w: 0, l: 0 },
  );
  return (clientTableWidth - defaultColumnWidth.w) / defaultColumnWidth.l;
};

export const getHeaderCommonPinningStyles = <T extends DefaultDataGrid>({
  header,
}: {
  header: Header<T, unknown>;
}): CSSProperties => {
  const isPinned = header.column.getIsPinned();

  return {
    left: isPinned === 'left' ? `${header.getStart('left')}px` : undefined,
    right:
      isPinned === 'right' ? `${header.column.getStart('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: header.getSize(),
    zIndex: isPinned ? 1 : 'auto',
  };
};

export const getColumnCommonPinningStyles = <T extends DefaultDataGrid>({
  column,
  colSpan = 1,
}: {
  column: Column<T>;
  colSpan?: number;
}): CSSProperties => {
  const isPinned = column.getIsPinned();

  return {
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize() * colSpan,
    zIndex: isPinned ? 1 : 'auto',
  };
};

export function getDefaultColumnWidth<T extends DefaultDataGrid>({
  clientWidth,
  columns,
  defaultColumnSizing,
  columnVisibility,
  defaultColumn,
}: {
  clientWidth: number;
  columns: Array<ColumnDef<T>>;
  defaultColumnSizing?: ColumnSizingState;
  columnVisibility?: VisibilityState;
  defaultColumn?: Partial<Pick<ColumnDef<T>, 'size' | 'minSize'>>;
}): ColumnSizingState {
  const minWidth = getMinColumnWidth({
    clientTableWidth: clientWidth,
    columns,
    columnVisibility,
    columnSizing: defaultColumnSizing,
  });
  const flatColumns = getFlatColumns(columns);

  return flatColumns.reduce<ColumnSizingState>((acc, column) => {
    // eslint-disable-next-line
    // @ts-ignore
    const key = column.id ?? column?.accessorKey;
    if (columnVisibility?.[key]) {
      if (defaultColumnSizing?.[key]) {
        acc[key] = defaultColumnSizing[key];
      } else if (column.size) {
        acc[key] = column.size;
      } else if (minWidth && defaultColumn?.size) {
        acc[key] =
          minWidth < defaultColumn.size ? defaultColumn.size : minWidth;
      } else {
        acc[key] = minWidth ?? 0;
      }
    }

    return acc;
  }, {});
}
