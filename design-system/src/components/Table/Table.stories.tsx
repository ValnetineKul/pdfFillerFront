import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableBody, TooltipTrigger } from 'react-aria-components';

import { Badge } from '../Badge';
import { Tooltip } from '../Tooltip';
import { TooltipButton } from '../TooltipButton';
import { Cell } from './Cell';
import { Column } from './Column';
import { Row } from './Row';
import { tableData, tableHeaders } from './sb/mock';
import { getRecordStatus } from './sb/utils';
import { Table } from './Table';
import { TableHeader } from './TableHeader';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Collections/Table',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    selectionMode: 'multiple',
    selectionBehavior: 'replace',
  },

  render: (args) => (
    <Table aria-label="Files" {...args}>
      <TableHeader columns={tableHeaders}>
        {(tableHeadersItems) => (
          <Column isRowHeader={tableHeadersItems.isRowHeader}>
            {tableHeadersItems.name}
          </Column>
        )}
      </TableHeader>
      <TableBody items={tableData}>
        {(item) => (
          <Row key={item.id}>
            {tableHeaders.map((column) => (
              <Cell key={column.id}>
                {column.id === 'transaction' ? (
                  <Badge colorScheme={getRecordStatus(item[column.id])}>
                    {item[column.id]}
                  </Badge>
                ) : column.id === 'id' ? (
                  <TooltipTrigger>
                    <TooltipButton>
                      <Icon name="general/copy-05" />
                    </TooltipButton>
                    <Tooltip>{item[column.id]}</Tooltip>
                  </TooltipTrigger>
                ) : (
                  item[column.id]
                )}
              </Cell>
            ))}
          </Row>
        )}
      </TableBody>
    </Table>
  ),
};

export const WithCheckbox: Story = {
  args: {
    selectionMode: 'multiple',
    selectionBehavior: 'toggle',
  },
  argTypes: {
    onRowAction: { action: true },
  },

  render: (args) => (
    <Table aria-label="Files" {...args}>
      <TableHeader columns={tableHeaders}>
        {(tableHeadersItems) => (
          <Column isRowHeader={tableHeadersItems.isRowHeader}>
            {tableHeadersItems.name}
          </Column>
        )}
      </TableHeader>
      <TableBody items={tableData}>
        {(item) => (
          <Row key={item.id}>
            {tableHeaders.map((column) => (
              <Cell key={column.id}>
                {column.id === 'transaction' ? (
                  <Badge colorScheme={getRecordStatus(item[column.id])}>
                    {item[column.id]}
                  </Badge>
                ) : column.id === 'id' ? (
                  <TooltipTrigger>
                    <TooltipButton>
                      <Icon name="general/copy-05" />
                    </TooltipButton>
                    <Tooltip>{item[column.id]}</Tooltip>
                  </TooltipTrigger>
                ) : (
                  item[column.id]
                )}
              </Cell>
            ))}
          </Row>
        )}
      </TableBody>
    </Table>
  ),
};
