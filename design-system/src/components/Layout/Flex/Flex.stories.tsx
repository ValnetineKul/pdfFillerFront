import type { Meta, StoryObj } from '@storybook/react-vite';

import { css } from '#styled-system/css';

import { Box, Flex } from '.';
import { Container } from '../Container';

const meta: Meta<typeof Flex> = {
  title: 'Layout / Flex',
  subcomponents: { Box } as Record<string, any>,
  decorators: [
    (Story) => (
      <div
        className={css({
          backgroundColor: 'background.secondary.alt',
          padding: 10,
          width: 'full',
        })}
      >
        <Container>
          <div
            className={css({
              backgroundColor: 'background.primary',
              borderWidth: 0.25,
              borderColor: 'border.primary',
              borderRadius: 2,
              color: 'text.primary',
              textStyle: 'display.lg',
              overflow: 'hidden',
            })}
          >
            <Story />
          </div>
        </Container>
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Flex>;

const flexColumnCss = css({
  backgroundColor: 'blue.300',
  textStyle: 'sm',
  textAlign: 'center',
  lineHeight: '50px',
});

export const Default: Story = {
  render: () => (
    <Flex direction="column" rowGap={2}>
      <Flex height={50} columnGap={4} width="full">
        <Box width="6/12" marginInlineStart="3/12" className={flexColumnCss}>
          6/12
        </Box>
      </Flex>
      <Flex height={50} columnGap={4} width="full">
        <Box width="7/12" className={flexColumnCss}>
          7/12
        </Box>
        <Box width="5/12" className={flexColumnCss}>
          5/12
        </Box>
      </Flex>
      <Flex height={50} columnGap={4} width="full">
        <Box width="4/12" className={flexColumnCss}>
          4/12
        </Box>
        <Box width="8/12" className={flexColumnCss}>
          8/12
        </Box>
      </Flex>
      <Flex height={50} columnGap={4} width="full">
        <Box width="9/12" className={flexColumnCss}>
          9/12
        </Box>
        <Box width="3/12" className={flexColumnCss}>
          3/12
        </Box>
      </Flex>
      <Flex height={50} columnGap={4} width="full">
        <Box width="2/12" className={flexColumnCss}>
          2/12
        </Box>
        <Box width="10/12" className={flexColumnCss}>
          10/12
        </Box>
      </Flex>
      <Flex height={50} columnGap={4} width="full">
        <Box width="11/12" className={flexColumnCss}>
          11/12
        </Box>
        <Box width="1/12" className={flexColumnCss}>
          1/12
        </Box>
      </Flex>
      <Flex height={50} columnGap={4} width="full">
        <Box width="12/12" className={flexColumnCss}>
          12/12
        </Box>
      </Flex>
    </Flex>
  ),
};

export const Adaptive: Story = {
  render: () => (
    <Flex height={200} gap={4}>
      <Box
        width={{ base: '6/12', w560: '4/12', w940: '3/12', w1280: '2/12' }}
        marginInlineStart={{ w940: '2/12' }}
        className={flexColumnCss}
      />
      <Box
        width={{ base: '6/12', w560: '8/12', w940: '5/12', w1280: '6/12' }}
        className={flexColumnCss}
      />
    </Flex>
  ),
};
