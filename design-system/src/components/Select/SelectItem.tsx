import { Icon } from '@front/icons';
import type { PropsWithChildren, ReactElement } from 'react';
import type { ListBoxItemProps } from 'react-aria-components';
import { ListBoxItem } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { dropDownListItem } from '#styled-system/recipes';

export type SelectItemProps = PropsWithChildren<ListBoxItemProps> &
  DataAttributes;

export function SelectItem(props: SelectItemProps): ReactElement {
  const classes = dropDownListItem({ isDisabled: props.isDisabled });

  return (
    <ListBoxItem {...props} className={classes.root}>
      {({ isSelected }) => (
        <>
          <div className={classes.optionContent}>{props.children}</div>
          {isSelected && (
            <Icon
              name="general/check"
              className={classes.selectedItemIndication}
            />
          )}
        </>
      )}
    </ListBoxItem>
  );
}
