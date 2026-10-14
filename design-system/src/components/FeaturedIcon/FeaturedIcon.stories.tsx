import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { featuredIconRecipe } from '#styled-system/recipes';

import { FeaturedIcon } from './FeaturedIcon';

const meta: Meta<typeof FeaturedIcon> = {
  component: FeaturedIcon,
  title: 'Informative/FeaturedIcon',
  args: {
    children: <Icon name="general/check" />,
    colorScheme: 'primary',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: featuredIconRecipe.variantMap.size,
    },
    colorScheme: {
      control: { type: 'select' },
      options: featuredIconRecipe.variantMap.colorScheme,
    },
    type: {
      control: { type: 'radio' },
      options: featuredIconRecipe.variantMap.type,
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FeaturedIcon>;

export const Default: Story = {
  args: {},
};

export const Colors: Story = {
  render: function Render(args) {
    return (
      <>
        {featuredIconRecipe.variantMap.colorScheme.map((color, index) => (
          <div key={index}>
            <FeaturedIcon {...args} colorScheme={color} />
            <small>{color}</small>
          </div>
        ))}
      </>
    );
  },
};

export const Sizes: Story = {
  render: function Render(args) {
    return (
      <>
        {featuredIconRecipe.variantMap.size.map((size, index) => (
          <div key={index}>
            <FeaturedIcon {...args} size={size} />
            <small>{size}</small>
          </div>
        ))}
      </>
    );
  },
};

export const Type: Story = {
  render: function Render(args) {
    return (
      <>
        {featuredIconRecipe.variantMap.type.map((type, index) => (
          <div key={index}>
            <FeaturedIcon {...args} type={type} />
            <small>{type}</small>
          </div>
        ))}
      </>
    );
  },
};

export const Modern: Story = {
  render: function Render(args) {
    return <FeaturedIcon {...args} type="modern" />;
  },
};
