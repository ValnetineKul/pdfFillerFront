import type {
  AccessorColumnDef,
  CellContext,
  ColumnDefBase,
  ColumnSizingState,
  DisplayColumnDef,
  HeaderContext,
  IdIdentifier,
  RowData,
  StringHeaderIdentifier,
  TableOptions,
  TableState,
  Updater,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';

import type { DataAttributes } from '#shared/types';
import type { DataGridRecipeVariantProps } from '#styled-system/recipes';

export type DefaultDataGrid = Record<string, unknown>;
export type DataGridRenderProps = {
  tableState: TableState;
  pagination: {
    setPageSize: (updater: Updater<number>) => void;
    setPageIndex: (updater: Updater<number>) => void;
    nextPage: () => void;
    previousPage: () => void;
  };
};

type TableColumnDef<TData extends RowData, TValue = unknown> = {
  isNumericField?: boolean;
  headerClassName?: string | ((props: HeaderContext<TData, TValue>) => string);
  headerTooltip?: string | ((props: HeaderContext<TData, TValue>) => any);
  headerInfoTooltip?: string | ((props: HeaderContext<TData, TValue>) => any);
  cellClassName?: string | ((props: CellContext<TData, TValue>) => string);
  cellTooltip?: string | ((props: CellContext<TData, TValue>) => any);
  cellInfoTooltip?: string | ((props: CellContext<TData, TValue>) => any);
  footerClassName?: string | ((props: HeaderContext<TData, TValue>) => string);
};

type ColumnIdentifiers<TData extends RowData, TValue> =
  | IdIdentifier<TData, TValue>
  | StringHeaderIdentifier;

interface GroupColumnDefBase<TData extends RowData, TValue = unknown>
  extends ColumnDefBase<TData, TValue>, TableColumnDef<TData, TValue> {
  columns?: Array<ColumnDef<TData, any>>;
}

export type GroupColumnDef<
  TData extends RowData,
  TValue = unknown,
> = GroupColumnDefBase<TData, TValue> & ColumnIdentifiers<TData, TValue>;

export type DefaultColumnDef<TData extends RowData, TValue = unknown> =
  | DisplayColumnDef<TData, TValue>
  | GroupColumnDef<TData, TValue>
  | AccessorColumnDef<TData, TValue>;

export type ColumnDef<
  TData extends RowData,
  TValue = unknown,
> = DefaultColumnDef<TData, TValue> & TableColumnDef<TData, TValue>;

export interface DataGridProps<T extends DefaultDataGrid>
  extends
    Omit<TableOptions<T>, 'getCoreRowModel' | 'onColumnSizingChange'>,
    DataAttributes {
  children?: ReactNode | ((values: DataGridRenderProps) => ReactNode);
  clientTableWidth?: number;
  clientTableHeight?: number;
  virtualize?: boolean;
  size?: DataGridRecipeVariantProps['size'];
  border?: DataGridRecipeVariantProps['border'];
  onColumnSizingChange?: (state: ColumnSizingState) => void;
}
