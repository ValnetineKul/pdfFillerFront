import type { ReactElement } from 'react';
import type { GroupProps } from 'react-aria-components';
import { ButtonContext, Group } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { ButtonRecipeVariantProps } from '#styled-system/recipes';
import { buttonGroupRecipe, buttonRecipe } from '#styled-system/recipes';

import { ButtonVariantContext } from '../shared';

export type ButtonGroupProps = GroupProps &
  ButtonRecipeVariantProps &
  DataAttributes;

export function ButtonGroup(props: ButtonGroupProps): ReactElement {
  const [variantProps, otherProps] = buttonRecipe.splitVariantProps(props);
  const classNames = buttonGroupRecipe(variantProps);

  return (
    <ButtonContext.Provider
      value={{
        isDisabled: otherProps.isDisabled,
        className: classNames.button,
      }}
    >
      <ButtonVariantContext.Provider value={variantProps}>
        <Group {...otherProps} className={classNames.root}>
          {otherProps.children}
        </Group>
      </ButtonVariantContext.Provider>
    </ButtonContext.Provider>
  );
}
