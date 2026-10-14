import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { wrap } from '#styled-system/patterns';

import { TooltipButton } from './TooltipButton';

const meta: Meta<typeof TooltipButton> = {
  component: TooltipButton,
  title: 'Buttons/TooltipButton',
  args: {
    children: <Icon name="time/calendar" />,
    'aria-label': 'default-remove-button',
  },
  argTypes: {
    isInvalid: { control: { type: 'boolean' } },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={wrap({ textAlign: 'center' })}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TooltipButton>;

export const Default: Story = {
  args: {},
};
