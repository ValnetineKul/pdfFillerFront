import type { Meta, StoryObj } from '@storybook/react-vite';

import { css } from '#styled-system/css';
import { dotRecipe } from '#styled-system/recipes';

import { Dot } from './Dot';

const meta: Meta<typeof Dot> = {
  component: Dot,
  title: 'Informative/Dot',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: dotRecipe.variantMap.size,
    },
    variant: {
      control: { type: 'radio' },
      options: dotRecipe.variantMap.variant,
    },
  },
  args: {
    size: 'md',
    variant: 'filled',
    className: css({ color: 'green.600' }),
  },
};

export default meta;

type Story = StoryObj<typeof Dot>;

export const Filled: Story = {
  args: { variant: 'filled' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Dot {...args} size="sm" />
      <Dot {...args} size="md" />
      <Dot {...args} size="lg" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Dot {...args} variant="filled" />
      <Dot {...args} variant="outline" />
    </div>
  ),
};
