import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag as AriaTag } from 'react-aria-components';
import { useListData } from 'react-stately';

import { badgeRecipe } from '#styled-system/recipes';

import { BadgeGroup } from '../BadgeGroup';
import { RemoveButton } from '../RemoveButton';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Informative/Badge',
  args: {
    children: 'Badge',
    colorScheme: 'brand',
    size: 'md',
    customColor: '#3498db',
  },
  argTypes: {
    colorScheme: {
      control: { type: 'select' },
      options: badgeRecipe.variantMap.colorScheme,
    },
    size: {
      control: { type: 'select' },
      options: badgeRecipe.variantMap.size,
    },
    type: {
      control: { type: 'select' },
      options: badgeRecipe.variantMap.type,
    },
    border: {
      control: { type: 'select' },
      options: badgeRecipe.variantMap.border,
    },
    customColor: {
      control: { type: 'color' },
    },
  },

  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {},
  render: (args) => <Badge {...args}>Badge</Badge>,
};

export const TypeSchemes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      {badgeRecipe.variantMap.type.map((type, index) => (
        <Badge {...args} type={type} key={index}>
          {type}
        </Badge>
      ))}
    </div>
  ),
};

export const CustomColorScheme: Story = {
  args: {
    colorScheme: 'custom',
    customColor: '#3498db',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Badge {...args}>
        Custom Badge
        <Icon name="shapes/circle" size={6} />
      </Badge>
      <Badge {...args} customColor="#e91e63">
        Another Custom
      </Badge>
      <Badge {...args}>
        <RemoveButton slot="remove" colorScheme={args.colorScheme} />
        With button
      </Badge>
    </div>
  ),
};

export const Border: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      {badgeRecipe.variantMap.border.map((border, index) => (
        <Badge {...args} border={border} key={index}>
          {border}
        </Badge>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      {badgeRecipe.variantMap.size.map((size, index) => {
        return (
          <Badge key={index} {...args} size={size}>
            {size + ' size'}
          </Badge>
        );
      })}
    </>
  ),
};

export const BeforeSlot: Story = {
  render: (args) => (
    <Badge {...args}>
      <Icon name="shapes/circle" size={6} />
      {'After slot'}
    </Badge>
  ),
};

export const AfterSlot: Story = {
  render: (args) => (
    <Badge {...args}>
      {'After slot'}
      <Icon name="shapes/circle" size={6} />
    </Badge>
  ),
};

export const WithRemoveButton: Story = {
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
              <RemoveButton slot="remove" colorScheme={args.colorScheme} />
              {listItem.name}
            </Badge>
          </AriaTag>
        )}
      </BadgeGroup>
    );
  },
};

export const NestedBadge: Story = {
  render: (args) => (
    <Badge {...args}>
      <Badge {...args}>{'Nested badge'}</Badge>
      {'Badge'}
    </Badge>
  ),
};

export const TypeLabel: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {badgeRecipe.variantMap.colorScheme.map((color, index) => (
        <Badge {...args} type="label" colorScheme={color} key={index}>
          Label
        </Badge>
      ))}
    </div>
  ),
};
