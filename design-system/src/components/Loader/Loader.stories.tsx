import type { Meta, StoryObj } from '@storybook/react-vite';

import { loaderRecipe } from '#styled-system/recipes';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  component: Loader,
  args: {},
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: loaderRecipe.variantMap.size,
    },
    text: { type: 'string' },
  },
  title: 'Others/Loader',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: { text: 'Loading...' },
};
