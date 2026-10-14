import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import type { Key, Selection } from 'react-aria-components';
import { useListData } from 'react-stately';

import { Button } from '../Button';
import { RemoveButton } from '../RemoveButton';
import { Tag, TagGroup } from '../TagGroup';
import { ComboBox } from './ComboBox';
import { ComboBoxItem } from './components/ComboBoxItem';
import { MultiComboBox } from './MultiComboBox';
import type { OptionType } from './sb/mock';
import { OPTIONS } from './sb/mock';

const meta: Meta<typeof ComboBox> = {
  component: ComboBox,
  args: {},
  argTypes: {},
  title: 'Forms/ComboBox',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ComboBox>;

export const Default: Story = {
  args: {},
  render: function Render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '320px',
          gap: '12px',
        }}
      >
        <ComboBox
          label="Combobox"
          defaultItems={OPTIONS}
          placeholder="Placeholder"
          emptyStateText="Nothing found"
          allowsCustomValue
        >
          {(item) => (
            <ComboBoxItem textValue={item.name} id={item.id}>
              {item.name}
            </ComboBoxItem>
          )}
        </ComboBox>
      </div>
    );
  },
};

export const MultipleUncontrolled: Story = {
  args: {},
  render: function Render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '320px',
          gap: '12px',
        }}
      >
        <MultiComboBox
          label="MultiComboBox Uncontrolled"
          name="MultiComboBox Uncontrolled"
          items={OPTIONS}
          placeholder="Placeholder"
          emptyStateText="Nothing found"
          getKey={(x) => x.name}
          getLabel={(x) => x.id}
        >
          {(item) => (
            <ComboBoxItem {...item} textValue={item.name} id={item.id}>
              {item.name}
            </ComboBoxItem>
          )}
        </MultiComboBox>
      </div>
    );
  },
};

export const MultipleURedefinedKeyValue: Story = {
  args: {},
  render: function Render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '320px',
          gap: '12px',
        }}
      >
        <MultiComboBox
          label="MultiComboBox with redefined key"
          name="MultiComboBox with redefined key"
          items={OPTIONS}
          placeholder="Placeholder"
          emptyStateText="Nothing found"
          getKey={(x) => x.name}
          getLabel={(x) => x.id}
        >
          {(item) => (
            <ComboBoxItem {...item} textValue={item.name} id={item.id}>
              {item.name}
            </ComboBoxItem>
          )}
        </MultiComboBox>
      </div>
    );
  },
};

export const MultipleControlled: Story = {
  args: {},
  render: function Render() {
    const [state, setState] = useState<Selection>();
    const [stateItems, setStateItems] = useState<Array<OptionType>>();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '320px',
          gap: '12px',
        }}
      >
        <MultiComboBox
          label="MultiComboBox Controlled"
          name="MultiComboBox Controlled"
          items={OPTIONS}
          placeholder="Placeholder"
          emptyStateText="Nothing found"
          onSelectionChange={(keys) => setState(keys)}
          getItemsOnSelectionChange={(items) => setStateItems(items)}
        >
          {(item) => (
            <ComboBoxItem {...item} textValue={item.name} id={item.id}>
              {item.name}
            </ComboBoxItem>
          )}
        </MultiComboBox>
        <div>{state && [...state].join(', ')}</div>
        <div>
          {stateItems?.map((x, i) => (
            <div key={i}>{Object.values(x).toString()}</div>
          ))}
        </div>
      </div>
    );
  },
};

export const MultipleWithSelectAndClearAll: Story = {
  args: {},
  render: function Render() {
    const selectedItems = useListData<OptionType>({
      initialItems: [],
    });

    const onRemove = useCallback(
      (keys: Set<Key>) => {
        const key = keys.values().next().value;
        if (key) {
          selectedItems.remove(key);
        }
      },
      [selectedItems],
    );

    const onClear = useCallback(() => {
      const selectedKeys = selectedItems.items.map((i) => i.id);

      selectedKeys.forEach((key) => selectedItems.remove(key));
    }, [selectedItems]);

    const onSelectAll = (): void => {
      if (OPTIONS.length > selectedItems.items.length) {
        const itemsToSelect = OPTIONS.filter(
          (item) => !selectedItems.getItem(item.id),
        );

        itemsToSelect.forEach((key) => selectedItems.append(key));
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '320px',
          gap: '12px',
        }}
      >
        <MultiComboBox
          label="With select all"
          name="With select all"
          items={OPTIONS}
          aria-label={'multi-combobox-select-all'}
          placeholder="Placeholder"
          selectedItems={selectedItems}
          emptyStateText="Nothing found"
          hideTags
          showInputCounter
        >
          {(item) => (
            <ComboBoxItem {...item} textValue={item.name} id={item.id}>
              {item.name}
            </ComboBoxItem>
          )}
        </MultiComboBox>
        {!!selectedItems.items.length && (
          <Button
            size="sm"
            colorScheme="secondary"
            variant="outline"
            onPress={onClear}
          >
            Clear {`(${selectedItems.items.length})`}
          </Button>
        )}
        {selectedItems.items.length !== OPTIONS.length && (
          <Button
            size="sm"
            colorScheme="secondary"
            variant="outline"
            onPress={onSelectAll}
          >
            SelectAll {`(${OPTIONS.length - selectedItems.items.length})`}
          </Button>
        )}
        <TagGroup
          aria-label={'selected-tags'}
          items={selectedItems.items}
          onRemove={onRemove}
        >
          {(item) => (
            <Tag textValue={item.name}>
              {item.name}
              <RemoveButton size="sm" colorScheme="pale" slot="remove" />
            </Tag>
          )}
        </TagGroup>
      </div>
    );
  },
};
