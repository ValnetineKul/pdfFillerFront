import type { ReactElement } from 'react';
import type { RowProps } from 'react-aria-components';
import {
  Button,
  Collection,
  Row as AriaRow,
  useTableOptions,
} from 'react-aria-components';

import { tableRecipe } from '#styled-system/recipes';

import { Checkbox } from '../Checkbox';
import { Cell } from './Cell';

export function Row<T extends object>(props: RowProps<T>): ReactElement {
  const { id, columns, children, ...otherProps } = props;
  const classNames = tableRecipe();
  const { selectionBehavior, allowsDragging } = useTableOptions();
  return (
    <AriaRow id={id} {...otherProps} className={classNames.row}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  );
}
