import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DialogTrigger, Heading, Text } from 'react-aria-components';

import { css } from '#styled-system/css';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { TextField } from '../TextField';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Overlays/Modal',
  args: {},
  argTypes: {
    isDismissable: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {},
  render: function Render() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpenModal = (): void => {
      setIsOpen((state) => !state);
    };
    const wrapperStyles = css({
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      padding: '4',
      paddingTop: '6',
      width: '80',
    });

    const actionsStyles = css({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: '1fr',
      gridColumnGap: '3',
      gridRowGap: '0',
      backgroundColor: 'background.primary',
      paddingTop: '6',
    });

    return (
      <>
        <Button onPressUp={handleOpenModal}>Try modal</Button>
        <Modal isDismissable isOpen={isOpen} onOpenChange={setIsOpen}>
          <div className={wrapperStyles}>
            <Heading slot="title">Lorem ipsum dolor sit amet.</Heading>
            <Text slot="description">
              For help accessing your account, please contact support.
            </Text>
            <div className={actionsStyles}>
              <Button
                variant={'solid'}
                colorScheme={'error'}
                onPress={handleOpenModal}
              >
                Cancel
              </Button>
              <Button
                variant={'solid'}
                colorScheme={'primary'}
                onPress={handleOpenModal}
              >
                Agree
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  args: {},
  render: function Render() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenModal = (): void => {
      setIsOpen((state) => !state);
    };
    const wrapperStyles = css({
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      padding: '4',
      width: '80',
    });

    const actionsStyles = css({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: '1fr',
      gridColumnGap: '3',
      gridRowGap: '0',
      backgroundColor: 'background.primary',
      paddingTop: '6',
    });

    return (
      <>
        <Button onPressUp={handleOpenModal}>Try modal</Button>
        <Modal hideCloseButton isOpen={isOpen} onOpenChange={setIsOpen}>
          <div className={wrapperStyles}>
            <Heading slot="title">Lorem ipsum dolor sit amet.</Heading>
            <Text slot="description">
              For help accessing your account, please contact support.
            </Text>
            <div className={actionsStyles}>
              <Button
                variant={'solid'}
                colorScheme={'error'}
                onPress={handleOpenModal}
              >
                Cancel
              </Button>
              <Button
                variant={'solid'}
                colorScheme={'primary'}
                onPress={handleOpenModal}
              >
                Agree
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithScroll: Story = {
  args: {},
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenModal = (): void => {
      setIsOpen((state) => !state);
    };
    const wrapperStyles = css({
      width: '80',
    });
    const headWrapperStyles = css({
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      paddingTop: '4',
      paddingInline: '4',
    });

    const contentStyles = css({
      overflow: 'auto',
      maxHeight: '40dvh',
      paddingInline: '4',
    });

    const actionsStyles = css({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: '1fr',
      gridColumnGap: '3',
      gridRowGap: '0',
      backgroundColor: 'background.primary',
      paddingInline: '4',
      paddingTop: '6',
      paddingBottom: '4',
    });

    return (
      <DialogTrigger onOpenChange={handleOpenModal} isOpen={isOpen}>
        <Button>Try modal</Button>
        <Modal {...args}>
          <div className={wrapperStyles}>
            <div className={headWrapperStyles}>
              <Heading slot="title">Lorem ipsum dolor sit amet.</Heading>
              <Text slot="description">
                For help accessing your account, please contact support.
              </Text>
            </div>
            <div className={contentStyles}>
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
            </div>
          </div>

          <div className={actionsStyles}>
            <Button
              variant={'solid'}
              colorScheme={'error'}
              onPress={handleOpenModal}
            >
              Cancel
            </Button>
            <Button
              variant={'solid'}
              colorScheme={'primary'}
              onPress={handleOpenModal}
            >
              Agree
            </Button>
          </div>
        </Modal>
      </DialogTrigger>
    );
  },
};

export const WithInput: Story = {
  args: {},
  render: function Render() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpenModal = (): void => {
      setIsOpen((state) => !state);
    };
    const wrapperStyles = css({
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      padding: '4',
      width: '80',
    });

    const actionsStyles = css({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: '1fr',
      gridColumnGap: '3',
      gridRowGap: '0',
      backgroundColor: 'background.primary',
      paddingTop: '6',
    });

    return (
      <>
        <Button onPressUp={handleOpenModal}>Try modal</Button>
        <Modal isDismissable isOpen={isOpen} onOpenChange={setIsOpen}>
          <div className={wrapperStyles}>
            <Heading slot="title">Lorem ipsum dolor sit amet.</Heading>
            <Text slot="description">
              For help accessing your account, please contact support.
            </Text>
            <TextField placeholder="John Doe" label="Write text" />
            <div className={actionsStyles}>
              <Button
                variant={'solid'}
                colorScheme={'error'}
                onPress={handleOpenModal}
              >
                Cancel
              </Button>
              <Button
                variant={'solid'}
                colorScheme={'primary'}
                onPress={handleOpenModal}
              >
                Agree
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};
