import { parseAbsoluteToLocal } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DateField } from './DateField';
import { DateTimeField } from './DateTimeField';

const meta: Meta<typeof DateTimeField> = {
  component: DateTimeField,
  title: 'Date & Time/DateField',
  args: {
    isRequired: false,
    necessityIndicator: false,
  },
  argTypes: {
    isDisabled: {
      control: { type: 'boolean' },
    },
    hideClearButton: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DateField>;

export const Default: Story = {
  args: { label: 'Birthday' },
  render: function Render(args) {
    return <DateField {...args} />;
  },
};

export const DateTimeFieldStory: Story = {
  render: function Render() {
    const [value, setValue] = useState(
      parseAbsoluteToLocal(new Date('05 October 2011 14:48 UTC').toISOString()),
    );
    return (
      <DateTimeField
        label="Created"
        isRequired
        necessityIndicator
        value={value}
        timeAriaLabel="Time"
        onChange={(dateValue) => dateValue && setValue(dateValue)}
      />
    );
  },
};

DateTimeFieldStory.storyName = 'DateTimeField';
