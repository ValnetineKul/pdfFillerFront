import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipTrigger } from 'react-aria-components';

import { css } from '#styled-system/css';
import { wrap } from '#styled-system/patterns';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Overlays/Tooltip',
  args: {},
  argTypes: {
    placement: {
      table: { category: 'Visual' },
      control: { type: 'select' },
      options: [
        'bottom',
        'bottom left',
        'bottom right',
        'bottom start',
        'bottom end',
        'top',
        'top left',
        'top right',
        'top start',
        'top end',
        'left',
        'left top',
        'left bottom',
        'start',
        'start top',
        'start bottom',
        'right',
        'right top',
        'right bottom',
        'end',
        'end top',
        'end bottom',
      ],
    },
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

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {},
  render: function Render(args) {
    return (
      <TooltipTrigger isOpen={args.isOpen}>
        <Button>Try</Button>
        <Tooltip {...args} offset={4}>
          <div
            className={css({
              paddingBlock: '1',
              paddingInline: '2',
              color: 'text.primary',
            })}
          >
            <h3>Help</h3>
            <small>
              For help accessing your account, please contact support.
            </small>
          </div>
        </Tooltip>
      </TooltipTrigger>
    );
  },
};

export const WithTitleAndDescription: Story = {
  args: {},
  render: function Render(args) {
    return (
      <TooltipTrigger isOpen={args.isOpen}>
        <Button>Try</Button>
        <Tooltip
          {...args}
          offset={10}
          title={'This is a tooltip'}
          description={
            'For help accessing your account, please contact support.'
          }
        />
      </TooltipTrigger>
    );
  },
};
