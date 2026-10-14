import type { Meta, StoryObj } from '@storybook/react-vite';

import { buttonRecipe } from '#styled-system/recipes';

import { ToggleButton } from './ToggleButton';

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  title: 'Buttons/ToggleButton',
  args: {
    children: 'ToggleButton',
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    isDisabled: false,
  },
  argTypes: {
    onPress: { action: true },
    variant: {
      control: { type: 'select' },
      options: buttonRecipe.variantMap.variant,
    },
    colorScheme: {
      control: { type: 'select' },
      options: buttonRecipe.variantMap.colorScheme,
    },
    size: {
      control: { type: 'select' },
      options: buttonRecipe.variantMap.size,
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
    isSelected: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.variant.map((variant, index) => (
        <ToggleButton {...args} variant={variant} key={index}>
          {variant}
        </ToggleButton>
      ))}
    </>
  ),
};

export const ColorSchemes: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.colorScheme.map((colorScheme, index) => (
        <ToggleButton {...args} colorScheme={colorScheme} key={index}>
          {colorScheme}
        </ToggleButton>
      ))}
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.size.map((size, index) => {
        return (
          <ToggleButton {...args} size={size} key={index}>
            {size}
          </ToggleButton>
        );
      })}
    </>
  ),
};

export const States: Story = {
  args: { isDisabled: true },
};
