import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { FeaturedIcon } from '../FeaturedIcon';
import { GlobalToastRegion, toastQueue } from './GlobalToastRegion';
import { Toast } from './Toast';
import { ToastProvider } from './ToastProvider';

const meta: Meta<typeof Toast> = {
  component: Toast,
  args: {},
  argTypes: {},
  title: 'Informative / Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {},
  render: function Render() {
    return (
      <ToastProvider>
        {(state) => (
          <Button
            onPress={() =>
              state.add(
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <FeaturedIcon colorScheme="success">
                    <Icon name="general/check" />
                  </FeaturedIcon>
                  <h3 style={{ fontWeight: 'bold' }}>Lorem ipsum dolor.</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid deleniti facere omnis quibusdam temporibus ullam.
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant="subtle" size="sm" colorScheme="secondary">
                      Dismiss
                    </Button>
                    <Button variant="subtle" size="sm" colorScheme="primary">
                      View changes
                    </Button>
                  </div>
                </div>,
                { timeout: 5000 },
              )
            }
          >
            Show toast
          </Button>
        )}
      </ToastProvider>
    );
  },
};

export const ToastWithPriority: Story = {
  args: {},
  render: function Render() {
    return (
      <ToastProvider>
        {(state) => (
          <>
            <Button onPress={() => state.add('Toasting…')}>
              Show low priority toast
            </Button>
            <Button onPress={() => state.add('Toast is done!')}>
              Show medium priority toast
            </Button>
            <Button onPress={() => state.add('Toast is burned!')}>
              Show high priority toast
            </Button>
          </>
        )}
      </ToastProvider>
    );
  },
};

export const ToastWithCustomPosition: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <GlobalToastRegion position="top" />
      </>
    ),
  ],
  render: function Render() {
    return (
      <Button onPress={() => toastQueue.add('Toasting…', { timeout: 3000 })}>
        Top
      </Button>
    );
  },
};
