import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { buttonRecipe } from '#styled-system/recipes';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  title: 'Buttons/ButtonGroup',
  args: {
    children: () => (
      <>
        <Button aria-label="Filter">
          <Icon name="general/filter-lines" />
          <span>Filter</span>
        </Button>
        <IconButton aria-label="Help">
          <Icon name="general/help-circle" />
        </IconButton>
        <IconButton aria-label="Open">
          <Icon name="arrows/chevron-down" />
        </IconButton>
      </>
    ),
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    isDisabled: false,
  },
  argTypes: {
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

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  args: {},
  render: (args) => (
    <>
      {buttonRecipe.variantMap.variant.map((variant, index) => (
        <ButtonGroup {...args} variant={variant} key={index} />
      ))}
    </>
  ),
};

export const ColorSchemes: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <>
      {buttonRecipe.variantMap.colorScheme.map((colorScheme, index) => (
        <ButtonGroup {...args} colorScheme={colorScheme} key={index} />
      ))}
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.size.map((size, index) => (
        <ButtonGroup {...args} size={size} key={index} />
      ))}
    </>
  ),
};

export const States: Story = {
  render: (args) => (
    <>
      {buttonRecipe.variantMap.variant.map((variant, index) => (
        <ButtonGroup {...args} variant={variant} key={index} isDisabled />
      ))}
    </>
  ),
};
