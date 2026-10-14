import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type {
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { useMemo, useRef, useState } from 'react';

import { css } from '#styled-system/css';
import { vstack } from '#styled-system/patterns';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../IconButton';
import { Pagination } from '../Pagination';
import { Select, SelectItem } from '../Select';
import { DataGrid } from './DataGrid';
import { getDefaultColumnWidth } from './helpers';
import { useClientWidthElement, useScrollbarWidth } from './hooks';
import type { Person } from './mock';
import { defaultColumns, defaultData, defaultGroupColumns } from './mock';

const meta: Meta<typeof DataGrid> = {
  component: DataGrid,
  title: 'Others/DataGrid',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        className={vstack({
          width: '1100px',
          maxWidth: '1100px',
        })}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

export const Default: Story = {
  render: function Render() {
    return <DataGrid<Person> data={defaultData} columns={defaultColumns} />;
  },
};

export const Grouping: Story = {
  render: function Render() {
    return (
      <DataGrid<Person> data={defaultData} columns={defaultGroupColumns} />
    );
  },
};

export const Virtualize: Story = {
  render: function Render() {
    const data: Array<Person> = [];
    for (let i = 0; i < 100; i++) {
      data.push(
        ...defaultData.map((x) => ({
          ...x,
        })),
      );
    }
    const defaultVisibleColumns = {
      select: true,
      firstName: true,
      lastName: true,
      age: true,
      visits: false,
      status: false,
      progress: true,
      actions: true,
    };
    const perPageList = [
      { id: 10, name: '10' },
      { id: 20, name: '20' },
      { id: 30, name: '30' },
      { id: 40, name: '40' },
      { id: 50, name: '50' },
    ];

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
      defaultVisibleColumns,
    );
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([
      'select',
      'firstName',
      'lastName',
      'age',
      'visits',
      'status',
      'progress',
      'actions',
    ]);
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
      left: ['select'],
      right: ['actions'],
    });
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const defaultColumnSizing = JSON.parse(
      localStorage.getItem('test-table') ?? '{}',
    );
    const [columnSizing, setColumnSizing] =
      useState<ColumnSizingState>(defaultColumnSizing);
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

    const { ref, clientWidth } = useClientWidthElement();
    const childRef = useRef<HTMLDivElement>(null);

    const offsetY = useMemo(() => {
      return ref?.current?.getBoundingClientRect()?.y;
    }, [ref?.current]);
    const clientTableHeight =
      window.innerHeight -
      (offsetY ?? 0) -
      (childRef?.current?.getBoundingClientRect()?.height ?? 0);
    const scrollbarWidth = useScrollbarWidth(true);

    return (
      <div
        style={{
          width: '1100px',
          maxWidth: '1100px',
        }}
      >
        <div>Visible columns</div>
        <div>
          <div
            className={css({
              display: 'flex',
              gap: '2',
            })}
          >
            {Object.keys(defaultVisibleColumns).map((name, index) => {
              return (
                <div
                  key={index}
                  className={css({
                    display: 'flex',
                    gap: '2',
                  })}
                >
                  <Checkbox
                    isSelected={columnVisibility[name]}
                    onChange={() => {
                      setColumnVisibility({
                        ...columnVisibility,
                        [name]: !columnVisibility[name],
                      });
                      setColumnSizing(
                        getDefaultColumnWidth({
                          clientWidth: clientWidth - scrollbarWidth,
                          columns: defaultColumns,
                          defaultColumnSizing,
                          columnVisibility: {
                            ...columnVisibility,
                            [name]: !columnVisibility[name],
                          },
                        }),
                      );
                    }}
                  >
                    {name}
                  </Checkbox>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={css({
            borderWidth: 'thin',
            borderColor: 'border.secondary',
            rounded: '3',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '3',
              paddingBlock: '3',
              paddingInline: '4',
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '2',
              })}
            >
              <div className={css({ textStyle: 'lg', fontWeight: 'bold' })}>
                Движение средств
              </div>
              <div>
                <Badge
                  size="sm"
                  colorScheme="grayLight"
                  aria-label={`${data.length} записей`}
                >
                  {data.length} записей
                </Badge>
              </div>
            </div>
            <div
              className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}
            >
              <IconButton
                size="sm"
                variant="outline"
                colorScheme="secondary"
                onPress={() => {
                  localStorage.removeItem('test-table');
                  setColumnSizing(
                    getDefaultColumnWidth({
                      clientWidth: clientWidth - scrollbarWidth,
                      columns: defaultColumns,
                      defaultColumnSizing: {},
                      columnVisibility,
                    }),
                  );
                }}
              >
                <Icon
                  name="layout/table-reset"
                  className={css({ iconSize: 'md' })}
                />
              </IconButton>
              <IconButton size="sm" variant="outline" colorScheme="secondary">
                <Icon
                  name="arrows/refresh-cw-01"
                  className={css({ iconSize: 'md' })}
                />
              </IconButton>
              <IconButton size="sm" variant="outline" colorScheme="secondary">
                <Icon
                  name="layout/table-settings"
                  className={css({ iconSize: 'md' })}
                />
              </IconButton>
              <Button size="sm" variant="outline" colorScheme="primary">
                <Icon
                  name="general/download-01"
                  className={css({ iconSize: 'md' })}
                />
                <span>.csv</span>
              </Button>
              <Button size="sm" variant="outline" colorScheme="primary">
                <Icon
                  name="general/download-01"
                  className={css({ iconSize: 'md' })}
                />
                <span>.xlsx</span>
              </Button>
              <ButtonGroup size="sm">
                <Button aria-label="Filter">
                  <Icon
                    name="general/filter-lines"
                    className={css({ iconSize: 'md' })}
                  />
                  <span>Фильтры</span>
                </Button>
                <IconButton isDisabled>
                  <Icon
                    name="arrows/chevron-down"
                    className={css({ iconSize: 'md' })}
                  />
                </IconButton>
              </ButtonGroup>
            </div>
          </div>
          <div>
            <DataGrid<Person>
              ref={ref}
              data={data}
              columns={defaultColumns}
              virtualize
              border="resizable" // Required by virtualize
              clientTableWidth={clientWidth}
              clientTableHeight={clientTableHeight}
              state={{
                pagination,
                columnSizing,
                columnVisibility,
                columnOrder,
                columnPinning,
                expanded,
                sorting,
                rowSelection,
              }}
              manualPagination
              enableColumnPinning
              enableColumnResizing
              onRowSelectionChange={setRowSelection}
              onPaginationChange={setPagination}
              onColumnVisibilityChange={setColumnVisibility}
              onColumnOrderChange={setColumnOrder}
              onColumnPinningChange={setColumnPinning}
              onExpandedChange={setExpanded}
              onSortingChange={setSorting}
              onColumnSizingChange={(state) => {
                localStorage.setItem('test-table', JSON.stringify(state));
                setColumnSizing(state);
              }}
            >
              {({
                pagination: {
                  setPageSize,
                  setPageIndex,
                  nextPage,
                  previousPage,
                },
              }) => (
                <div
                  ref={childRef}
                  className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBlock: '3',
                    paddingInline: '4',
                    gap: '2',
                  })}
                >
                  <div
                    className={css({
                      minWidth: '80px',
                      '& > div > button': {
                        maxHeight: '40px',
                      },
                    })}
                  >
                    <Select
                      selectedKey={pagination.pageSize}
                      items={perPageList}
                      onSelectionChange={(key) => {
                        setPageIndex(0);
                        setPageSize(Number(key));
                      }}
                    >
                      {(item) => (
                        <SelectItem id={item.id} textValue={item.name}>
                          {item.name}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                  <Pagination
                    {...pagination}
                    onPage={setPageIndex}
                    onNext={nextPage}
                    onPrevious={previousPage}
                    theme="secondary"
                    pageCount={pagination.pageSize}
                  />
                </div>
              )}
            </DataGrid>
          </div>
        </div>
      </div>
    );
  },
};
