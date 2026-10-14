import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text } from 'react-aria-components';

import { css } from '#styled-system/css';

import { Button } from '../Button';
import { MetricGroup } from '../Metric';
import type { ButtonProps } from '../shared';
import { Tag, TagGroup } from '../TagGroup';
import { SectionWrapper } from './SectionWrapper';

const meta: Meta<typeof SectionWrapper> = {
  component: SectionWrapper,
  title: 'Sections/Wrapper',
  args: {},
  argTypes: {},
  parameters: {},
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={css({ width: 'full' })}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SectionWrapper>;

const metricsActions: Array<{
  text: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  colorScheme?: ButtonProps['colorScheme'];
}> = [
  {
    text: 'Learn more',
    onClick: () => {},
    variant: 'outline',
    colorScheme: 'secondary',
  },
  {
    text: 'Get started',
    onClick: () => {},
    colorScheme: 'primary',
  },
];

export const Metrics: Story = {
  args: {
    children: (
      <>
        <div>
          <Heading level={2}>Start your free trial</Heading>
          <Text>Join over 4,000+ startups already growing with Untitled.</Text>
        </div>
        <MetricGroup
          gap={'4'}
          gridBorderRadius={'4'}
          columns={{ w1280: 3, w768: 3, base: 1 }}
          itemBorderRadius={'4'}
          items={[
            { contentSlot: 'Projects completed', title: '400+' },
            { contentSlot: 'Return on investment', title: '600%' },
            { contentSlot: 'Global downloads', title: '10k' },
          ]}
        />
        <div className={css({ display: 'flex', gap: '3' })}>
          {metricsActions.map((action, i) => (
            <Button
              variant={action.variant}
              colorScheme={action.colorScheme}
              key={i}
              onPress={action?.onClick}
            >
              {action.text}
            </Button>
          ))}
        </div>
      </>
    ),
  },
};

const ctaActions: Array<{
  text: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  colorScheme?: ButtonProps['colorScheme'];
}> = [
  {
    text: 'Learn more',
    onClick: () => {},
    variant: 'outline',
    colorScheme: 'secondary',
  },
  {
    text: 'Get started',
    onClick: () => {},
    colorScheme: 'primary',
  },
];

export const CallToAction: Story = {
  args: {
    children: (
      <>
        <div>
          <Heading level={2}>Start your free trial</Heading>
          <Text>Join over 4,000+ startups already growing with Untitled.</Text>
        </div>
        <div className={css({ display: 'flex', gap: '3' })}>
          {ctaActions.map((action, i) => (
            <Button
              variant={action.variant}
              colorScheme={action.colorScheme}
              key={i}
              onPress={action?.onClick}
            >
              {action.text}
            </Button>
          ))}
        </div>
      </>
    ),
    theme: 'brand',
    viewType: 'row',
  },
};

const tagItems = [
  { id: '1', label: 'За первый депозит' },
  { id: '2', label: 'Спорт' },
  { id: '3', label: 'Казино' },
  { id: '4', label: 'Приветственный бонус' },
  { id: '5', label: 'Кибер спорт' },
  { id: '6', label: 'Игровой зал' },
];

const heroActions: Array<{
  text: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  colorScheme?: ButtonProps['colorScheme'];
}> = [
  {
    text: 'Демо',
    onClick: () => {},
    variant: 'outline',
    colorScheme: 'secondary',
  },
  {
    text: 'Выбрать бонус',
    onClick: () => {},
    colorScheme: 'primary',
  },
];

export const Hero: Story = {
  args: {
    children: (
      <>
        <TagGroup items={tagItems} aria-label="default">
          {(item) => <Tag>{item.label}</Tag>}
        </TagGroup>
        <div className={css({ display: 'flex', gap: '3' })}>
          {heroActions.map((action, i) => (
            <Button
              variant={action.variant}
              colorScheme={action.colorScheme}
              key={i}
              onPress={action?.onClick}
            >
              {action.text}
            </Button>
          ))}
        </div>
      </>
    ),
    contentPositionY: 'end',
    contentPositionX: 'center',
    background: {
      backgroundImage: `url('/hero.png')`,
    },
  },
};
