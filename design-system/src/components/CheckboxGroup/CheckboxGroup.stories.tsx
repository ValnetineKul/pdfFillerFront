import type { Meta, StoryObj } from '@storybook/react-vite';

import { checkboxRecipe } from '#styled-system/recipes';

import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  title: 'Forms/CheckboxGroup',
  args: {
    children: <Checkbox>Label</Checkbox>,
    description: 'Description of the element',
    'aria-label': 'Checkbox group',
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
  },
  argTypes: {
    description: { type: 'string' },
    errorMessage: { type: 'string' },
    size: {
      description: 'The size variations of the element',
      table: { defaultValue: { summary: 'md' }, category: 'Visual' },
      control: { type: 'select' },
      options: checkboxRecipe.variantMap.size,
    },
    necessityIndicator: {
      description: 'This show aster symbol when field is required',
      table: { category: 'State' },
      control: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  args: {},
};

export const MultipleCheckboxes: Story = {
  render: function Render(args) {
    const checkboxList = ['First', 'Second', 'Third', 'Fourth'];

    return (
      <CheckboxGroup
        {...args}
        label="Checkbox group"
        aria-label="check group list"
      >
        {checkboxList.map((item, index) => (
          <Checkbox value={String(index)} key={index}>
            {item}
          </Checkbox>
        ))}
      </CheckboxGroup>
    );
  },
};
