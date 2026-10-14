import { Icon } from '@front/icons';
import type { Cell as DefaultCell } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { ReactElement, SyntheticEvent } from 'react';
import { useContext, useRef, useState } from 'react';
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
} from 'react-aria-components';

import { css, cx } from '#styled-system/css';
import { dataGridRecipe } from '#styled-system/recipes';

import { IconButton } from '../../IconButton';
import { DataGridContext } from '../DataGrid';
import { getColumnCommonPinningStyles } from '../helpers';
import type { ColumnDef, DefaultDataGrid } from '../types';

export function Cell<T extends DefaultDataGrid>({
  cell,
}: {
  cell: DefaultCell<T, unknown>;
}): ReactElement {
  const context = useContext(DataGridContext);
  const classes = dataGridRecipe(context);
  const isPinned = cell.column.getIsPinned();
  const { cellClassName, cellTooltip, cellInfoTooltip } = cell.column
    .columnDef as ColumnDef<T>;
  const className =
    typeof cellClassName === 'function'
      ? cellClassName(cell.getContext())
      : cellClassName;
  const tooltip =
    typeof cellTooltip === 'function'
      ? cellTooltip(cell.getContext())
      : cellTooltip;
  const infoTooltip =
    typeof cellInfoTooltip === 'function'
      ? cellInfoTooltip(cell.getContext())
      : cellInfoTooltip;
  const ref = useRef<HTMLSpanElement>(null);
  const copyContent = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleMouseEnter = (e: SyntheticEvent<HTMLSpanElement>): void => {
    const { scrollHeight, offsetHeight, scrollWidth, offsetWidth } =
      e.currentTarget;
    if (!(offsetHeight < scrollHeight || offsetWidth < scrollWidth)) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setOpen(true);
    }
  };

  const handleMouseLeave = (): void => {
    setOpen(false);
  };

  const copy = (): void => {
    const { current } = copyContent;
    if (current) {
      navigator.clipboard.writeText(current.innerText);
    }
  };

  return (
    <td
      id={cell.id}
      key={cell.id}
      className={cx(classes.cell, className)}
      data-resizing={cell.column.getIsResizing()}
      data-is-pin={Boolean(isPinned)}
      style={getColumnCommonPinningStyles({ column: cell.column })}
    >
      <AriaTooltipTrigger isOpen={isOpen} onOpenChange={setOpen} delay={0}>
        <span
          ref={ref}
          className={classes.cellContent}
          onMouseEnter={tooltip ? handleMouseEnter : undefined}
          onMouseLeave={tooltip ? handleMouseLeave : undefined}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
          {tooltip ? (
            <AriaTooltip
              triggerRef={ref}
              placement="bottom left"
              style={{
                minWidth: `${cell.column.getSize()}px`,
                maxWidth: '180px',
              }}
              className={classes.tooltip}
            >
              <div className={classes.tooltipContent} ref={copyContent}>
                {tooltip}
              </div>
              <div className={classes.tooltipButton}>
                <IconButton
                  size="sm"
                  variant="subtle"
                  colorScheme="secondary"
                  onPressStart={() => {
                    copy();
                  }}
                >
                  <Icon
                    className={css({ iconSize: 'md' })}
                    name="general/copy-01"
                  />
                </IconButton>
              </div>
            </AriaTooltip>
          ) : null}
        </span>
      </AriaTooltipTrigger>

      {infoTooltip ?? null}
    </td>
  );
}
