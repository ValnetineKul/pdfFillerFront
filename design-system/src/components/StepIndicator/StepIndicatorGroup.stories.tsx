import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';

import { css } from '#styled-system/css';
import {
  stepIndicatorGroupRecipe,
  stepIndicatorItemRecipe,
} from '#styled-system/recipes';

import { StepIndicatorGroup } from './StepIndicatorGroup';
import { StepIndicatorItem } from './StepIndicatorItem';

const meta: Meta<typeof StepIndicatorGroup> = {
  component: StepIndicatorGroup,
  title: 'Navigation/StepIndicatorGroup',
  subcomponents: { StepIndicatorItem } as Record<string, ComponentType<any>>,
  args: {
    'aria-label': 'Step indicator group',
    children: (
      <>
        <StepIndicatorItem
          current
          size={'md'}
          type={'dot'}
          aria-label="Step 1"
        />
        <StepIndicatorItem
          current={false}
          size={'md'}
          type={'dot'}
          aria-label="Step 2"
        />
        <StepIndicatorItem
          current={false}
          size={'md'}
          type={'dot'}
          aria-label="Step 3"
        />
      </>
    ),
    framed: false,
    size: 'md',
  },
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        className={css({
          width: '300px',
          display: 'block',
        })}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof StepIndicatorGroup>;

export const Default: Story = {
  render: function Render(args) {
    return <StepIndicatorGroup {...args}>{args.children}</StepIndicatorGroup>;
  },
};
export const FramedSchemes: Story = {
  render: (args) => (
    <>
      {stepIndicatorGroupRecipe.variantMap.framed.map((framed, index) => (
        <div
          className={css({
            display: 'flex',
            marginBottom: '10px',
          })}
          key={index}
        >
          <>{'framed ' + framed}</>

          <StepIndicatorGroup {...args} framed={framed}>
            {args.children}
          </StepIndicatorGroup>
        </div>
      ))}
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      {stepIndicatorGroupRecipe.variantMap.size.map((size, index) => {
        return (
          <div
            className={css({
              display: 'flex',
            })}
            key={index}
          >
            <>{size + ' size'}</>
            <StepIndicatorGroup {...args} size={size}>
              <StepIndicatorItem
                current
                type={'dot'}
                size={size}
                textValue="Step indicator item"
              />
              <StepIndicatorItem
                current={false}
                type={'dot'}
                size={size}
                textValue="Step indicator item"
              />
              <StepIndicatorItem
                current={false}
                type={'dot'}
                size={size}
                textValue="Step indicator item"
              />
            </StepIndicatorGroup>
          </div>
        );
      })}
    </>
  ),
};

export const StepIndicatorDefault: Story = {
  render: function Render() {
    return (
      <StepIndicatorGroup
        framed={false}
        size={'md'}
        aria-label="Step indicator group"
      >
        <StepIndicatorItem
          current
          size="md"
          type="dot"
          textValue="Step indicator item"
        />
      </StepIndicatorGroup>
    );
  },
};

export const TypeSchemes: Story = {
  render: (args) => (
    <>
      {stepIndicatorItemRecipe.variantMap.type.map((type, index) => (
        <div className={css({ display: 'flex' })} key={index}>
          <div className={css({ marginRight: '10px' })}>{type}</div>
          <StepIndicatorGroup
            framed={false}
            size={args.size}
            aria-label="Step indicator group"
          >
            <StepIndicatorItem
              current
              type={type}
              size={args.size}
              textValue="Step indicator item"
            />
          </StepIndicatorGroup>
        </div>
      ))}
    </>
  ),
};

export const SizeSchemes: Story = {
  render: () => (
    <>
      {stepIndicatorItemRecipe.variantMap.size.map((size, index) => (
        <div
          className={css({
            display: 'flex',
          })}
          key={index}
        >
          <>{size}</>
          <StepIndicatorGroup
            framed={false}
            size={size}
            aria-label="Step indicator group"
          >
            <StepIndicatorItem
              current
              type={'dot'}
              size={size}
              textValue="Step indicator item"
            />
          </StepIndicatorGroup>
        </div>
      ))}
    </>
  ),
};

export const CurrentSchemes: Story = {
  render: (args) => (
    <>
      {stepIndicatorItemRecipe.variantMap.current.map((current, index) => (
        <div
          className={css({ display: 'flex', marginBottom: '10px' })}
          key={index}
        >
          <>{'current ' + current}</>
          <StepIndicatorGroup
            framed={false}
            size={args.size}
            aria-label="Step indicator group"
          >
            <StepIndicatorItem
              current={current}
              type={'dot'}
              size={args.size}
              textValue="Step indicator item"
            />
          </StepIndicatorGroup>
        </div>
      ))}
    </>
  ),
};
