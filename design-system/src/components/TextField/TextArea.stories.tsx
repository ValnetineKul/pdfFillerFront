import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'Forms/TextArea',
  argTypes: {
    onInput: { action: true },
    errorMessage: { type: 'string' },
    isDisabled: { type: 'boolean' },
    isInvalid: { type: 'boolean' },
    placeholder: { type: 'string' },
    necessityIndicator: { type: 'boolean' },
  },
  args: {
    label: 'Label',
    description: 'Description text',
    placeholder: 'Placeholder',
    isRequired: true,
    errorMessage: 'Error',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {},
};
