import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import { mimeFileTypes } from '../FileTrigger/mock';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  title: 'Forms/FileUpload',
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

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: function Render(args) {
    const [formFiles, setFormFiles] = useState<Array<File>>([]);

    useEffect(() => {
      console.info('Current files:', formFiles);
    }, [formFiles]);

    return (
      <FileUpload
        {...args}
        onChange={setFormFiles}
        infoText={(maxFileSize) => `SVG, PNG, JPG or GIF (max ${maxFileSize})`}
        additionalText={'or drag and drop'}
        triggerButtonLinkText={'Click to upload'}
        maxFileSize={10 * 1024 * 1024}
        allowsMultiple
        acceptedFileTypes={[
          'image/svg+xml',
          'image/png',
          'image/jpeg',
          'image/gif',
        ]}
        maxFileSizeErrorText={(maxFileSize) =>
          `Maximum file size is ${maxFileSize}`
        }
        fileUploadProgressText={(progress) => `${progress}% uploaded`}
        deleteButtonAriaLabel={(fileName) => `Delete ${fileName}`}
        reloadButtonAriaLabel={(fileName) => `Reload ${fileName}`}
        aria-label={'Upload file'}
        acceptedFileErrorText={'Invalid file format'}
      />
    );
  },
};
