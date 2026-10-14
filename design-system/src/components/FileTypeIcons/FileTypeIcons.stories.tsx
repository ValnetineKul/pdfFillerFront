import type { Meta, StoryObj } from '@storybook/react-vite';

import { Grid } from '#styled-system/jsx';

import { FileTypeIcons } from './FileTypeIcons';
import { defaultFileTypes } from './mock';

const meta: Meta<typeof FileTypeIcons> = {
  title: 'Informative/FileTypeIcons',
  component: FileTypeIcons,
  args: {
    fileType: 'video/x-msvideo',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof FileTypeIcons>;
export const Default: Story = {
  args: {},
};

export const AllTypes: Story = {
  render: function Render(args) {
    const rareImageType = 'image/bmp';
    return (
      <Grid gridTemplateColumns="repeat(6, 1fr)" gap={6}>
        {defaultFileTypes.map((ftype) => (
          <div key={ftype}>
            <FileTypeIcons {...args} fileType={ftype} />
          </div>
        ))}
        <div>
          <FileTypeIcons {...args} fileType={rareImageType} />
        </div>
      </Grid>
    );
  },
  args: {},
};

export const DefaultIcon: Story = {
  render: function Render(args) {
    const nonExistentType = 'application/unknown';
    return (
      <Grid gap={2}>
        <FileTypeIcons {...args} fileType={nonExistentType} />
      </Grid>
    );
  },
  args: {},
};
