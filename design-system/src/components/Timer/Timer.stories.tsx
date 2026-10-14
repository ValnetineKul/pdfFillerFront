import type { Meta, StoryObj } from '@storybook/react-vite';

import { timerRecipe } from '#styled-system/recipes';

import { Timer } from './Timer';

const now = Math.floor(Date.now() / 1000);
const oneYearOneMonthAhead = now + (365 + 30 + 24) * 24 * 60 * 60 + 8 * 60 * 60;

const meta: Meta<typeof Timer> = {
  component: Timer,
  title: 'Date & Time/Timer',
  args: {
    time: oneYearOneMonthAhead,
    variant: 'text',
    transparent: false,
    showDay: true,
    showSecond: true,
    showHour: true,
    showMinute: true,
    showMonth: true,
    showYear: true,
    granularity: 'years',
    timeZone: 'Europe/Moscow',
    translation: {
      years: 'years',
      months: 'months',
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      seconds: 'seconds',
    },
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: timerRecipe.variantMap.variant,
    },
    transparent: {
      control: { type: 'boolean' },
    },
    timeZone: {
      control: { type: 'text' },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Timer>;

export const Default: Story = {
  args: {
    time: now + 360000,
  },
};

export const WithDateNow: Story = {
  args: {
    dateNow: now,
    time: now + 3600,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
      }}
    >
      {timerRecipe.variantMap.variant.map((variant) => (
        <Timer key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
};
