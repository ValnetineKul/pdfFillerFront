import type { Meta, StoryObj } from '@storybook/react-vite';
import { RemoveButton } from 'src/index';

import { wrap } from '#styled-system/patterns';
import { removeButtonRecipe } from '#styled-system/recipes';

const meta: Meta<typeof RemoveButton> = {
  component: RemoveButton,
  title: 'Buttons/RemoveButton',
  args: {
    colorScheme: 'grayLight',
    'aria-label': 'default-icon-button',
  },
  argTypes: {
    colorScheme: {
      control: { type: 'select' },
      options: removeButtonRecipe.variantMap.colorScheme,
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

type Story = StoryObj<typeof RemoveButton>;

export const Default: Story = {
  args: {},
};

export const ColorSchemes: Story = {
  render: (args) => (
    <>
      {removeButtonRecipe.variantMap.colorScheme.map((colorScheme, index) => (
        <div key={index}>
          <RemoveButton
            {...args}
            colorScheme={colorScheme}
            aria-label={colorScheme}
          />
          <p>{colorScheme}</p>
        </div>
      ))}
    </>
  ),
};
export const Size: Story = {
  render: (args) => (
    <>
      {removeButtonRecipe.variantMap.size.map((size, index) => (
        <div key={index}>
          <RemoveButton {...args} size={size} aria-label={size} />
          <p>{size}</p>
        </div>
      ))}
    </>
  ),
};
