import type { Meta, StoryObj } from '@storybook/react-vite';

import { markerRecipe } from '#styled-system/recipes';

import { Marker } from './Marker';

const meta: Meta<typeof Marker> = {
  component: Marker,
  args: {},
  argTypes: {
    text: { type: 'string' },
    type: {
      control: { type: 'radio' },
      options: markerRecipe.variantMap.type,
    },
  },
  title: 'Informative/Marker',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Marker>;

export const Dot: Story = {
  args: {
    type: 'dot',
  },
};

export const Counter: Story = {
  args: {
    text: '12',
    type: 'counter',
  },
};
