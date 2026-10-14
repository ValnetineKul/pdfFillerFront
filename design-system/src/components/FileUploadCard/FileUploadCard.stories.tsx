import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileUploadCard } from './FileUploadCard';

const meta: Meta<typeof FileUploadCard> = {
  component: FileUploadCard,
  title: 'Cards/FileUploadCard',
  args: {},
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '900px',
          maxWidth: '50vw',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FileUploadCard>;

export const Default: Story = {
  args: {
    isComplete: true,
    file: new File(
      ['file contents'],
      'PDF file example with long long long long name.pdf',
      {
        type: 'application/pdf',
        lastModified: new Date().getTime(),
      },
    ),
  },
};

export const ErrorFileCard: Story = {
  args: {
    isError: true,
    file: new File(['some content'], 'Error csv file example.csv', {
      type: 'text/csv',
      lastModified: new Date().getTime(),
    }),
    errorText: 'Upload failed, please try again',
  },
};

export const InProgressFileCard: Story = {
  args: {
    file: new File(['dummy content'], 'Video mp4 file example.mp4', {
      type: 'video/mp4',
      lastModified: new Date().getTime(),
    }),
    fileUploadProgressText: (progress) => `${progress}% uploaded`,
    progressValue: 70,
  },
};
