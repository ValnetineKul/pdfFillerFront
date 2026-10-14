import type { Meta, StoryObj } from '@storybook/react-vite';

import { buttonRecipe } from '#styled-system/recipes';

import { ButtonLink } from './ButtonLink';

const meta: Meta<typeof ButtonLink> = {
  component: ButtonLink,
  title: 'Navigation/ButtonLink',
  args: {
    children: 'ButtonLink',
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
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ButtonLink>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.variant.map((variant, index) => (
        <ButtonLink {...args} variant={variant} key={index}>
          {variant}
        </ButtonLink>
      ))}
    </>
  ),
};

export const ColorSchemes: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.colorScheme.map((colorScheme, index) => (
        <ButtonLink {...args} colorScheme={colorScheme} key={index}>
          {colorScheme}
        </ButtonLink>
      ))}
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.size.map((size, index) => {
        return (
          <ButtonLink {...args} size={size} key={index}>
            {size}
          </ButtonLink>
        );
      })}
    </>
  ),
};

export const States: Story = {
  args: { isDisabled: true },
};
