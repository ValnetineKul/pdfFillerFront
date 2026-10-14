import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';
import { ListBoxItem } from 'react-aria-components';
import { useListData } from 'react-stately';
import { RemoveButton, Tag, TagGroup } from 'src';

import { css, cx, sva } from '#styled-system/css';
import { multiSelectRecipe } from '#styled-system/recipes';

import { EmptyStateMessage } from '../ComboBox/components/EmptyStateMessage';
import { MultipleSelect } from './MultipleSelect';

const meta: Meta<typeof MultipleSelect> = {
  component: MultipleSelect,
  args: {},
  argTypes: {},
  title: 'Forms/MultipleSelect',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const listBoxIconStyles = sva({
  slots: ['icon'],
  base: {
    icon: {
      marginLeft: 'auto',
      strokeWidth: '0.5',
    },
  },
  variants: {
    isSelected: {
      true: {
        icon: {
          color: 'fg.brand.primary',
        },
      },
    },
  },
});

type Story = StoryObj<typeof MultipleSelect>;
const DEFAULT_ITEMS = [
  { id: 1, name: 'Travel' },
  { id: 2, name: 'Food' },
  { id: 3, name: 'Fashion' },
  { id: 4, name: 'Music' },
  { id: 5, name: 'Photography' },
  { id: 6, name: 'Marvel' },
  { id: 7, name: 'Movies' },
];

export const Uncontrolled: Story = {
  args: {},
  render: function Render() {
    const listData = useListData({
      initialItems: DEFAULT_ITEMS,
      getKey: (item) => item.id,
      initialSelectedKeys: [],
    });

    const classnames = multiSelectRecipe();

    return (
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <MultipleSelect
          aria-label="Fruits"
          items={listData.items}
          label="Выберите хобби"
          placeholder="Введите хобби"
          getLabel={(item) => item.name}
          getKey={(item) => item.id}
          renderEmptyState={() => (
            <EmptyStateMessage emptyStateText={'Ничего не найдено'} />
          )}
          searchable
        >
          {(item) => (
            <ListBoxItem
              className={cx(
                classnames.listBoxItem,
                css({
                  display: 'flex',
                  gap: '2',
                }),
              )}
              key={item.id}
              textValue={item.name}
            >
              {({ isSelected }) => (
                <>
                  <span>{item.name}</span>
                  {isSelected && (
                    <Icon
                      name="general/check"
                      className={listBoxIconStyles({ isSelected }).icon}
                    />
                  )}
                </>
              )}
            </ListBoxItem>
          )}
        </MultipleSelect>
      </div>
    );
  },
};

export const Controlled: Story = {
  args: {},
  render: function Render() {
    const listData = useListData({
      initialItems: DEFAULT_ITEMS,
      getKey: (item) => item.id,
      initialSelectedKeys: [],
    });

    const selectedKeys = new Set(listData.selectedKeys);

    const classnames = multiSelectRecipe();

    return (
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <MultipleSelect
          aria-label="Fruits"
          selectedKeys={selectedKeys}
          onSelectionChange={listData.setSelectedKeys}
          items={listData.items}
          label="Выберите хобби"
          placeholder="Введите хобби"
          getLabel={(item) => item.name}
          getKey={(item) => item.id}
          renderEmptyState={() => (
            <EmptyStateMessage emptyStateText={'Ничего не найдено'} />
          )}
          searchable
        >
          {(item) => (
            <ListBoxItem
              className={cx(
                classnames.listBoxItem,
                css({
                  display: 'flex',
                  gap: '2',
                }),
              )}
              key={item.id}
              textValue={item.name}
            >
              {({ isSelected }) => (
                <>
                  <span>{item.name}</span>
                  {isSelected && (
                    <Icon
                      name="general/check"
                      className={listBoxIconStyles({ isSelected }).icon}
                    />
                  )}
                </>
              )}
            </ListBoxItem>
          )}
        </MultipleSelect>
      </div>
    );
  },
};

export const WithSlots: Story = {
  args: {},
  render: function Render() {
    const listData = useListData({
      initialItems: DEFAULT_ITEMS,
      getKey: (item) => item.id,
      initialSelectedKeys: [],
    });

    const selectedKeys = new Set(listData.selectedKeys);

    const selectedItems = useMemo(
      () => [...selectedKeys].map(listData.getItem),
      [selectedKeys],
    ) as Array<{ id: number; name: string }>;

    const classnames = multiSelectRecipe();

    return (
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <MultipleSelect
          aria-label="Fruits"
          selectedKeys={selectedKeys}
          onSelectionChange={listData.setSelectedKeys}
          items={listData.items}
          isRequired
          searchable
          leftSlot={
            <div
              className={css({
                display: 'flex',
                gap: '2',
                alignItems: 'center',
              })}
            >
              <Icon
                name="communication/message-chat-circle"
                className={css({ width: '5', height: '5' })}
              />
              {selectedItems.length > 0 && (
                <TagGroup
                  items={[selectedItems?.[0]]}
                  onRemove={() => {
                    const keys = new Set(selectedKeys);
                    keys.delete(selectedItems?.[0].id);
                    listData.setSelectedKeys(keys);
                  }}
                  aria-label="tags-collections-with-remove-function"
                >
                  {(listItem) => (
                    <Tag textValue={listItem.name}>
                      {listItem.name}
                      <RemoveButton
                        size="sm"
                        colorScheme="pale"
                        slot="remove"
                      />
                    </Tag>
                  )}
                </TagGroup>
              )}
            </div>
          }
          rightSlot={
            selectedItems?.length - 1 > 0 ? (
              <>+{selectedItems?.length - 1}</>
            ) : null
          }
          label="Выберите хобби"
          placeholder="Введите хобби"
          getLabel={(item) => item.name}
          getKey={(item) => item.id}
          renderEmptyState={() => (
            <EmptyStateMessage emptyStateText={'Ничего не найдено'} />
          )}
          listBoxTopSlot={
            selectedItems?.length > 0 && (
              <button
                className={cx(
                  classnames.listBoxItem,
                  css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2',
                    textStyle: 'sm',
                    fontWeight: 'bold',
                  }),
                )}
                onClick={() => listData.setSelectedKeys(new Set())}
              >
                <Icon
                  name="general/x-close"
                  className={css({ width: '4', height: '4' })}
                />
                <span>Clear all</span>
              </button>
            )
          }
        >
          {(item) => (
            <ListBoxItem
              className={cx(
                classnames.listBoxItem,
                css({
                  display: 'flex',
                  gap: '2',
                }),
              )}
              key={item.id}
              textValue={item.name}
            >
              {({ isSelected }) => (
                <>
                  <span>{item.name}</span>
                  {isSelected && (
                    <Icon
                      name="general/check"
                      className={listBoxIconStyles({ isSelected }).icon}
                    />
                  )}
                </>
              )}
            </ListBoxItem>
          )}
        </MultipleSelect>
      </div>
    );
  },
};

