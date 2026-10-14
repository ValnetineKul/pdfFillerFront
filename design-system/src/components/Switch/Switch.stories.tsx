import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { css } from '#styled-system/css';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Forms/Switch',
  args: {},
  argTypes: {
    isDisabled: {
      control: { type: 'boolean' },
    },
    isPending: {
      control: { type: 'boolean' },
    },
    reverse: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    description: { type: 'string' },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        className={css({
          width: '200px',
          display: 'block',
        })}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: function Render(args) {
    return (
      <Switch {...args}>
        {({ isSelected }) => (isSelected ? 'on' : 'off')}
      </Switch>
    );
  },
};

export const SelectedByDefault: Story = {
  render: function Render(args) {
    return (
      <Switch {...args} defaultSelected>
        {({ isSelected }) => (isSelected ? 'on' : 'off')}
      </Switch>
    );
  },
};

export const WithDescription: Story = {
  render: function Render(args) {
    return (
      <Switch {...args} description="Some text for description">
        {({ isSelected }) => (isSelected ? 'on' : 'off')}
      </Switch>
    );
  },
};

export const Disabled: Story = {
  render: function Render(args) {
    return (
      <Switch isDisabled {...args}>
        {({ isSelected }) => (isSelected ? 'on' : 'off')}
      </Switch>
    );
  },
};

export const WithoutLabel: Story = {
  render: function Render(args) {
    return <Switch {...args} aria-label="Switch without a label" />;
  },
};

export const ReadOnly: Story = {
  render: function Render(args) {
    return (
      <Switch {...args} isReadOnly isSelected>
        Read Only
      </Switch>
    );
  },
};

export const Loading: Story = {
  render: function Render(args) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = (): void => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <Switch {...args} onChange={handlePress} isPending={isLoading}>
        {isLoading ? 'Loading...' : 'Switch with loading'}
      </Switch>
    );
  },
};
