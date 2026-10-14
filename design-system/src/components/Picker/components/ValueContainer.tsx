import type { ReactElement } from 'react';
import type { GroupBase, ValueContainerProps } from 'react-select5';
import { components } from 'react-select5';

import { pickerRecipe } from '#styled-system/recipes';

export function ValueContainer<
  Option,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  selectProps,
  innerProps,
  children,
  getValue,
  ...props
}: ValueContainerProps<Option, IsMulti, Group>): ReactElement {
  const classes = pickerRecipe();
  const selectedQuantity = getValue().length;

  return (
    <components.ValueContainer
      className={classes.valueContainer}
      {...props}
      selectProps={selectProps}
      innerProps={{
        ...innerProps,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        'data-is-multi': selectProps.isMulti,
        'data-selected': selectedQuantity > 0,
      }}
    >
      {children}
    </components.ValueContainer>
  );
}
