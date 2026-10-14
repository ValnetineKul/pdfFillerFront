import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { vstack } from '#styled-system/patterns';
import { paginationLegacyRecipe as paginationRecipe } from '#styled-system/recipes';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Navigation/PaginationLegacy',
  args: {
    theme: 'default',
    pageCount: 10,
    pageIndex: 0,
    pageChangerPosition: 'center',
    hidePageChanger: false,
    hideNavigationLabels: false,
    countShowPageChanger: 3,
    messages: {
      previousLabel: 'Previous',
      nextLabel: 'Next',
      pageInputPlaceholder: '',
      previousAriaLabel: 'Go to previous page',
      goToPageLabel: 'Page',
      goToPageButton: 'Go',
      nextAriaLabel: 'Go to next page',
      shortPageInfo: (pageInfo) =>
        `${pageInfo.pageIndex + 1} of ${pageInfo.pageCount}`,
    },
  },
  argTypes: {
    onNext: { action: true },
    onPage: { action: true },
    onPrevious: { action: true },
    theme: {
      control: { type: 'select' },
      options: paginationRecipe.variantMap.theme,
    },
    pageChangerPosition: {
      control: { type: 'select' },
      options: ['center', 'end', 'start'],
    },
  },
  decorators: [
    (Story) => (
      <div className={vstack({ width: 'full', alignItems: 'normal' })}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <>
        <Pagination
          {...args}
          onPage={setPageIndex}
          onNext={() => setPageIndex((p) => p + 1)}
          onPrevious={() => setPageIndex((p) => p - 1)}
          pageIndex={pageIndex}
          theme="default"
          pageChangerPosition="center"
        />
      </>
    );
  },
};

export const Secondary: Story = {
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <>
        <Pagination
          {...args}
          onPage={setPageIndex}
          onNext={() => setPageIndex((p) => p + 1)}
          onPrevious={() => setPageIndex((p) => p - 1)}
          pageIndex={pageIndex}
          theme="secondary"
          pageChangerPosition="center"
        />
      </>
    );
  },
};
export const NoNavigationLabels: Story = {
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <Pagination
        {...args}
        onPage={setPageIndex}
        onNext={() => setPageIndex((p) => p + 1)}
        onPrevious={() => setPageIndex((p) => p - 1)}
        pageIndex={pageIndex}
        theme="default"
        pageChangerPosition="end"
        hideNavigationLabels
        hidePageChanger
      />
    );
  },
};

export const Position: Story = {
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <>
        {paginationRecipe.variantMap.pageChangerPosition.map(
          (pageChangerPosition, pageChangerPositionIndex) => (
            <div style={{ marginTop: '24px' }} key={pageChangerPositionIndex}>
              <p style={{ paddingBlock: '16px', textTransform: 'capitalize' }}>
                {pageChangerPosition}
              </p>
              <Pagination
                {...args}
                onPage={setPageIndex}
                onNext={() => setPageIndex((p) => p + 1)}
                onPrevious={() => setPageIndex((p) => p - 1)}
                pageIndex={pageIndex}
                theme="default"
                pageChangerPosition={pageChangerPosition}
              />
            </div>
          ),
        )}
      </>
    );
  },
};

export const MobileVariant: Story = {
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <>
        <div style={{ marginTop: '24px' }}>
          <ul style={{ paddingBlock: '16px' }}>
            <li>pageChangerPosition: bottom</li>
            <li>hideNavigationLabels: true</li>
            <li>hidePageChanger: true</li>
          </ul>
          <Pagination
            {...args}
            onPage={setPageIndex}
            onNext={() => setPageIndex((p) => p + 1)}
            onPrevious={() => setPageIndex((p) => p - 1)}
            pageIndex={pageIndex}
            theme="default"
            pageChangerPosition={'bottom'}
            hideNavigationLabels
            hidePageChanger
          />
        </div>
      </>
    );
  },
};
