import type { ColumnSizingState } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { ForwardedRef, ReactElement } from 'react';
import {
  createContext,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import type { DataGridRecipeVariantProps } from '#styled-system/recipes';
import { dataGridRecipe } from '#styled-system/recipes';

import { Cell, Column, FooterColumn, VirtualizeBody } from './components';
import { getFlatColumns, getMinColumnWidth } from './helpers';
import { useScrollbarWidth } from './hooks';
import type { DataGridProps, DefaultDataGrid } from './types';

type DataGridVariant = Required<
  Pick<DataGridRecipeVariantProps, 'size' | 'border'>
>;

const defaultVariant: DataGridVariant = {
  size: 'sm',
  border: 'full',
};

export const DataGridContext = createContext<
  DataGridVariant & {
    virtualize: boolean;
  }
>({
  ...defaultVariant,
  virtualize: false,
});

function _DataGrid<T extends DefaultDataGrid>(
  {
    data,
    columns,
    defaultColumn = {
      minSize: 100,
    },
    clientTableWidth,
    clientTableHeight = 500,
    virtualize = false,
    children,
    size,
    border,
    enableColumnPinning = false,
    enableRowPinning = false,
    enableColumnResizing = false,
    ...props
  }: DataGridProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarWidth = useScrollbarWidth(true);

  useImperativeHandle(
    ref,
    () => tableContainerRef.current as HTMLDivElement,
    [],
  );

  const minColumnWidth = useMemo(() => {
    if (clientTableWidth) {
      return getMinColumnWidth({
        columns,
        clientTableWidth,
        columnVisibility: props.state?.columnVisibility,
        columnSizing: props.state?.columnSizing,
      });
    }
    if (!clientTableWidth && tableContainerRef?.current) {
      const { clientWidth, scrollWidth } = tableContainerRef.current;
      return getMinColumnWidth({
        columns,
        clientTableWidth:
          clientWidth -
          (scrollWidth > Math.round(clientWidth) ? scrollbarWidth : 0),
        columnVisibility: props.state?.columnVisibility,
        columnSizing: props.state?.columnSizing,
      });
    }
  }, [clientTableWidth, scrollbarWidth, tableContainerRef?.current, columns]);

  const flatColumns = getFlatColumns(columns);
  const initialSizes = flatColumns.reduce<ColumnSizingState>((acc, column) => {
    // eslint-disable-next-line
    // @ts-ignore
    const key: string = column.id ?? column?.accessorKey;
    if (column.size) {
      acc[key] = column.size;
    } else if (minColumnWidth && defaultColumn?.size) {
      acc[key] =
        minColumnWidth < defaultColumn.size
          ? defaultColumn.size
          : minColumnWidth;
    } else {
      acc[key] = minColumnWidth ?? 0;
    }
    return acc;
  }, {});

  const table = useReactTable<T>({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    enableRowPinning,
    enableColumnPinning,
    enableColumnResizing,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    ...props,
    onColumnSizingChange: (updater) => {
      const state = {
        ...props.state?.columnSizing,
        ...(typeof updater === 'function'
          ? updater(props.state?.columnSizing ?? {})
          : updater),
      };

      Object.entries(state).forEach(([colIndex, colWidth]) => {
        state[colIndex] = Math.max(colWidth, defaultColumn?.minSize ?? 0);
      });

      props.onColumnSizingChange?.(state);
    },
    state: {
      ...props.state,
      columnSizing: {
        ...initialSizes,
        ...props.state?.columnSizing,
      },
    },
  });

  const { rows } = table.getRowModel();

  const classes = dataGridRecipe({
    size: size ?? defaultVariant.size,
    border: border ?? defaultVariant.border,
  });

  return (
    <DataGridContext.Provider
      value={{
        size: size ?? defaultVariant.size,
        border: border ?? defaultVariant.border,
        virtualize,
      }}
    >
      <div
        ref={tableContainerRef}
        className={classes.wrapper}
        style={{
          height: virtualize ? clientTableHeight : 'auto',
        }}
      >
        <table className={classes.table} data-is-virtualize={virtualize}>
          <thead className={classes.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={classes.row}>
                {headerGroup.headers.map((header, index) => (
                  <Column key={index} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          {virtualize ? (
            <VirtualizeBody rows={rows} tableContainerRef={tableContainerRef} />
          ) : (
            <tbody className={classes.tbody}>
              {rows.map((row) => {
                return (
                  <tr key={row.id} className={classes.row}>
                    {row.getVisibleCells().map((cell, index) => {
                      return <Cell key={index} cell={cell} />;
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}

          <tfoot className={classes.tfoot}>
            {table.getFooterGroups().map((footerGroup) => {
              const hasFooter = footerGroup.headers.some(
                (header) =>
                  typeof header.column.columnDef.footer !== 'undefined',
              );
              return (
                <tr
                  key={footerGroup.id}
                  className={classes.row}
                  hidden={!hasFooter}
                  aria-hidden={!hasFooter}
                >
                  {footerGroup.headers.map((header, index) => (
                    <FooterColumn key={index} header={header} />
                  ))}
                </tr>
              );
            })}
          </tfoot>
        </table>
      </div>
      {typeof children === 'function'
        ? children({
            tableState: table.getState(),
            pagination: {
              setPageSize: table.setPageSize,
              setPageIndex: table.setPageIndex,
              nextPage: table.nextPage,
              previousPage: table.previousPage,
            },
          })
        : children}
    </DataGridContext.Provider>
  );
}

export const DataGrid = forwardRef(_DataGrid) as <T extends DefaultDataGrid>(
  props: DataGridProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof _DataGrid>;
