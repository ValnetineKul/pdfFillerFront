import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Heading, Text } from 'react-aria-components';

import { css } from '#styled-system/css';
import { drawerAnimatedRecipe, drawerRecipe } from '#styled-system/recipes';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Drawer, DrawerTrigger } from './Drawer';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: 'Overlays/Drawer',
  args: {
    isDismissable: false,
    size: 'auto',
  },
  argTypes: {
    isDismissable: {
      control: { type: 'boolean' },
    },
    position: {
      control: { type: 'inline-radio' },
      options: drawerAnimatedRecipe.variantMap.position,
    },
    size: {
      control: { type: 'inline-radio' },
      options: drawerAnimatedRecipe.variantMap.size,
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {},
  render: function Render(args) {
    const classes = drawerRecipe();

    return (
      <DrawerTrigger>
        <Button>Try drawer</Button>
        <Drawer
          title="Lorem ipsum dolor sit amet."
          description="Lorem ipsum dolor sit amet."
          {...args}
        >
          {({ state }) => (
            <>
              <Text>
                For help accessing your account, please contact support.
              </Text>
              <div className={classes.footer}>
                <Button
                  variant="solid"
                  colorScheme="error"
                  onPress={state.close}
                  width="full"
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  colorScheme="primary"
                  onPress={state.close}
                  width="full"
                >
                  Agree
                </Button>
              </div>
            </>
          )}
        </Drawer>
      </DrawerTrigger>
    );
  },
};

export const OutsideTrigger: Story = {
  args: { isDismissable: true },
  render: function Render(args) {
    const classes = drawerRecipe();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <>
        <Button onPress={() => setIsOpen(!isOpen)}>Try drawer {isOpen}</Button>
        <Drawer
          {...args}
          title="Lorem ipsum dolor sit amet."
          description="Lorem ipsum dolor sit amet."
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          {({ state }) => (
            <>
              <form
                method="post"
                id="form"
                onSubmit={(event) => {
                  alert('submit');
                  event.preventDefault();
                  state.close();
                }}
                className={css({
                  width: '100vw',
                  maxWidth: '80',
                  w480: {
                    maxWidth: '120',
                  },
                })}
              >
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                  aliquid assumenda dicta, dolore eum illum impedit magni maxime
                  natus neque nobis odit quis quisquam ratione recusandae rerum
                  saepe, similique vel.
                </Text>
                <Heading>Lorem ipsum dolor sit amet.</Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                  aliquid assumenda dicta, dolore eum illum impedit magni maxime
                  natus neque nobis odit quis quisquam ratione recusandae rerum
                  saepe, similique vel.
                </Text>
                <Heading>Lorem ipsum dolor sit amet.</Heading>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                  aliquid assumenda dicta, dolore eum illum impedit magni maxime
                  natus neque nobis odit quis quisquam ratione recusandae rerum
                  saepe, similique vel.
                </Text>
                <Checkbox>Lorem ipsum dolor</Checkbox>
                <Checkbox>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                  aliquid assumenda dicta, dolore eum illum impedit magni maxime
                  natus neque nobis odit quis quisquam ratione recusandae rerum
                  saepe, similique vel.
                </Checkbox>
              </form>
              <div className={classes.footer}>
                <Button
                  form="form"
                  type="button"
                  variant="solid"
                  colorScheme="error"
                  onPress={state.close}
                  width="full"
                >
                  Cancel
                </Button>
                <Button
                  form="form"
                  type="submit"
                  variant="solid"
                  colorScheme="primary"
                  width="full"
                >
                  Agree
                </Button>
              </div>
            </>
          )}
        </Drawer>
      </>
    );
  },
};
