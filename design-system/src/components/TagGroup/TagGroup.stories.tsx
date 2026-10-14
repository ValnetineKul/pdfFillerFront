import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import type { Selection } from 'react-stately';
import { useListData } from 'react-stately';

import { css } from '#styled-system/css';
import { tagGroupRecipe } from '#styled-system/recipes';

import { Button } from '../Button';
import { RemoveButton } from '../RemoveButton';
import { Tag } from './base/Tag';
import { TagGroup } from './TagGroup';

const tagItems = [
  { id: '1', label: 'За первый депозит' },
  { id: '2', label: 'Спорт' },
  { id: '3', label: 'Казино' },
  { id: '4', label: 'Приветственный бонус' },
  { id: '5', label: 'Кибер спорт' },
  { id: '6', label: 'Игровой зал' },
];

const meta: Meta<typeof TagGroup> = {
  component: TagGroup,
  subcomponents: { Tag } as Record<string, ComponentType<any>>,
  title: 'Collections/TagGroup',
  args: {
    selectionMode: 'multiple',
  },
  argTypes: {
    isScrollable: { type: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TagGroup>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <TagGroup {...args} items={tagItems} aria-label="default">
      {(item) => <Tag>{item.label}</Tag>}
    </TagGroup>
  ),
};

export const Sizes: Story = {
  render: function Render(args) {
    return (
      <>
        {tagGroupRecipe.variantMap.size.map((size) => (
          <div key={size} style={{ display: 'inline-flex', gap: '16px' }}>
            <p>{size}</p>
            <TagGroup
              {...args}
              key={size}
              size={size}
              items={tagItems}
              aria-label="list-of-tag-sizes"
            >
              {(item) => (
                <Tag textValue={item.label}>
                  <RemoveButton size={size} colorScheme="pale" slot="remove" />
                  {item.label}
                </Tag>
              )}
            </TagGroup>
          </div>
        ))}
      </>
    );
  },
};

export const WithIconSlot: Story = {
  render: (args) => (
    <TagGroup {...args} aria-label="tag-with-icon-slot">
      <Tag textValue="with-slot">
        <Icon
          name="alerts-and-feedback/alert-circle"
          className={css({ iconSize: 'sm' })}
        />
        With Slot
        <Icon name="security/lock-01" className={css({ iconSize: 'sm' })} />
      </Tag>
    </TagGroup>
  ),
};

export const WithRemoveButtonSlot: Story = {
  render: function Render() {
    const list = useListData({
      initialItems: [
        { id: 1, name: 'News' },
        { id: 2, name: 'Travel' },
        { id: 3, name: 'Gaming' },
        { id: 4, name: 'Shopping' },
      ],
    });

    return (
      <TagGroup
        items={list.items}
        onRemove={(keys) => list.remove(...keys)}
        aria-label="tags-collections-with-remove-function"
      >
        {(listItem) => (
          <Tag textValue={listItem.name}>
            {listItem.name}
            <RemoveButton size="sm" colorScheme="pale" slot="remove" />
          </Tag>
        )}
      </TagGroup>
    );
  },
};

export const TagsMultiselect: Story = {
  render: function Render() {
    const options = [
      { id: 1, name: 'News' },
      { id: 2, name: 'Travel' },
      { id: 3, name: 'Gaming' },
      { id: 4, name: 'Shopping' },
    ];

    const taglist = useListData({
      initialItems: options,
      getKey: (item) => item.id,
    });

    const handleSelectTag = (keys: Selection): void => {
      taglist.setSelectedKeys(keys);
    };

    const clearTags = (): void => {
      taglist.setSelectedKeys(new Set());
    };

    const hasSelectedTags = [...taglist.selectedKeys].length > 0;

    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        {hasSelectedTags && <Button onPress={clearTags}>Clear</Button>}
        <TagGroup
          items={taglist.items}
          onSelectionChange={handleSelectTag}
          selectedKeys={taglist.selectedKeys}
          selectionMode={'multiple'}
          aria-label={'multiselect'}
        >
          {(listItem) => <Tag>{listItem.name}</Tag>}
        </TagGroup>
      </div>
    );
  },
};

export const Scrollable: Story = {
  render: function Render() {
    const list = useListData({
      initialItems: [
        { id: 1, name: 'News' },
        { id: 2, name: 'Travel' },
        { id: 3, name: 'Gaming' },
        { id: 4, name: 'Casino and more' },
        { id: 5, name: 'Another category' },
        { id: 6, name: 'Profile pages' },
        { id: 7, name: 'Settings' },
      ],
    });

    return (
      <div style={{ width: '320px' }}>
        <TagGroup
          isScrollable
          items={list.items}
          aria-label="scrollable-tags-collections"
        >
          {(listItem) => <Tag textValue={listItem.name}>{listItem.name}</Tag>}
        </TagGroup>
      </div>
    );
  },
};
