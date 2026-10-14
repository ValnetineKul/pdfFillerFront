import type { Meta, StoryObj } from '@storybook/react-vite';
import { breakpoints } from 'src/preset/theme';

import { css } from '#styled-system/css';

import { Container } from '.';

const meta: Meta<typeof Container> = {
  component: Container,
  title: 'Layout / Container',
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
  tags: ['autodocs'],
  args: {
    maxWidth: 'w1920',
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: Object.keys(breakpoints),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: (props) => (
    <Container {...props}>
      <div
        className={css({
          backgroundColor: 'background.primary',
          borderWidth: 0.25,
          borderColor: 'border.primary',
          borderRadius: 2,
          padding: 4,
          color: 'text.primary',
          textStyle: 'display.lg',
          height: 64,
        })}
      >
        {props.maxWidth}
      </div>
    </Container>
  ),
};
