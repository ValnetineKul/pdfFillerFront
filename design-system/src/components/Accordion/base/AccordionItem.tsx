import { Icon } from '@front/icons';
import type { ForwardedRef, ReactElement } from 'react';
import { createContext, forwardRef } from 'react';
import type {
  ContextValue,
  DisclosureProps as AriaDisclosureProps,
} from 'react-aria-components';
import {
  Button as AriaButton,
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  Heading,
  useContextProps,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { css } from '#styled-system/css';
import type { AccordionRecipeVariantProps } from '#styled-system/recipes';
import {
  accordionItemIndicatorRecipe,
  accordionRecipe,
} from '#styled-system/recipes';

export type AccordionItemProps = AccordionRecipeVariantProps &
  AriaDisclosureProps & {
    label: string;
  } & DataAttributes;

export const AccordionContext =
  createContext<ContextValue<AccordionRecipeVariantProps, HTMLDivElement>>(
    null,
  );

function AccordionItem(
  props: AccordionItemProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  [props, ref] = useContextProps(props, ref, AccordionContext);
  const [variantProps, otherProps] = accordionRecipe.splitVariantProps(props);
  const { label, children } = otherProps;
  const classNamesItem = accordionRecipe(variantProps);

  return (
    <AriaDisclosure ref={ref} {...otherProps} className={classNamesItem.item}>
      {(renderProps) => (
        <>
          <Heading>
            <AriaButton
              slot="trigger"
              className={classNamesItem.heading}
              isDisabled={renderProps.isDisabled}
            >
              {(buttonRenderProps) => {
                const indicatorClassNames = accordionItemIndicatorRecipe({
                  isDisabled: renderProps.isDisabled,
                  isHovered: buttonRenderProps.isHovered,
                  isFocusVisible: buttonRenderProps.isFocusVisible,
                });
                return (
                  <>
                    <span className={classNamesItem.label}>{label}</span>
                    <span className={indicatorClassNames}>
                      {renderProps.state.isExpanded ? (
                        <Icon
                          className={css({ iconSize: 'md' })}
                          name="general/minus-circle"
                        />
                      ) : (
                        <Icon
                          className={css({ iconSize: 'md' })}
                          name="general/plus-circle"
                        />
                      )}
                    </span>
                  </>
                );
              }}
            </AriaButton>
          </Heading>

          <AriaDisclosurePanel className={classNamesItem.content}>
            {typeof children === 'function' ? children(renderProps) : children}
          </AriaDisclosurePanel>
        </>
      )}
    </AriaDisclosure>
  );
}

/**
 * A AccordionItem is based on Disclosure component from RAC. AccordionItem provides structured composition for the label and content of an accordion item.
 */

const _AccordionItem = /* #__PURE__ */ forwardRef(AccordionItem);

export { _AccordionItem as AccordionItem };
