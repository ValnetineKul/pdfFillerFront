import { type ReactElement } from 'react';
import type { Key } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { tabBarRecipe } from '#styled-system/recipes';

import type { TabProps } from '../Tabs';
import { Tab } from '../Tabs';

export type TabBarItemRenderProps = {
  icon: ReactElement;
  label: string;
  subIcon?: boolean;
};

export type TabBarItemProps = TabProps &
  TabBarItemRenderProps & { id: Key } & DataAttributes;

export function TabBarItem(props: TabBarItemProps): ReactElement {
  const { icon, label, href, subIcon, ...tabProps } = props;
  const tabBarClasses = tabBarRecipe();
  return (
    <Tab {...tabProps} data-href={href}>
      {icon}
      {subIcon && <div className={tabBarClasses.subIcon}>{subIcon}</div>}
      <span>{label}</span>
    </Tab>
  );
}
