import type { Meta, StoryObj } from '@storybook/react-vite';

import { accordionRecipe } from '#styled-system/recipes';

import { Accordion } from './Accordion';
import { AccordionItem } from './base/AccordionItem';
import { ITEMS } from './sb/mock';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  args: {},
  argTypes: {
    position: {
      control: { type: 'radio' },
      options: accordionRecipe.variantMap.position,
    },
  },
  title: 'Collections/Accordion',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: function Render(args) {
    return (
      <Accordion {...args}>
        {ITEMS.map((item) => (
          <AccordionItem key={item.id} label={item.label}>
            {item.description}
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
};
