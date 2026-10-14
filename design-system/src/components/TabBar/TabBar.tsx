import { type ReactElement } from 'react';
import type { TabListProps } from 'react-aria-components';
import { TabList } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import { tabBarRecipe } from '#styled-system/recipes';

import { TabContext } from '../Tabs';

export type TabBarProps<T extends object> = TabListProps<T> & DataAttributes;

export function TabBar<T extends object>(props: TabBarProps<T>): ReactElement {
  const tabBarClasses = tabBarRecipe();

  return (
    <TabContext.Provider value={{ className: tabBarClasses.item }}>
      <TabList<T> {...props} className={tabBarClasses.list} />
    </TabContext.Provider>
  );
}