type CustomItem = {
  identifier: number;
  label: string;
};

export const WithCustomKeysAndLabels: Story = {
  args: {},
  render: function Render() {
    const listData = useListData({
      initialItems: DEFAULT_ITEMS.map((item) => ({
        identifier: item.id,
        label: item.name,
      })),
      getKey: (item) => item.identifier,
      initialSelectedKeys: [],
    });

    const selectedKeys = new Set(listData.selectedKeys);

    const selectedItems = useMemo(
      () => [...selectedKeys].map(listData.getItem),
      [selectedKeys],
    ) as Array<CustomItem>;

    const classnames = multiSelectRecipe();

    return (
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <MultipleSelect
          aria-label="Fruits"
          selectedKeys={selectedKeys}
          onSelectionChange={listData.setSelectedKeys}
          items={listData.items}
          isRequired
          label="Выберите хобби"
          placeholder="Введите хобби"
          getLabel={(item) => item.label}
          getKey={(item) => item.identifier}
          renderEmptyState={() => (
            <EmptyStateMessage emptyStateText={'Ничего не найдено'} />
          )}
          searchable
          listBoxTopSlot={
            selectedItems?.length > 0 && (
              <button
                className={cx(
                  classnames.listBoxItem,
                  css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2',
                    textStyle: 'sm',
                    fontWeight: 'bold',
                  }),
                )}
                onClick={() => listData.setSelectedKeys(new Set())}
              >
                <Icon
                  name="general/x-close"
                  className={css({ width: '4', height: '4' })}
                />
                <span>Clear all</span>
              </button>
            )
          }
        >
          {(item) => (
            <ListBoxItem
              className={cx(
                classnames.listBoxItem,
                css({
                  display: 'flex',
                  gap: '2',
                }),
              )}
              id={item.identifier}
            >
              {({ isSelected }) => (
                <>
                  <span>{item.label}</span>
                  {isSelected && (
                    <Icon
                      name="general/check"
                      className={listBoxIconStyles({ isSelected }).icon}
                    />
                  )}
                </>
              )}
            </ListBoxItem>
          )}
        </MultipleSelect>
      </div>
    );
  },
};

