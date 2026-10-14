import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import { components, type GroupBase, type MenuListProps } from 'react-select5';

import { css, cx } from '#styled-system/css';
import { scrollable } from '#styled-system/patterns';
import { pickerRecipe } from '#styled-system/recipes';

import { useSelect } from '../Picker';

export function MenuList<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: MenuListProps<Option, IsMulti, Group>): ReactElement {
  const { translations } = useSelect();
  const { isMulti, clearValue, children, getValue, ...otherProps } = props;
  const classes = pickerRecipe();

  const selectedQuantity = getValue().length;

  const handleRemoveValue = (): void => {
    clearValue();
  };

  return (
    <components.MenuList
      {...otherProps}
      clearValue={clearValue}
      getValue={getValue}
      isMulti={isMulti}
      className={cx(classes.menuList, scrollable({ direction: 'vertical' }))}
    >
      {isMulti && selectedQuantity > 0 && (
        <div
          className={cx(classes.option, classes.optionClear)}
          onClick={handleRemoveValue}
        >
          <Icon name="general/x-close" className={css({ iconSize: 'md' })} />
          {translations?.clearValues}
        </div>
      )}
      {children}
    </components.MenuList>
  );
}
