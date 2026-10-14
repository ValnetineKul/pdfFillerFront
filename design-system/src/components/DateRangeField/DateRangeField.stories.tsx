import { getLocalTimeZone } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useDateFormatter } from 'react-aria';
import type { DateValue } from 'react-aria-components';

import { Calendar } from '../Calendar';
import { DateRangeField } from './DateRangeField';
import { DateTimeRangeField } from './DateTimeRangeField';
import type { RangeValue } from './types';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Date & Time/DateRangeField',
  args: {},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DateRangeField>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<RangeValue<DateValue> | undefined>();
    const formatter = useDateFormatter({ dateStyle: 'full' });

    return (
      <div>
        <DateRangeField
          label="Created"
          isRequired
          value={value}
          necessityIndicator
          onChange={setValue}
          startAriaLabel="Start date"
          endAriaLabel="End date"
          validate={(date, type, compareValue) => {
            if (type === 'left') {
              return compareValue
                ? date?.compare(compareValue) > 0
                  ? 'I am invalid'
                  : null
                : null;
            }

            if (type === 'right') {
              return compareValue
                ? date?.compare(compareValue) < 0
                  ? 'I am invalid'
                  : null
                : null;
            }
          }}
        />
        <p>
          <p>Selected date:</p>
          <p>
            {value?.start
              ? formatter.format(value.start.toDate(getLocalTimeZone()))
              : ''}
            {' - '}
            {value?.end
              ? formatter.format(value.end.toDate(getLocalTimeZone()))
              : ''}
          </p>
        </p>
      </div>
    );
  },
};

export const DateTimeRangeFieldStory: Story = {
  render: function Render() {
    const [value, setValue] = useState<RangeValue<DateValue> | undefined>();
    const formatter = useDateFormatter({ dateStyle: 'full' });

    return (
      <div>
        <DateTimeRangeField
          label="Created"
          isRequired
          necessityIndicator
          value={value}
          onChange={setValue}
          granularity="second"
          validate={(date, type, compareValue) => {
            if (type === 'left') {
              return compareValue
                ? date?.compare(compareValue) > 0
                  ? 'I am invalid'
                  : null
                : null;
            }

            if (type === 'right') {
              return compareValue
                ? date?.compare(compareValue) < 0
                  ? 'I am invalid'
                  : null
                : null;
            }
          }}
        />
        <p>
          <p>Selected date:</p>
          <p>
            {value?.start
              ? formatter.format(value.start.toDate(getLocalTimeZone()))
              : ''}
            {' - '}
            {value?.end
              ? formatter.format(value.end.toDate(getLocalTimeZone()))
              : ''}
          </p>
        </p>
      </div>
    );
  },
};

DateTimeRangeFieldStory.storyName = 'DateTimeRangeField';
