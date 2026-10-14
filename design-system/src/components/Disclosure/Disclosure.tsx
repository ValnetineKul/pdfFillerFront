import { Icon } from '@front/icons';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import type { DisclosureProps as AriaDisclosureProps } from 'react-aria-components';
import {
  Button as AriaButton,
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  Heading,
  Text,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { css, cx } from '#styled-system/css';
import { disclosureRecipe } from '#styled-system/recipes';

export type DisclosureProps = AriaDisclosureProps & {
  label: string;
  variant?: 'plain' | 'default';
  icon?: ReactElement<{ className?: string; slot?: string }>;
} & DataAttributes;

export function Disclosure(props: DisclosureProps): ReactElement {
  const { icon, label, children, variant = 'default' } = props;

  return (
    <AriaDisclosure {...props}>
      {(renderProps) => {
        const classNames = disclosureRecipe({
          isExpanded: renderProps.isExpanded,
          isDisabled: renderProps.isDisabled,
          variant,
        });

        return (
          <>
            <Heading level={3}>
              <AriaButton slot="trigger" className={classNames.trigger}>
                {icon &&
                  cloneElement(icon, {
                    ...icon.props,
                    className: cx(classNames.icon, icon.props.className),
                    slot: 'icon',
                  })}
                <Text className={classNames.label} slot="label">
                  {label}
                </Text>
                <span
                  slot="icon"
                  className={cx(classNames.icon, classNames.chevronIcon)}
                >
                  <Icon
                    name="arrows/chevron-down"
                    className={css({ iconSize: 'md' })}
                  />
                </span>
              </AriaButton>
            </Heading>
            <AriaDisclosurePanel className={classNames.description}>
              {typeof children === 'function'
                ? children(renderProps)
                : children}
            </AriaDisclosurePanel>
          </>
        );
      }}
    </AriaDisclosure>
  );
}
