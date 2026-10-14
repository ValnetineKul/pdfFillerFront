import type { Meta, StoryObj } from '@storybook/react-vite';

import { SemiCircleProgressBar } from './SemiCircleProgressBar';

const meta: Meta<typeof SemiCircleProgressBar> = {
  title: 'Others/SemiCircleProgressBar',
  component: SemiCircleProgressBar,
  args: {
    currentValue: 80,
    maxValue: 200,
    showValue: true,
    textMode: 'percent',
    title: '',
    currency: '',
  },
  argTypes: {
    currentValue: {
      control: { type: 'number', min: 0 },
      description: 'Текущее значение',
    },
    maxValue: {
      control: { type: 'number', min: 0 },
      description: 'Максимальное значение',
    },
    minValue: {
      control: { type: 'number', min: 0 },
      description: 'Минимальное значение (опционально)',
    },
    showValue: {
      control: 'boolean',
      description: 'Отображать проценты',
    },
    textMode: {
      control: { type: 'select' },
      options: ['percent', 'value'],
      description:
        'Режим отображения текста внутри дуги (проценты или значение)',
    },
    title: {
      control: 'text',
      description: 'Заголовок в центре дуги',
    },
    currency: {
      control: 'text',
      description:
        'Валюта для значения, отображаемого внизу (для режима value)',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SemiCircleProgressBar>;

export const Row1: Story = {
  args: {
    currentValue: 80,
    maxValue: 200,
    textMode: 'percent',
    showValue: true,
    minValue: undefined,
    title: '',
  },
  render: (args) => (
    <div
      style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
    >
      <SemiCircleProgressBar {...args} size="xs" />
      <SemiCircleProgressBar {...args} size="sm" />
      <SemiCircleProgressBar {...args} size="md" />
      <SemiCircleProgressBar {...args} size="lg" />
    </div>
  ),
};

export const Row2: Story = {
  args: {
    currentValue: 80,
    maxValue: 200,
    textMode: 'percent',
    showValue: true,
    minValue: undefined,
    title: 'Active Users',
  },
  render: (args) => (
    <div
      style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
    >
      <SemiCircleProgressBar {...args} size="xs" />
      <SemiCircleProgressBar {...args} size="sm" />
      <SemiCircleProgressBar {...args} size="md" />
      <SemiCircleProgressBar {...args} size="lg" />
    </div>
  ),
};

export const Row3: Story = {
  args: {
    currentValue: 120,
    maxValue: 200,
    minValue: 80,
    textMode: 'value',
    showValue: true,
    currency: '',
    title: '',
  },
  render: (args) => (
    <div
      style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
    >
      <SemiCircleProgressBar {...args} size="xs" />
      <SemiCircleProgressBar {...args} size="sm" />
      <SemiCircleProgressBar {...args} size="md" />
      <SemiCircleProgressBar {...args} size="lg" />
    </div>
  ),
};

export const Row4: Story = {
  args: {
    currentValue: 120,
    maxValue: 200,
    minValue: 80,
    textMode: 'value',
    showValue: true,
    currency: 'USD',
    title: 'Revenue',
  },
  render: (args) => (
    <div
      style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
    >
      <SemiCircleProgressBar {...args} size="xs" />
      <SemiCircleProgressBar {...args} size="sm" />
      <SemiCircleProgressBar {...args} size="md" />
      <SemiCircleProgressBar {...args} size="lg" />
    </div>
  ),
};

export const WithoutMaxValue: Story = {
  args: {
    currentValue: 120,
    maxValue: 0,
    minValue: 200,
    textMode: 'percent',
    showValue: true,
    title: 'Без maxValue',
    currency: '',
  },
  render: (args) => (
    <div
      style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
    >
      <SemiCircleProgressBar {...args} size="xs" />
      <SemiCircleProgressBar {...args} size="sm" />
      <SemiCircleProgressBar {...args} size="md" />
      <SemiCircleProgressBar {...args} size="lg" />
    </div>
  ),
};
