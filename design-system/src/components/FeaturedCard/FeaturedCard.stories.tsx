import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { GridList, GridListItem } from 'react-aria-components';

import { grid } from '#styled-system/patterns';

import { FeaturedCard } from './FeaturedCard';

const listOfFeaturedCards = [
  {
    id: 1,
    label: 'За первый депозит',
    description: 'Бонус на первый',
  },
  { id: 2, label: 'Спорт', description: 'Бонус на первый депозит до 100 UAH' },
  { id: 3, label: 'Казино', description: '200 фри спинов' },
  { id: 4, label: 'Отказаться' },
];

const meta: Meta<typeof FeaturedCard> = {
  component: FeaturedCard,
  title: 'Cards/FeaturedCard',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FeaturedCard>;

export const Default: Story = {
  args: {
    icon: <Icon name="general/check" />,
    label: 'Featured card',
    description: 'Feature card description text',
  },
};

export const WithoutIcon: Story = {
  args: {
    label: 'Featured card',
  },
};

export const ListOfCards: Story = {
  args: {},
  render: function Render() {
    return (
      <GridList
        aria-label="featured-card-list"
        className={grid({ gap: 2 })}
        selectionMode="single"
        selectionBehavior="replace"
        defaultSelectedKeys={[1]}
        disallowEmptySelection
        items={listOfFeaturedCards}
      >
        {(item) => (
          <GridListItem textValue={item.label}>
            {(itemProps) => (
              <FeaturedCard
                {...itemProps}
                {...item}
                icon={<Icon name="general/check" />}
              />
            )}
          </GridListItem>
        )}
      </GridList>
    );
  },
};
