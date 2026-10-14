import type { ReactElement } from 'react';
import { useContext } from 'react';
import { mergeProps } from 'react-aria';
import type { SeparatorProps as AriaSeparatorProps } from 'react-aria-components';
import {
  Separator as AriaSeparator,
  SeparatorContext,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { css, cx } from '#styled-system/css';
import { separatorRecipe } from '#styled-system/recipes';
import type { SpacingToken } from '#styled-system/tokens';

const separatorClasses = separatorRecipe();

export type SeparatorProps = AriaSeparatorProps & {
  spacing?: SpacingToken;
} & DataAttributes;

export function Separator(props: SeparatorProps): ReactElement {
  const contextProps = useContext(SeparatorContext);
  const { spacing, ...otherProps } = mergeProps(contextProps, props);

  return (
    <AriaSeparator
      {...otherProps}
      className={cx(
        separatorClasses,
        otherProps.className,
        css(
          otherProps.orientation === 'vertical'
            ? { marginInline: spacing }
            : { marginBlock: spacing },
        ),
      )}
    />
  );
}
