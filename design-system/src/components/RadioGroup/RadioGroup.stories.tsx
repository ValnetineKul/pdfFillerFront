import type { Meta, StoryObj } from '@storybook/react-vite';

import { radioRecipe } from '#styled-system/recipes';

import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  args: {},
  argTypes: {
    size: {
      description: 'The size variations of the element',
      table: { defaultValue: { summary: 'md' }, category: 'Visual' },
      control: { type: 'select' },
      options: radioRecipe.variantMap.size,
    },
    necessityIndicator: {
      description: 'This show aster symbol when field is required',
      table: { category: 'State' },
      control: { type: 'boolean' },
    },
    errorMessage: { type: 'string' },
  },
  title: 'Forms/RadioGroup',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {},
  render: function Render(args) {
    return (
      <RadioGroup
        {...args}
        label="Group label"
        description="Group description text"
      >
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </RadioGroup>
    );
  },
};

export const ItemDescription: Story = {
  args: {},
  render: function Render(args) {
    return (
      <RadioGroup {...args} label="Group label" size="sm">
        <Radio value="1">Option 1</Radio>
        <Radio value="2" description="Great text for description.">
          Option 2
        </Radio>
        <Radio value="3">Option 3</Radio>
      </RadioGroup>
    );
  },
};

export const ItemDisabled: Story = {
  args: {},
  render: function Render(args) {
    return (
      <RadioGroup
        {...args}
        label="Group label"
        description="Second item is disabled"
      >
        <Radio value="1">Option 1</Radio>
        <Radio value="2" isDisabled>
          Option 2
        </Radio>
        <Radio value="3">Option 3</Radio>
      </RadioGroup>
    );
  },
};

export const Error: Story = {
  args: {},
  render: function Render(args) {
    return (
      <RadioGroup
        {...args}
        label="Group label"
        errorMessage="...ooouch something went wrong"
        isInvalid
      >
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </RadioGroup>
    );
  },
};

export const WithoutLabel: Story = {
  args: {},
  render: function Render(args) {
    return (
      <RadioGroup {...args} aria-label="label text">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </RadioGroup>
    );
  },
};