export const WithoutSearch: Story = {
  args: {},
  render: function Render() {
    const listData = useListData({
      initialItems: DEFAULT_ITEMS.map((item) => ({
        identifier: item.id,
        label: item.name,
      })),
      getKey: (item) => item.identifier,
      initialSelectedKeys: [],
    });

    const selectedKeys = new Set(listData.selectedKeys);

    const selectedItems = useMemo(
      () => [...selectedKeys].map(listData.getItem),
      [selectedKeys],
    ) as Array<CustomItem>;

    const classnames = multiSelectRecipe();

    return (
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <MultipleSelect
          aria-label="Fruits"
          selectedKeys={selectedKeys}
          onSelectionChange={listData.setSelectedKeys}
          items={listData.items}
          isRequired
          label="Выберите хобби"
          placeholder="Введите хобби"
          getLabel={(item) => item.label}
          getKey={(item) => item.identifier}
          renderEmptyState={() => (
            <EmptyStateMessage emptyStateText={'Ничего не найдено'} />
          )}
          searchable={false}
          listBoxTopSlot={
            selectedItems?.length > 0 && (
              <button
                className={cx(
                  classnames.listBoxItem,
                  css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2',
                    textStyle: 'sm',
                    fontWeight: 'bold',
                  }),
                )}
                onClick={() => listData.setSelectedKeys(new Set())}
              >
                <Icon
                  name="general/x-close"
                  className={css({ width: '4', height: '4' })}
                />
                <span>Clear all</span>
              </button>
            )
          }
        >
          {(item) => (
            <ListBoxItem
              className={cx(
                classnames.listBoxItem,
                css({
                  display: 'flex',
                  gap: '2',
                }),
              )}
              id={item.identifier}
            >
              {({ isSelected }) => (
                <>
                  <span>{item.label}</span>
                  {isSelected && (
                    <Icon
                      name="general/check"
                      className={listBoxIconStyles({ isSelected }).icon}
                    />
                  )}
                </>
              )}
            </ListBoxItem>
          )}
        </MultipleSelect>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {},
  render: function Render() {
    const listData = useListData({
      initialItems: DEFAULT_ITEMS,
      getKey: (item) => item.id,
      initialSelectedKeys: [],
    });

    const selectedKeys = new Set(listData.selectedKeys);

    const selectedItems = useMemo(
      () => [...selectedKeys].map(listData.getItem),
      [selectedKeys],
    ) as Array<{ id: number; name: string }>;

    const classnames = multiSelectRecipe();

    return (
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <MultipleSelect
          aria-label="Fruits"
          selectedKeys={selectedKeys}
          onSelectionChange={listData.setSelectedKeys}
          items={listData.items}
          isDisabled
          searchable
          leftSlot={
            <div
              className={css({
                display: 'flex',
                gap: '2',
                alignItems: 'center',
              })}
            >
              <Icon
                name="communication/message-chat-circle"
                className={css({ width: '5', height: '5' })}
              />
              {selectedItems.length > 0 && (
                <TagGroup
                  items={[selectedItems?.[0]]}
                  onRemove={() => {
                    const keys = new Set(selectedKeys);
                    keys.delete(selectedItems?.[0].id);
                    listData.setSelectedKeys(keys);
                  }}
                  aria-label="tags-collections-with-remove-function"
                >
                  {(listItem) => (
                    <Tag textValue={listItem.name}>
                      {listItem.name}
                      <RemoveButton
                        size="sm"
                        colorScheme="pale"
                        slot="remove"
                      />
                    </Tag>
                  )}
                </TagGroup>
              )}
            </div>
          }
          rightSlot={
            selectedItems?.length - 1 > 0 ? (
              <>+{selectedItems?.length - 1}</>
            ) : null
          }
          label="Выберите хобби"
          placeholder="Введите хобби"
          getLabel={(item) => item.name}
          getKey={(item) => item.id}
          renderEmptyState={() => (
            <EmptyStateMessage emptyStateText={'Ничего не найдено'} />
          )}
          listBoxTopSlot={
            selectedItems?.length > 0 && (
              <button
                className={cx(
                  classnames.listBoxItem,
                  css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2',
                    textStyle: 'sm',
                    fontWeight: 'bold',
                  }),
                )}
                onClick={() => listData.setSelectedKeys(new Set())}
              >
                <Icon
                  name="general/x-close"
                  className={css({ width: '4', height: '4' })}
                />
                <span>Clear all</span>
              </button>
            )
          }
        >
          {(item) => (
            <ListBoxItem
              className={cx(
                classnames.listBoxItem,
                css({
                  display: 'flex',
                  gap: '2',
                }),
              )}
              key={item.id}
              textValue={item.name}
            >
              {({ isSelected }) => (
                <>
                  <span>{item.name}</span>
                  {isSelected && (
                    <Icon
                      name="general/check"
                      className={listBoxIconStyles({ isSelected }).icon}
                    />
                  )}
                </>
              )}
            </ListBoxItem>
          )}
        </MultipleSelect>
      </div>
    );
  },
};

