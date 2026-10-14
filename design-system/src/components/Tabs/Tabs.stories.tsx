import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';

import { Tab } from './base/Tab';
import { ITEMS, LONG_NAME_ITEMS } from './sb/mock';
import { TabPanel } from './sb/TabPanel';
import { Tabs } from './sb/Tabs';
import { TabList } from './TabList';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Navigation/Tabs',
  subcomponents: { TabList, Tab } as Record<string, ComponentType<any>>,
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const ButtonFilled: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList items={ITEMS} variant="buttonFilledGray">
        {(item) => <Tab key={item.id}>{item.title}</Tab>}
      </TabList>
      {ITEMS.map((item) => (
        <TabPanel key={item.id} id={item.id}>
          {item.content}
        </TabPanel>
      ))}
    </Tabs>
  ),
};

export const ButtonBorder: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList items={ITEMS} variant="buttonWhiteBorder">
        {(item) => <Tab key={item.id}>{item.title}</Tab>}
      </TabList>
      {ITEMS.map((item) => (
        <TabPanel key={item.id} id={item.id}>
          {item.content}
        </TabPanel>
      ))}
    </Tabs>
  ),
};

export const Scrollable: Story = {
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Tabs {...args}>
        <TabList items={LONG_NAME_ITEMS} variant="buttonFilledGray">
          {(item) => <Tab key={item.id}>{item.title}</Tab>}
        </TabList>
        {LONG_NAME_ITEMS.map((item) => (
          <TabPanel key={item.id} id={item.id}>
            {item.content}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  ),
};

export const XsBorder: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList items={ITEMS} size="xs" variant="buttonWhiteBorder">
        {(item) => <Tab key={item.id}>{item.title}</Tab>}
      </TabList>
      {ITEMS.map((item) => (
        <TabPanel key={item.id} id={item.id}>
          {item.content}
        </TabPanel>
      ))}
    </Tabs>
  ),
};

export const Modern: Story = {
  render: (args) => (
    <div>
      <span>TabList Modern</span>
      <Tabs {...args}>
        <TabList items={LONG_NAME_ITEMS} variant="modern" size="md">
          {(item) => <Tab key={item.id}>{item.title}</Tab>}
        </TabList>
        {LONG_NAME_ITEMS.map((item) => (
          <TabPanel key={item.id} id={item.id}>
            {item.content}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  ),
};

export const WithScrollButton: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ width: '300px' }}>
        <span>Button Filled</span>
        <Tabs {...args}>
          <TabList hasScrollButton items={ITEMS} variant="buttonFilledGray">
            {(item) => <Tab key={item.id}>{item.title}</Tab>}
          </TabList>
          {ITEMS.map((item) => (
            <TabPanel key={item.id} id={item.id}>
              {item.content}
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <div style={{ width: '300px' }}>
        <span>Button Border</span>
        <Tabs {...args}>
          <TabList hasScrollButton items={ITEMS} variant="buttonWhiteBorder">
            {(item) => <Tab key={item.id}>{item.title}</Tab>}
          </TabList>
          {ITEMS.map((item) => (
            <TabPanel key={item.id} id={item.id}>
              {item.content}
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <div style={{ width: '400px' }}>
        <span>Scrollable</span>
        <Tabs {...args}>
          <TabList
            hasScrollButton
            items={LONG_NAME_ITEMS}
            variant="buttonFilledGray"
          >
            {(item) => <Tab key={item.id}>{item.title}</Tab>}
          </TabList>
          {LONG_NAME_ITEMS.map((item) => (
            <TabPanel key={item.id} id={item.id}>
              {item.content}
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <div style={{ width: '400px' }}>
        <span>Modern</span>
        <Tabs {...args}>
          <TabList
            hasScrollButton
            items={LONG_NAME_ITEMS}
            variant="modern"
            size="md"
          >
            {(item) => <Tab key={item.id}>{item.title}</Tab>}
          </TabList>
          {LONG_NAME_ITEMS.map((item) => (
            <TabPanel key={item.id} id={item.id}>
              {item.content}
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  ),
};
