import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileTrigger } from './FileTrigger';
import { mimeFileTypes } from './mock';

const meta: Meta<typeof FileTrigger> = {
  component: FileTrigger,
  title: 'Buttons/FileTrigger',
  args: {},
  argTypes: {
    allowsMultiple: { type: 'boolean' },
    acceptDirectory: { type: 'boolean' },
    acceptedFileTypes: {
      control: { type: 'multi-select' },
      options: mimeFileTypes,
    },
    defaultCamera: {
      control: { type: 'select' },
      options: ['user', 'environment'],
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FileTrigger>;

export const Default: Story = {
  args: {
    acceptedFileTypes: [
      'image/svg+xml',
      'image/png',
      'image/jpeg',
      'image/gif',
    ],
    allowsMultiple: true,
    acceptDirectory: false,
  },

  render: (args) => (
    <FileTrigger
      {...args}
      triggerButtonLinkText={'Click to upload'}
      aria-label={'Upload file'}
    />
  ),
};