export const WithErrors: Story = {
  args: {},
  render: function Render() {
    const listData = useListData({
      initialItems: DEFAULT_ITEMS,
      getKey: (item) => item.id,
      initialSelectedKeys: [],
    });

    const selectedKeys = new Set(listData.selectedKeys);

    const selectedItems = useMemo(
      () => [...selectedKeys].map(listData.getItem),
      [selectedKeys],
    ) as Array<{ id: number; name: string }>;

    const classnames = multiSelectRecipe();

    return (
      <div
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <MultipleSelect
          aria-label="Fruits"
          selectedKeys={selectedKeys}
          onSelectionChange={listData.setSelectedKeys}
          items={listData.items}
          isInvalid
          searchable
          errorMessage="Ошибка выбора!"
          leftSlot={
            <div
              className={css({
                display: 'flex',
                gap: '2',
                alignItems: 'center',
              })}
            >
              <Icon
                name="communication/message-chat-circle"
                className={css({ width: '5', height: '5' })}
              />
              {selectedItems.length > 0 && (
                <TagGroup
                  items={[selectedItems?.[0]]}
                  onRemove={() => {
                    const keys = new Set(selectedKeys);
                    keys.delete(selectedItems?.[0].id);
                    listData.setSelectedKeys(keys);
                  }}
                  aria-label="tags-collections-with-remove-function"
                >
                  {(listItem) => (
                    <Tag textValue={listItem.name}>
                      {listItem.name}
                      <RemoveButton
                        size="sm"
                        colorScheme="pale"
                        slot="remove"
                      />
                    </Tag>
                  )}
                </TagGroup>
              )}
            </div>
          }
          rightSlot={
            selectedItems?.length - 1 > 0 ? (
              <>+{selectedItems?.length - 1}</>
            ) : null
          }
          label="Выберите хобби"
          placeholder="Введите хобби"
          getLabel={(item) => item.name}
          getKey={(item) => item.id}
          renderEmptyState={() => (
            <EmptyStateMessage emptyStateText={'Ничего не найдено'} />
          )}
          listBoxTopSlot={
            selectedItems?.length > 0 && (
              <button
                className={cx(
                  classnames.listBoxItem,
                  css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2',
                    textStyle: 'sm',
                    fontWeight: 'bold',
                  }),
                )}
                onClick={() => listData.setSelectedKeys(new Set())}
              >
                <Icon
                  name="general/x-close"
                  className={css({ width: '4', height: '4' })}
                />
                <span>Clear all</span>
              </button>
            )
          }
        >
          {(item) => (
            <ListBoxItem
              className={cx(
                classnames.listBoxItem,
                css({
                  display: 'flex',
                  gap: '2',
                }),
              )}
              key={item.id}
              textValue={item.name}
            >
              {({ isSelected }) => (
                <>
                  <span>{item.name}</span>
                  {isSelected && (
                    <Icon
                      name="general/check"
                      className={listBoxIconStyles({ isSelected }).icon}
                    />
                  )}
                </>
              )}
            </ListBoxItem>
          )}
        </MultipleSelect>
      </div>
    );
  },
};
