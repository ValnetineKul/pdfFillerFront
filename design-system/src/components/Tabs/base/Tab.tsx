import type { ForwardedRef, ReactElement } from 'react';
import { createContext, forwardRef } from 'react';
import type { ContextValue, TabProps } from 'react-aria-components';
import { Tab as AriaTab, useContextProps } from 'react-aria-components';

type ExtendedTabProps = TabProps & {
  'data-scrollable'?: boolean;
};

export const TabContext =
  createContext<ContextValue<ExtendedTabProps, HTMLDivElement>>(null);

function Tab(props: TabProps, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  [props, ref] = useContextProps(props, ref, TabContext);

  return <AriaTab ref={ref} {...props} />;
}

/**
 * A Tab provides a title for an individual item within a TabList.
 */
const _Tab = /* #__PURE__ */ forwardRef(Tab);

export { _Tab as Tab };
export type { TabProps } from 'react-aria-components';
