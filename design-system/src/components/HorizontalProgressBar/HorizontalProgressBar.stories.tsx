import type { Meta, StoryObj } from '@storybook/react-vite';

import { horizontalProgressBarRecipe } from '#styled-system/recipes';

import { HorizontalProgressBar } from './HorizontalProgressBar';

const meta: Meta<typeof HorizontalProgressBar> = {
  title: 'Others/HorizontalProgressBar',
  component: HorizontalProgressBar,
  args: {
    current: '40',
    min: '50',
    max: '100',
    size: 'xs',
    title: '',
    value: '',
  },
  argTypes: {
    current: {
      control: { type: 'text' },
      description: 'Текущее значение',
    },
    min: {
      control: { type: 'text' },
      description: 'Минимальное значение',
    },
    max: {
      control: { type: 'text' },
      description: 'Максимальное значение (опционально)',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Размер прогресс-бара',
    },
    title: {
      control: 'text',
      description: 'Заголовок (опционально)',
    },
    value: {
      control: 'text',
      description: 'Значение (опционально)',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof HorizontalProgressBar>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '400px',
      }}
    >
      <div>
        <div style={{ marginBottom: '8px' }}>С минимальным значением</div>
        <HorizontalProgressBar current="40" min="50" max="100" size="xs" />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Без минимального значения</div>
        <HorizontalProgressBar current="40" min="" max="100" size="xs" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        width: '400px',
      }}
    >
      {horizontalProgressBarRecipe.variantMap.size.map(
        (size: string, index: number) => (
          <div key={index}>
            <div style={{ marginBottom: '8px' }}>{size}</div>
            <HorizontalProgressBar {...args} />
          </div>
        ),
      )}
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        width: '400px',
      }}
    >
      <div>
        <div style={{ marginBottom: '8px' }}>С заголовком (title)</div>
        <HorizontalProgressBar
          current="60"
          min="40"
          max="100"
          size="xs"
          title="Образец тайтла"
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Со значением (value)</div>
        <HorizontalProgressBar
          current="60"
          min="40"
          max="100"
          size="sm"
          value="200 000 000 EUR"
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>С заголовком и значением</div>
        <HorizontalProgressBar
          current="60"
          min="40"
          max="100"
          size="md"
          title="Доступно"
          value="200 000 000 EUR"
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>
          Size lg (колоночное отображение)
        </div>
        <HorizontalProgressBar
          current="60"
          min="40"
          max="100"
          size="lg"
          title="Доступно"
          value="200 000 000 EUR"
        />
      </div>
    </div>
  ),
};
