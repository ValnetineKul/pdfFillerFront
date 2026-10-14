import { Icon } from '@front/icons';
import type { Header } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { ReactElement, SyntheticEvent } from 'react';
import { useContext, useRef, useState } from 'react';
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
} from 'react-aria-components';

import { css, cx } from '#styled-system/css';
import { buttonRecipe, dataGridRecipe } from '#styled-system/recipes';

import { DataGridContext } from '../DataGrid';
import { getHeaderCommonPinningStyles } from '../helpers';
import type { ColumnDef, DefaultDataGrid } from '../types';

export function Column<T extends DefaultDataGrid>({
  header,
}: {
  header: Header<T, unknown>;
}): ReactElement {
  const context = useContext(DataGridContext);
  const classes = dataGridRecipe(context);
  const buttonStyles = buttonRecipe({
    size: 'sm',
    variant: 'outline',
    colorScheme: 'secondary',
    onlyIcon: true,
  });

  const isPinned = header.column.getIsPinned();
  const hasSort = header.column.getCanSort();
  const isResizing = header.column.getIsResizing();
  const { isNumericField, headerClassName, headerTooltip, headerInfoTooltip } =
    header.column.columnDef as ColumnDef<T>;
  const className =
    typeof headerClassName === 'function'
      ? headerClassName(header.getContext())
      : headerClassName;
  const tooltip =
    typeof headerTooltip === 'function'
      ? headerTooltip(header.getContext())
      : headerTooltip;
  const infoTooltip =
    typeof headerInfoTooltip === 'function'
      ? headerInfoTooltip(header.getContext())
      : headerInfoTooltip;

  const ref = useRef<HTMLSpanElement>(null);
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

  return (
    <th
      id={header.id}
      key={header.id}
      colSpan={header.colSpan}
      className={cx(classes.column, className)}
      data-resizing={isResizing}
      data-is-pin={Boolean(isPinned)}
      style={{
        userSelect: 'none',
        ...getHeaderCommonPinningStyles({
          header,
        }),
      }}
    >
      <div className={classes.columnWrapper}>
        <AriaTooltipTrigger isOpen={isOpen} onOpenChange={setOpen} delay={0}>
          <span
            ref={ref}
            className={classes.columnContent}
            onClick={
              hasSort ? header.column.getToggleSortingHandler() : undefined
            }
            onMouseEnter={tooltip ? handleMouseEnter : undefined}
            onMouseLeave={tooltip ? handleMouseLeave : undefined}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </span>
          {tooltip ? (
            <AriaTooltip
              triggerRef={ref}
              placement="bottom left"
              style={{
                minWidth: `${header.column.getSize()}px`,
                maxWidth: '180px',
              }}
              className={classes.tooltip}
            >
              <div className={classes.tooltipContent}>{tooltip}</div>
            </AriaTooltip>
          ) : null}
        </AriaTooltipTrigger>
        {infoTooltip ? (
          <div className={classes.infoIndicator}>{infoTooltip}</div>
        ) : null}
        {hasSort ? (
          <div
            className={classes.sortIndicator}
            onClick={
              hasSort ? header.column.getToggleSortingHandler() : undefined
            }
          >
            <Icon
              name={(() => {
                const sortedType = header.column.getIsSorted();

                if (sortedType === 'asc') {
                  return isNumericField ? 'arrows/arrow-up' : 'arrows/A-Z';
                }

                if (sortedType === 'desc') {
                  return isNumericField ? 'arrows/arrow-down' : 'arrows/Z-A';
                }

                return 'arrows/switch-vertical-02';
              })()}
              className={css({ iconSize: 'sm' })}
            />
          </div>
        ) : null}
        {!header.isPlaceholder && header.column.getCanPin() && (
          <>
            {!header.column.getIsPinned() ? (
              <button
                className={classes.pinButton}
                onClick={() => {
                  header.column.pin('left');
                }}
              >
                <Icon
                  name="general/pin-02"
                  className={css({ iconSize: 'sm' })}
                />
              </button>
            ) : null}
            {['left', 'right'].includes(
              header.column.getIsPinned() as string,
            ) ? (
              <button
                className={classes.pinButton}
                data-is-pin="true"
                onClick={() => {
                  header.column.pin(false);
                }}
              >
                <Icon
                  name="general/pin-01"
                  className={css({ iconSize: 'sm' })}
                />
              </button>
            ) : null}
          </>
        )}
        {header.column.getCanResize() ? (
          <div
            className={classes.resizer}
            data-resizing={isResizing}
            onDoubleClick={header.column.resetSize}
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
          >
            <div className={cx(buttonStyles, classes.resizerButton)}>
              <Icon
                name="arrows/chevron-selector-horizontal"
                className={css({ iconSize: 'xs' })}
              />
            </div>
          </div>
        ) : null}
      </div>
    </th>
  );
}
