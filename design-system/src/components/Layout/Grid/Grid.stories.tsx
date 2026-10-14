import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';

import { css } from '#styled-system/css';

import { Grid, GridItem } from '.';

const meta: Meta<typeof Grid> = {
  title: 'Layout / Grid',
  subcomponents: { GridItem } as Record<string, ComponentType<any>>,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        className={css({
          width: 'full',
        })}
      >
        <Story />
      </div>
    ),
  ],
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Grid>;

const gridItemCss = css({
  backgroundColor: 'blue.200',
});

export const SimpleGrid: Story = {
  render: () => (
    <>
      <Grid
        gridTemplateColumns={3}
        gridTemplateRows={2}
        gridGap={4}
        height={200}
        display="grid"
      >
        <GridItem className={gridItemCss} />
        <GridItem className={gridItemCss} />
        <GridItem className={gridItemCss} />
        <GridItem className={gridItemCss} />
        <GridItem className={gridItemCss} />
        <GridItem className={gridItemCss} />
      </Grid>
    </>
  ),
};

export const ComplexGrid: Story = {
  render: () => (
    <>
      <Grid
        gridTemplateColumns={'150px 1fr 2fr'}
        gridTemplateRows={2}
        gridGap={4}
        height={200}
      >
        <GridItem colSpan={1} rowSpan={2} className={gridItemCss} />
        <GridItem colSpan={1} className={gridItemCss} />
        <GridItem colSpan={1} className={gridItemCss} />
        <GridItem colSpan={2} className={gridItemCss} />
      </Grid>
    </>
  ),
};
