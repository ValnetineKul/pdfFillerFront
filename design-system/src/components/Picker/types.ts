import type { ReactElement } from 'react';
import type { GroupBase, Props } from 'react-select5';

import type { DataAttributes } from '#shared/types';

export type CustomSelectProps = {
  isInvalid?: boolean;
  isFixed?: boolean;
  maxMenuHeight?: number;
  multiSelectedItemsLimit?: number;
  translations?: {
    noOption?: string;
    clearValues?: string;
  };
  contentStart?: ReactElement;
} & DataAttributes;

export type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group> & CustomSelectProps & DataAttributes;
