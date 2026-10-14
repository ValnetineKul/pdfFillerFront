import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DateRangePicker } from 'react-aria-components';

import { Button } from '../Button';
import { Drawer, DrawerTrigger } from '../Drawer';
import { MultiMonthCalendar } from './MultiMonthCalendar';
import { MultiMonthCalendarPickerGroup } from './MultiMonthCalendarPicker';

const meta: Meta<typeof MultiMonthCalendar> = {
  component: MultiMonthCalendar,
  title: 'Date & Time/MultiMonthCalendar',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MultiMonthCalendar>;

export const Default: Story = {
  args: {},
  render: function Render() {
    return <MultiMonthCalendar visibleDuration={{ months: 3 }} />;
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: function Render() {
    return (
      <MultiMonthCalendar
        orientation="vertical"
        visibleDuration={{ months: 3 }}
      />
    );
  },
};

export const Picker: Story = {
  args: {},
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <DateRangePicker>
        <MultiMonthCalendarPickerGroup
          label="Период"
          groupProgress={{
            onClick: () => setIsOpen(true),
          }}
          {...args}
        />
        <DrawerTrigger defaultOpen={isOpen} onOpenChange={setIsOpen}>
          <Drawer
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            title="Период"
            position="bottom"
          >
            <MultiMonthCalendar
              orientation="vertical"
              visibleDuration={{ months: 6 }}
            />
            <Button>Применить</Button>
          </Drawer>
        </DrawerTrigger>
      </DateRangePicker>
    );
  },
};
