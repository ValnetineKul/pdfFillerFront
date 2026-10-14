import { Icon } from '@front/icons';
import type { ForwardedRef, ReactElement } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { mergeProps, useId } from 'react-aria';
import type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
import { Checkbox as AriaCheckbox, Text } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { cx } from '#styled-system/css';
import type { CheckboxRecipeVariantProps } from '#styled-system/recipes';
import { checkboxControlRecipe, checkboxRecipe } from '#styled-system/recipes';

import type { AsteriskFieldProps } from '../Asterisk';
import { Asterisk } from '../Asterisk';

export type CheckboxProps = AriaCheckboxProps &
  AsteriskFieldProps &
  CheckboxRecipeVariantProps & {
    description?: string;
    errorMessage?: string;
    necessityIndicator?: boolean;
  } & DataAttributes;

export const CheckboxVariantContext = createContext<CheckboxRecipeVariantProps>(
  {},
);

function Checkbox(
  props: CheckboxProps,
  ref: ForwardedRef<HTMLLabelElement>,
): ReactElement {
  const checkboxVariantContext = useContext(CheckboxVariantContext);
  const [variantProps, otherProps] = checkboxRecipe.splitVariantProps(props);
  const {
    children,
    description,
    isInvalid,
    errorMessage,
    necessityIndicator,
    customAsterisk,
  } = otherProps;

  const mergedVariantProps = mergeProps(checkboxVariantContext, variantProps);
  const classNames = checkboxRecipe(mergedVariantProps);

  const descriptionId = useId();
  const errorId = useId();

  return (
    <div>
      <AriaCheckbox
        {...otherProps}
        aria-describedby={description ? descriptionId : undefined}
        aria-errormessage={isInvalid && errorMessage ? errorId : undefined}
        className={classNames.root}
        ref={ref}
      >
        {(renderProps) => {
          const controlClassNames = checkboxControlRecipe(renderProps);

          return (
            <div className={controlClassNames.root}>
              <div
                className={cx(controlClassNames.control, classNames.control)}
              >
                {renderProps.isSelected && (
                  <Icon
                    name={
                      renderProps.isIndeterminate
                        ? 'general/minus'
                        : 'general/check'
                    }
                    className={classNames.controlIcon}
                  />
                )}
              </div>

              {typeof children === 'function'
                ? children(renderProps)
                : children}
              {renderProps.isRequired && necessityIndicator && (
                <Asterisk>{customAsterisk}</Asterisk>
              )}
            </div>
          );
        }}
      </AriaCheckbox>
      <div className={classNames.content}>
        {description && (
          <Text
            id={descriptionId}
            slot="description"
            className={classNames.description}
          >
            {description}
          </Text>
        )}
        {isInvalid && errorMessage && (
          <Text id={errorId} className={classNames.error}>
            {errorMessage}
          </Text>
        )}
      </div>
    </div>
  );
}

const _Checkbox = /* #__PURE__ */ forwardRef(Checkbox);

export { _Checkbox as Checkbox };
