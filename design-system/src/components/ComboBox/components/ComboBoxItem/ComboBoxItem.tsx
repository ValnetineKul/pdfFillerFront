import { Icon } from '@front/icons';
import type { PropsWithChildren, ReactElement } from 'react';
import type { ListBoxItemProps } from 'react-aria-components';
import { ListBoxItem } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { dropDownListItem } from '#styled-system/recipes';

export type ComboBoxItemProps = PropsWithChildren<ListBoxItemProps> &
  DataAttributes;

export function ComboBoxItem(props: ComboBoxItemProps): ReactElement {
  const classNames = dropDownListItem();
  return (
    <ListBoxItem {...props} className={classNames.root}>
      {({ isSelected }) => (
        <>
          <div className={classNames.optionContent}>{props.children}</div>
          {isSelected && (
            <Icon
              name="general/check"
              className={classNames.selectedItemIndication}
            />
          )}
        </>
      )}
    </ListBoxItem>
  );
}
