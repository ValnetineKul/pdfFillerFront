import type { Meta, StoryObj } from '@storybook/react-vite';

import { linkRecipe } from '#styled-system/recipes';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Navigation/Link',
  args: {
    children: 'Link',
    colorScheme: 'primary',
    size: 'md',
    isDisabled: false,
    className: '',
  },
  argTypes: {
    onPress: { action: true },
    colorScheme: {
      control: { type: 'select' },
      options: linkRecipe.variantMap.colorScheme,
    },
    size: {
      control: { type: 'select' },
      options: linkRecipe.variantMap.size,
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {},
};

export const ColorSchemes: Story = {
  render: (args) => (
    <>
      {linkRecipe.variantMap.colorScheme.map((colorScheme, index) => (
        <Link {...args} colorScheme={colorScheme} key={index}>
          {colorScheme}
        </Link>
      ))}
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      {linkRecipe.variantMap.size.map((size, index) => {
        return (
          <Link {...args} size={size} key={index}>
            {size}
          </Link>
        );
      })}
    </>
  ),
};

export const States: Story = {
  args: { isDisabled: true },
};
