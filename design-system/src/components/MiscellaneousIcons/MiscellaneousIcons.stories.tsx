import type { Meta, StoryObj } from '@storybook/react-vite';

import { Grid } from '#styled-system/jsx';
import { miscellaneousIconsRecipe } from '#styled-system/recipes';

import { MiscellaneousIcons } from './MiscellaneousIcons';

const meta: Meta<typeof MiscellaneousIcons> = {
  title: 'Informative/MiscellaneousIcons',
  component: MiscellaneousIcons,
  args: {
    size: 'md',
    type: 'primary',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MiscellaneousIcons>;

export const TypeVariants: Story = {
  render: () => (
    <Grid gridTemplateColumns="repeat(4, 1fr)" gap={2}>
      {miscellaneousIconsRecipe.variantMap.type.map((type) =>
        miscellaneousIconsRecipe.variantMap.size.map((size) => (
          <MiscellaneousIcons key={`${type}-${size}`} size={size} type={type} />
        )),
      )}
    </Grid>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <Grid gridTemplateColumns="repeat(4, 1fr)" gap={2}>
      {miscellaneousIconsRecipe.variantMap.size.map((size) =>
        miscellaneousIconsRecipe.variantMap.type.map((type) => (
          <MiscellaneousIcons key={`${size}-${type}`} size={size} type={type} />
        )),
      )}
    </Grid>
  ),
};

export const Default: Story = {
  args: {
    size: 'md',
    type: 'primary',
  },
};
