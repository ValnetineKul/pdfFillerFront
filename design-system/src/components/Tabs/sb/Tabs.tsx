/**
 * Эта обёртка нужно исключительно для того,
 * чтобы Storybook корректно вывел имя компонента и пропсы.
 * Наружу прямой экспорт из 'react-aria-components'
 */

import type { ReactElement } from 'react';
import type { TabsProps as AriaTabsProps } from 'react-aria-components';
import { Tabs as AriaTabs } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';

export type TabsProps = AriaTabsProps & DataAttributes;

export function Tabs(props: TabsProps): ReactElement {
  return <AriaTabs {...props} />;
}
