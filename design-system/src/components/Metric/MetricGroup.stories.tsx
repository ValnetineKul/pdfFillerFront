import type { Meta, StoryObj } from '@storybook/react-vite';

import { css } from '#styled-system/css';

import { MetricGroup } from './MetricGroup';

const meta: Meta<typeof MetricGroup> = {
  component: MetricGroup,
  title: 'Blocks/Metric',
  args: {},
  argTypes: {},
  parameters: {},
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={css({ containerType: 'inline-size', width: 'full' })}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MetricGroup>;

export const Default: Story = {
  args: {
    items: [
      { contentSlot: 'Projects completed', title: '400+' },
      { contentSlot: 'Return on investment', title: '600%' },
      { contentSlot: 'Global downloads', title: '10k' },
    ],
    columns: {
      base: 1,
      w320: 1,
      w768: 3,
    },
  },
};

export const GapBetweenItems: Story = {
  args: {
    items: [
      { contentSlot: 'Projects completed', title: '400+' },
      { contentSlot: 'Return on investment', title: '600%' },
      { contentSlot: 'Global downloads', title: '10k' },
    ],
    columns: {
      base: 1,
      w768: 3,
    },
    gap: '4',
    itemBorderRadius: '4',
  },
};

export const CustomRows: Story = {
  args: {
    items: [
      { contentSlot: 'Projects completed', title: '400+' },
      { contentSlot: 'Return on investment', title: '600%' },
      { contentSlot: 'Global downloads', title: '10k' },
      { contentSlot: 'Return on investment', title: '600%' },
      { contentSlot: 'Global downloads', title: '10k' },
      { contentSlot: 'Projects completed', title: '400+' },
    ],
    columns: {
      base: 1,
      w768: 3,
    },
    gap: '4',
    gridBorderRadius: '4',
  },
};

export const GradientsItems: Story = {
  args: {
    items: [
      {
        contentSlot: 'Projects completed',
        title: '400+',
        background: { colorStart: 'red', colorEnd: 'blue', deg: -180 },
      },
      {
        contentSlot: 'Return on investment',
        title: '600%',
        background: { colorStart: 'green', colorEnd: 'blue', deg: 90 },
      },
      {
        contentSlot: 'Global downloads',
        title: '10k',
        background: { colorStart: 'blue', colorEnd: 'blue', deg: 10 },
      },
    ],
    columns: {
      base: 1,
      w768: 3,
    },
    gap: '4',
    gridBorderRadius: '4',
    itemBorderRadius: '3',
  },
};

export const RoundedItems: Story = {
  args: {
    items: [
      {
        contentSlot: 'Projects completed',
        title: '400+',
        background: { colorStart: '#F9F5FF' },
      },
      {
        contentSlot: 'Return on investment',
        title: '600%',
        background: { colorStart: '#F9F5FF' },
      },
      {
        contentSlot: 'Global downloads',
        title: '10k',
        background: { colorStart: '#F9F5FF' },
      },
    ],
    columns: {
      base: 1,
      w768: 3,
    },
    gap: '4',
    gridBorderRadius: '4',
  },
};

export const GradientGroup: Story = {
  args: {
    items: [
      {
        contentSlot: 'Projects completed',
        title: '400+',
      },
      {
        contentSlot: 'Return on investment',
        title: '600%',
      },
      {
        contentSlot: 'Global downloads',
        title: '10k',
      },
    ],
    columns: {
      base: 1,
      w768: 3,
    },
    gap: '4',
    gridBorderRadius: '4',
    gridBackground: {
      colorStart: 'red',
      colorEnd: 'blue',
      deg: 10,
    },
  },
};

export const ItemsWithImages: Story = {
  args: {
    items: [
      {
        contentSlot: (
          <p>
            <b>Unique gifts</b>
          </p>
        ),
        imageSlot: <img src="/metrics/diamond.png" />,
      },
      {
        contentSlot: (
          <p>
            <b>Global downloads</b>
          </p>
        ),
        imageSlot: <img src="/metrics/magic_branch.png" />,
      },
      {
        contentSlot: (
          <p>
            <b>Projects completed</b>
          </p>
        ),
        imageSlot: <img src="/metrics/diamond.png" />,
      },
      {
        contentSlot: (
          <p>
            <b>Unique gifts</b>
          </p>
        ),
        imageSlot: <img src="/metrics/gift.png" />,
      },
      {
        contentSlot: (
          <p>
            <b>Return on investment</b>
          </p>
        ),
        imageSlot: <img src="/metrics/magic_branch.png" />,
      },
      {
        contentSlot: (
          <p>
            <b>Priority</b>
          </p>
        ),
        imageSlot: <img src="/metrics/magic_branch.png" />,
      },
    ],
    columns: {
      base: 1,
      w320: 1,
      w768: 3,
    },
    gridBackground: { colorStart: '#F3F4F6' },
    gridBorderRadius: '2',
  },
};
