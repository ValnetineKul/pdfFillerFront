import type { ReactElement } from 'react';
import type { AriaButtonProps } from 'react-aria';
import { Button as AriaButton } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { tooltipButtonRecipe } from '#styled-system/recipes';

export type TooltipButtonProps = AriaButtonProps & {
  isInvalid?: boolean;
} & DataAttributes;

export function TooltipButton(props: TooltipButtonProps): ReactElement {
  const { children, isInvalid } = props;

  return (
    <AriaButton
      {...props}
      data-invalid={isInvalid}
      className={tooltipButtonRecipe()}
    >
      {children}
    </AriaButton>
  );
}
