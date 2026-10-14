/**
 * Эта обёртка нужно исключительно для того,
 * чтобы Storybook корректно вывел имя компонента и пропсы.
 * Наружу прямой экспорт из 'react-aria-components'
 */

import { type ReactElement } from 'react';
import {
  TabPanel as AriaTabPanel,
  type TabPanelProps as AriaTabPanelProps,
} from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

export type TabPanelProps = AriaTabPanelProps & DataAttributes;

export function TabPanel(props: TabPanelProps): ReactElement {
  return <AriaTabPanel {...props} />;
}
