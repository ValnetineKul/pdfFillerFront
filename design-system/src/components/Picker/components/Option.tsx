import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import type { GroupBase, OptionProps } from 'react-select5';
import { components } from 'react-select5';

import { pickerRecipe } from '#styled-system/recipes';

export function Option<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ innerProps, ...props }: OptionProps<Option, IsMulti, Group>): ReactElement {
  const { isFocused, isDisabled, isSelected, children } = props;

  const classes = pickerRecipe();

  return (
    <components.Option
      className={classes.option}
      {...props}
      innerProps={{
        ...innerProps,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        'data-focused': isFocused,
        'data-selected': isSelected,
        ...(isDisabled && { 'data-disabled': isDisabled }),
      }}
    >
      <div className={classes.optionText}>{children}</div>
      {isSelected && (
        <Icon name="general/check" className={classes.selectedIndicator} />
      )}
    </components.Option>
  );
}
