import type { Meta, StoryObj } from '@storybook/react-vite';

import { wrap } from '#styled-system/patterns';
import { closeButtonRecipe } from '#styled-system/recipes';

import { CloseButton } from './CloseButton';

const meta: Meta<typeof CloseButton> = {
  component: CloseButton,
  title: 'Buttons/CloseButton',
  args: {
    'aria-label': 'close-button',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: closeButtonRecipe.variantMap.size,
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={wrap({ textAlign: 'center' })}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CloseButton>;

export const Default: Story = {
  args: {},
};

export const ColorSchemes: Story = {
  render: (args) => (
    <>
      {closeButtonRecipe.variantMap.size.map((size, index) => (
        <div key={index}>
          <CloseButton {...args} size={size} aria-label={size} />
          <p>{size}</p>
        </div>
      ))}
    </>
  ),
};
