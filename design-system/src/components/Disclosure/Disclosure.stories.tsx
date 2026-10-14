import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { disclosureRecipe } from '#styled-system/recipes';

import { Disclosure } from './Disclosure';

const meta: Meta<typeof Disclosure> = {
  component: Disclosure,
  args: { label: 'Disclosure' },
  argTypes: {
    isDisabled: { type: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: disclosureRecipe.variantMap.variant,
    },
    icon: {
      description: 'Icon to display in the disclosure',
    },
    label: {
      control: { type: 'text' },
      description: 'Label to display in the disclosure',
    },
  },
  title: 'Navigation / Disclosure',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '100%' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Disclosure>;

export const Default: Story = {
  render: function Render(args) {
    return (
      <Disclosure {...args} icon={<Icon name="general/zap" />}>
        Lorem Ipsum has been the industry standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum
      </Disclosure>
    );
  },
};

export const Plain: Story = {
  render: function Render(args) {
    return (
      <Disclosure {...args} icon={<Icon name="general/zap" />} variant="plain">
        Lorem Ipsum has been the industry standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum
      </Disclosure>
    );
  },
};

export const PlainDisabled: Story = {
  render: function Render(args) {
    return (
      <Disclosure
        {...args}
        icon={<Icon name="general/zap" />}
        variant="plain"
        isDisabled
      >
        Lorem Ipsum has been the industry standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum
      </Disclosure>
    );
  },
};

export const DefaultDisabled: Story = {
  render: function Render(args) {
    return (
      <Disclosure
        {...args}
        icon={<Icon name="general/zap" />}
        variant="default"
        isDisabled
      >
        Lorem Ipsum has been the industry standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum
      </Disclosure>
    );
  },
};
