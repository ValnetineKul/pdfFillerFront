import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogTrigger } from 'react-aria-components';

import { css } from '#styled-system/css';

import { IconButton } from '../IconButton';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Overlays/Popover',
  args: {
    placement: 'bottom',
    useArrow: false,
  },
  argTypes: {
    placement: {
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
    useArrow: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {},
  render: function Render(args) {
    return (
      <DialogTrigger>
        <IconButton aria-label="Help">
          <Icon name="general/help-circle" />
        </IconButton>
        <Popover {...args}>
          <div className={css({ paddingBlock: '1', paddingInline: '2' })}>
            <h3>Help</h3>
            <p>For help accessing your account, please contact support.</p>
          </div>
        </Popover>
      </DialogTrigger>
    );
  },
};
