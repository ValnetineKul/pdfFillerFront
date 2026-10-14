import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { featureTextRecipe } from '#styled-system/recipes';

import { Button } from '../Button';
import { FeaturedIcon } from '../FeaturedIcon';
import { FeatureText } from './FeatureText';

const meta: Meta<typeof FeatureText> = {
  component: FeatureText,
  title: 'Cards/FeatureText',
  args: {
    title: 'Deliver instant answers',
    text: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.',
    buttonSlot: <Button>Button</Button>,
  },
  argTypes: {
    align: {
      control: { type: 'select' },
      options: featureTextRecipe.variantMap.align,
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          resize: 'both',
          padding: 32,
          overflow: 'auto',
          width: 320,
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FeatureText>;

export const Default: Story = {
  render: (props) => <FeatureText {...props} />,
};

export const WithIcon: Story = {
  args: {
    iconSlot: (
      <FeaturedIcon size="xl" colorScheme="primary" type="modern">
        <Icon name="general/check" />
      </FeaturedIcon>
    ),
  },
  render: (props) => <FeatureText {...props} />,
};
