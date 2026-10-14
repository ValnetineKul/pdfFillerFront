import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { otpFieldRecipe } from '#styled-system/recipes';

import { OtpField } from './OtpField';

const meta: Meta<typeof OtpField> = {
  component: OtpField,
  title: 'Forms/OtpField',
  args: {
    maxLength: 4,
    label: 'Код подтверждения',
    description: 'Код подтвержден',
  },
  argTypes: {
    placeholder: {
      type: 'string',
    },
    errorMessage: {
      type: 'string',
    },
    isInvalid: {
      type: 'boolean',
    },
    maxLength: {
      type: 'number',
    },
    isRequired: {
      type: 'boolean',
    },
    size: {
      control: { type: 'radio' },
      options: otpFieldRecipe.variantMap.size,
    },
    pushPasswordManagerStrategy: {
      control: { type: 'radio' },
      options: ['increase-width', 'none'],
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

type Story = StoryObj<typeof OtpField>;

export const Default: Story = {
  render: function Render(args) {
    const [inputValue, setInputValue] = useState<string>('');

    return (
      <div style={{ width: '350px' }}>
        <OtpField
          {...args}
          aria-label="otp-field"
          value={inputValue}
          onChange={(value) => setInputValue(value)}
        />
      </div>
    );
  },
};
