import type { Meta, StoryObj } from '@storybook/react-vite';

import { mimeFileTypes } from '../FileTrigger/mock';
import { DropZone } from './DropZone';

const meta: Meta<typeof DropZone> = {
  component: DropZone,
  title: 'Drag and Drop/DropZone',
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

type Story = StoryObj<typeof DropZone>;

export const Default: Story = {
  render: function Render(args) {
    return (
      <DropZone
        {...args}
        onDrop={() => alert('Files uploaded successfully')}
        infoText={(maxFileSize) => `SVG, PNG, JPG or GIF (max ${maxFileSize})`}
        additionalText={'or drag and drop'}
        triggerButtonLinkText={'Click to upload'}
        onSelect={() => alert('File selected')}
        aria-label={'Upload file'}
        maxFileSize={10 * 1024 * 1024}
      />
    );
  },
};

export const Disable: Story = {
  render: function Render(args) {
    return (
      <DropZone
        {...args}
        onDrop={() => alert('Files uploaded successfully')}
        infoText={'SVG, PNG, JPG or GIF (max 10 MB)'}
        additionalText={'or drag and drop'}
        triggerButtonLinkText={'Click to upload'}
        onSelect={() => alert('File selected')}
        aria-label={'Upload file'}
        isDisabled
        deviceType={'mobile'}
      />
    );
  },
};
