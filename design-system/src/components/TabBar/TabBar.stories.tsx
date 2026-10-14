import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Key } from 'react-aria-components';
import { action } from 'storybook/actions';
import { useArgs } from 'storybook/preview-api';

import type { TabsProps } from '../Tabs/sb/Tabs';
import { Tabs } from '../Tabs/sb/Tabs';
import { ITEMS } from './sb/mock';
import { TabBar } from './TabBar';
import { TabBarItem } from './TabBarItem';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Navigation/TabBar',
  args: {},
  argTypes: {
    selectedKey: {
      type: 'string',
    },
  },
  render: function Render(args) {
    const [{ selectedKey }, updateArgs] = useArgs<TabsProps>();

    /**
     * В реальном приложении это может быть функция навигации из роутера
     */
    function navigate(key: Key): void {
      action('onSelectionChange')(key);
      updateArgs({ selectedKey: key });
    }

    return (
      <Tabs {...args} selectedKey={selectedKey} onSelectionChange={navigate}>
        <TabBar items={ITEMS}>
          {(item) => <TabBarItem {...item} id={item.url ?? item.action} />}
        </TabBar>
      </Tabs>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {},
};
