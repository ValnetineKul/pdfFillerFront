import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { platformsIconRecipe } from '#styled-system/recipes';

import { PlatformsIcon } from './PlatformsIcon';

const meta: Meta<typeof PlatformsIcon> = {
  component: PlatformsIcon,
  title: 'Navigation/PlatformsIcon',
  args: {},
  argTypes: {
    size: {
      control: { type: 'select' },
      options: platformsIconRecipe.variantMap.size,
    },
    variant: {
      control: { type: 'select' },
      options: platformsIconRecipe.variantMap.variant,
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PlatformsIcon>;

export const Default: Story = {
  args: {
    size: 'lg',
    variant: 'secondary',
    isDisabled: false,
  },

  render: (args) => (
    <div
      style={{
        backgroundColor: 'black',
        padding: 10,
        gap: 10,
        display: 'flex',
      }}
    >
      <PlatformsIcon {...args} variant="brand" href={'/'} size="lg">
        <Icon name="general/google-chrome" />
      </PlatformsIcon>
      <PlatformsIcon {...args} variant="primary" href={'/'}>
        <Icon name="general/google-chrome" />
      </PlatformsIcon>
      <PlatformsIcon {...args} variant="secondary" href={'/'}>
        <Icon name="general/google-chrome" />
      </PlatformsIcon>
    </div>
  ),
};
