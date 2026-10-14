import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Others/ProgressBar',
  component: ProgressBar,
  args: {
    percentage: 40,
    centerText: 'Active users',
    size: 'sm',
    showValue: true,
  },
  argTypes: {
    percentage: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Текущий процент прогресса',
    },
    showValue: {
      control: 'boolean',
      description: 'Показывать значение в процентах',
    },
    centerText: {
      control: 'text',
      description: 'Текст над значением в центре',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Размер прогресс-бара',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    percentage: 80,
    size: 'lg',
  },
};
