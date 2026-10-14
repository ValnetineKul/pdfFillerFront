import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag as AriaTag } from 'react-aria-components';
import { useListData } from 'react-stately';
import { Badge, BadgeGroup, RemoveButton } from 'src/index';

const meta: Meta<typeof BadgeGroup> = {
  component: BadgeGroup,
  title: 'Collections/BadgeGroup',
  subcomponents: { Badge },
  args: {
    style: { gap: '16px' },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BadgeGroup>;

export const Default: Story = {
  args: {},
  render: function Render(args) {
    const list = useListData({
      initialItems: [
        { id: 1, name: 'News' },
        { id: 2, name: 'Travel' },
        { id: 3, name: 'Gaming' },
        { id: 4, name: 'Shopping' },
      ],
    });
    return (
      <BadgeGroup
        items={list.items}
        onRemove={(keys) => list.remove(...keys)}
        aria-label="list with remove button"
      >
        {(listItem) => (
          <AriaTag {...listItem} textValue={listItem.name}>
            <Badge {...args}>
              <RemoveButton slot="remove" />
              {listItem.name}
            </Badge>
          </AriaTag>
        )}
      </BadgeGroup>
    );
  },
};
