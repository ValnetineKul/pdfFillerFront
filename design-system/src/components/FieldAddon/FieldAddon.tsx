import type { PropsWithChildren, ReactElement } from 'react';

import { cx } from '#styled-system/css';
import { textFieldRecipe } from '#styled-system/recipes';

/**
 * This component is a wrapper with custom styles for additional elements
 * passed as addons in the `contentStart` and `contentEnd` props in components TextField and NumberField
 */

export function FieldAddon(props: PropsWithChildren): ReactElement {
  const textFieldClasses = textFieldRecipe();
  return (
    <div
      className={cx(textFieldClasses.inputElement, textFieldClasses.addon)}
      aria-hidden="true"
    >
      {props.children}
    </div>
  );
}
