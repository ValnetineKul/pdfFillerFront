import type { ReactElement } from 'react';
import type { TableHeaderProps } from 'react-aria-components';
import {
  Collection,
  TableHeader as AriaTableHeader,
  useTableOptions,
} from 'react-aria-components';

import { Checkbox } from '../Checkbox';
import { Column } from './Column';

export function TableHeader<T extends object>(
  props: TableHeaderProps<T>,
): ReactElement {
  const { columns, children } = props;
  const { selectionBehavior, selectionMode } = useTableOptions();

  return (
    <AriaTableHeader>
      {selectionBehavior === 'toggle' && (
        <Column>
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaTableHeader>
  );
}
