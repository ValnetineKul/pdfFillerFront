import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { css } from '#styled-system/css';
import { wrap } from '#styled-system/patterns';
import { buttonRecipe } from '#styled-system/recipes';

import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Buttons/IconButton',
  args: {
    children: <Icon name="arrows/chevron-down" />,
    colorScheme: 'primary',
    size: 'md',
    variant: 'solid',
    isDisabled: false,
    'aria-label': 'default-icon-button',
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
  decorators: [
    (Story) => (
      <div className={wrap({ textAlign: 'center' })}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.variant.map((variant, index) => (
        <div key={index}>
          <IconButton {...args} variant={variant} aria-label={variant}>
            <Icon name="arrows/chevron-down" />
          </IconButton>
          <p>{variant}</p>
        </div>
      ))}
    </>
  ),
};

export const ColorSchemes: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <>
      {buttonRecipe.variantMap.colorScheme.map((colorScheme, index) => (
        <div key={index}>
          <IconButton
            {...args}
            colorScheme={colorScheme}
            aria-label={colorScheme}
          >
            <Icon name="arrows/chevron-down" />
          </IconButton>
          <p>{colorScheme}</p>
        </div>
      ))}
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.size.map((size, index) => (
        <div key={index}>
          <IconButton {...args} size={size} aria-label={size}>
            <Icon name="arrows/chevron-down" />
          </IconButton>
          <p>{size}</p>
        </div>
      ))}
    </>
  ),
};

export const States: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.variant.map((variant, index) => (
        <div key={index}>
          <IconButton
            {...args}
            variant={variant}
            aria-label={variant}
            isDisabled
          >
            <Icon name="arrows/chevron-down" />
          </IconButton>
          <p>Disabled ({variant})</p>
        </div>
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
      <IconButton
        {...args}
        onPress={handlePress}
        isPending={isLoading}
        aria-label="With loader"
      >
        <Icon name="general/zap" className={css({ iconSize: 'md' })} />
      </IconButton>
    );
  },
};
