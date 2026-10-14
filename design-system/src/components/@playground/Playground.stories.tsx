import type { Meta, StoryObj } from '@storybook/react-vite';

import { Playground } from './Playground';

const meta: Meta<typeof Playground> = {
  component: Playground,
  args: {},
  argTypes: {},
  title: 'Others/Playground *Experimental',
};

export default meta;

type Story = StoryObj<typeof Playground>;

export const Default: Story = {
  args: {},
};
