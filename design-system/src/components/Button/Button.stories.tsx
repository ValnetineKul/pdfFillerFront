import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { buttonRecipe, glowPulseRecipe } from '#styled-system/recipes';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Buttons/Button',
  args: {
    children: 'Press me',
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    isDisabled: false,
    noWrap: false,
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
    noWrap: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.variant.map((variant, index) => (
        <Button {...args} variant={variant} key={index}>
          {variant}
        </Button>
      ))}
    </>
  ),
};

export const ColorSchemes: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <>
      {buttonRecipe.variantMap.colorScheme.map((colorScheme, index) => (
        <Button {...args} colorScheme={colorScheme} key={index}>
          {colorScheme}
        </Button>
      ))}
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.size.map((size, index) => {
        return (
          <Button {...args} size={size} key={index}>
            {size}
          </Button>
        );
      })}
    </>
  ),
};

export const States: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.variant.map((variant, index) => (
        <Button {...args} variant={variant} key={index} isDisabled>
          Disabled ({variant})
        </Button>
      ))}
    </>
  ),
};

export const Loading: Story = {
  render: function Render(args) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = (): void => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <Button {...args} onPress={handlePress} isPending={isLoading}>
        Click me
      </Button>
    );
  },
};

export const GlowPulseAnimation: Story = {
  render: (args) => (
    <Button {...args} className={glowPulseRecipe()}>
      Click me
    </Button>
  ),
};
