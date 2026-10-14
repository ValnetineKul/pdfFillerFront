import type { ForwardedRef, ReactElement } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { useId } from 'react-aria';
import type { RadioProps as AriaRadioProps } from 'react-aria-components';
import { Radio as AriaRadio } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { cx } from '#styled-system/css';
import type { RadioRecipeVariantProps } from '#styled-system/recipes';
import { radioIndicatorRecipe, radioRecipe } from '#styled-system/recipes';

export type RadioProps = AriaRadioProps & {
  description?: string;
} & DataAttributes;

export const RadioVariantContext = createContext<RadioRecipeVariantProps>({});

function Radio(
  props: RadioProps,
  ref: ForwardedRef<HTMLLabelElement>,
): ReactElement {
  const radioVariantContext = useContext(RadioVariantContext);
  const { children, description } = props;
  const classNames = radioRecipe(radioVariantContext);
  const descriptionId = useId();

  return (
    <div>
      <AriaRadio
        {...props}
        aria-describedby={description ? descriptionId : undefined}
        className={classNames.root}
        ref={ref}
      >
        {(indicatorRenderProps) => {
          const [indicatorVariantProps] =
            radioIndicatorRecipe.splitVariantProps(indicatorRenderProps);

          const indicatorClassNames = radioIndicatorRecipe(
            indicatorVariantProps,
          );
          return (
            <>
              <span className={cx(indicatorClassNames, classNames.indicator)} />
              {children}
            </>
          );
        }}
      </AriaRadio>
      {description && (
        <span id={descriptionId} className={classNames.description}>
          {description}
        </span>
      )}
    </div>
  );
}

const _Radio = /* #__PURE__ */ forwardRef(Radio);

export { _Radio as Radio };
