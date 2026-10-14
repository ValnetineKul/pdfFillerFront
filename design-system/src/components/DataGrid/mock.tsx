import { Icon } from '@front/icons';
import { Tooltip, TooltipTrigger } from 'react-aria-components';

import { css } from '#styled-system/css';

import { Checkbox } from '../Checkbox';
import { IconButton } from '../IconButton';
import { TooltipButton } from '../TooltipButton';
import type { ColumnDef } from './types';

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export const defaultData: Array<Person> = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

export const defaultColumns: Array<ColumnDef<Person>> = [
  {
    header: ' ',
    headerClassName: () =>
      css({ borderRightColor: 'transparent', zIndex: '0 !important' }),
    columns: [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            isSelected={table.getIsAllRowsSelected()}
            isIndeterminate={table.getIsSomeRowsSelected()}
            onChange={(isSelected) => {
              table.getToggleAllRowsSelectedHandler()({
                target: { checked: isSelected },
              });
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <Checkbox
              isSelected={row.getIsSelected()}
              isDisabled={!row.getCanSelect()}
              isIndeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
        enableSorting: false,
        enablePinning: false,
        enableResizing: false,
        size: 46,
        minSize: 46,
        maxSize: 46,
      },
    ],
  },
  {
    header: 'Name 2',
    columns: [
      {
        accessorKey: 'firstName',
        headerClassName: () => css({ justifyContent: 'flex-end' }),
        cell: (info) => info.getValue(),
        cellTooltip: (info) => info.getValue(),
        cellClassName: () => css({ textAlign: 'right' }),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
        enablePinning: false,
      },
    ],
  },
  {
    header: 'Name 3',
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
        isNumericField: true,
        cellClassName: (context) => {
          if (context.row.original.age > 30) {
            return css({ backgroundColor: 'error.500', color: 'white' });
          } else {
            return css({ backgroundColor: 'green.500' });
          }
        },
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        headerTooltip: (header) => header.column.columnDef.header,
        headerInfoTooltip: (header) => (
          <TooltipTrigger delay={0}>
            <TooltipButton>
              <Icon
                name="general/help-circle"
                className={css({ iconSize: 'sm' })}
              />
            </TooltipButton>
            <Tooltip>
              <span
                className={css({
                  maxWidth: '240px',
                  display: 'inline-block',
                })}
              >
                {header.column.columnDef.header as string}
              </span>
            </Tooltip>
          </TooltipTrigger>
        ),
        cell: (info) => info.getValue(),
        cellTooltip: (info) => info.getValue(),
        cellInfoTooltip: (info) => {
          return (
            <TooltipTrigger delay={0}>
              <TooltipButton>
                <Icon
                  name="general/help-circle"
                  className={css({ iconSize: 'sm' })}
                />
              </TooltipButton>
              <Tooltip>
                <div
                  className={css({
                    maxWidth: '240px',
                    display: 'inline-block',
                  })}
                >
                  {info.getValue() as string}
                </div>
              </Tooltip>
            </TooltipTrigger>
          );
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Name 4',
    columns: [
      {
        id: 'actions',
        headerClassName: () => css({ backgroundColor: 'brand.300' }),
        header: 'Actions',
        cell: () => {
          return (
            <div className={css({ display: 'flex', gap: '1' })}>
              <IconButton size="sm" variant="subtle" colorScheme="secondary">
                <Icon
                  name="general/copy-01"
                  className={css({ iconSize: 'md' })}
                />
              </IconButton>
              <IconButton size="sm" variant="subtle" colorScheme="secondary">
                <Icon
                  name="general/download-01"
                  className={css({ iconSize: 'md' })}
                />
              </IconButton>
              <IconButton size="sm" variant="subtle" colorScheme="secondary">
                <Icon
                  name="general/filter-lines"
                  className={css({ iconSize: 'md' })}
                />
              </IconButton>
              <IconButton size="sm" variant="subtle" colorScheme="secondary">
                <Icon
                  name="arrows/chevron-down"
                  className={css({ iconSize: 'md' })}
                />
              </IconButton>
            </div>
          );
        },
        footerClassName: () => css({ backgroundColor: 'brand.300' }),
        footer: (props) => props.column.id,
        size: 190,
        maxSize: 190,
        enablePinning: false,
        enableResizing: false,
        enableSorting: false,
      },
    ],
  },
];

export const defaultGroupColumns: Array<ColumnDef<Person>> = [
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];
