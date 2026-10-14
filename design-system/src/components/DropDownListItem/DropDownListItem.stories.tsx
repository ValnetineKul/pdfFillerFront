import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { Selection } from 'react-aria-components';
import {
  GridList,
  GridListItem,
  ListBox,
  ListBoxItem,
} from 'react-aria-components';

import { dropDownListItem } from '#styled-system/recipes';

import { IconButton } from '../IconButton';
import { Menu, MenuItem, MenuTrigger } from '../Menu';
import { Popover } from '../Popover';
import { Separator } from '../Separator';
import {
  DropDownListItem,
  type DropDownListItemProps,
} from './DropDownListItem';

type OptionType = { id: string; name: string };

const options: Array<OptionType> = [
  { id: '1', name: 'Aerospace' },
  { id: '2', name: 'Mechanical' },
  { id: '3', name: 'Civil' },
  {
    id: '4',
    name: 'Lorem ipsum dolor sit amet',
  },
];

const meta: Meta<DropDownListItemProps> = {
  component: DropDownListItem,
  title: 'Forms/DropDownListItem',
  args: { showSelectedItemIndication: true },
  argTypes: {
    showSelectedItemIndication: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'radio' },
      options: dropDownListItem.variantMap.size,
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<DropDownListItemProps>;

export const Default: Story = {
  render: function Render(args) {
    return (
      <>
        <ListBox
          selectionMode="multiple"
          selectionBehavior="toggle"
          aria-label="Basic example"
        >
          <ListBoxItem textValue="With Selected Indicator">
            {(renderProps) => {
              return (
                <DropDownListItem {...renderProps} {...args}>
                  With Selected Indicator
                </DropDownListItem>
              );
            }}
          </ListBoxItem>
          <ListBoxItem textValue="Without Selected Indicator">
            {(renderProps) => (
              <DropDownListItem
                {...renderProps}
                {...args}
                showSelectedItemIndication={false}
              >
                Without Selected Indicator
              </DropDownListItem>
            )}
          </ListBoxItem>
          <ListBoxItem textValue="With Before Slot">
            {(renderProps) => (
              <DropDownListItem
                {...renderProps}
                {...args}
                beforeSlot={<Icon name="general/minus-circle" />}
                afterSlot={<Icon name="general/plus-circle" />}
                showSelectedItemIndication={false}
              >
                With beforeSlot
              </DropDownListItem>
            )}
          </ListBoxItem>
          <ListBoxItem textValue="With Flag">
            {(renderProps) => (
              <DropDownListItem {...renderProps} {...args}>
                With flag
              </DropDownListItem>
            )}
          </ListBoxItem>
          <ListBoxItem textValue="Disabled">
            {(renderProps) => (
              <DropDownListItem
                {...renderProps}
                {...args}
                beforeSlot={<Icon name="general/minus-circle" />}
                showSelectedItemIndication={false}
                isDisabled
              >
                Disabled
              </DropDownListItem>
            )}
          </ListBoxItem>
        </ListBox>
      </>
    );
  },
};

export const WithListbox: Story = {
  render: function Render(args) {
    return (
      <ListBox
        items={options}
        selectionMode="multiple"
        selectionBehavior="toggle"
        aria-label="With ListBox example"
      >
        {(item) => (
          <ListBoxItem id={item.id} textValue={item.name}>
            {(renderProps) => (
              <DropDownListItem {...renderProps} {...args}>
                {item.name}
              </DropDownListItem>
            )}
          </ListBoxItem>
        )}
      </ListBox>
    );
  },
};

export const WithGridlist: Story = {
  render: function Render(args) {
    return (
      <GridList
        items={options}
        selectionMode="single"
        selectionBehavior="replace"
        aria-label="With Gridlist box example"
      >
        {(item) => (
          <GridListItem id={item.id} textValue={item.name}>
            {(renderProps) => (
              <DropDownListItem {...renderProps} {...args}>
                {item.name}
              </DropDownListItem>
            )}
          </GridListItem>
        )}
      </GridList>
    );
  },
};

export const InMenu: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<Selection>();
    return (
      <MenuTrigger onOpenChange={(x) => setIsOpen(x)}>
        <IconButton variant="outline" colorScheme="secondary" aria-label="Menu">
          <Icon
            name="arrows/chevron-down"
            style={isOpen ? { transform: 'rotate(180deg)' } : undefined}
          />
        </IconButton>
        <Popover>
          <Menu
            onSelectionChange={(key) => setActiveItem(key)}
            selectedKeys={activeItem}
            selectionMode="single"
          >
            <MenuItem
              beforeSlot={<Icon name="users/user-01" />}
              afterSlot={<Icon name="general/filter-lines" />}
              id={1}
              size="sm"
            >
              View profile
            </MenuItem>
            <Separator />
            <MenuItem id={2}>Setting</MenuItem>
            <MenuItem id={3}>Team</MenuItem>
            <MenuItem id={4}>Logout</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    );
  },
};

export const CustomComponentBasedOnSharedRecipeStyles: Story = {
  render: function Render() {
    const classes = dropDownListItem();
    return (
      <ListBox
        selectionMode="multiple"
        selectionBehavior="toggle"
        aria-label="Basic example"
      >
        <ListBoxItem
          className={classes.root}
          textValue="Reuse styles from recipe"
        >
          {({ isSelected }) => (
            <>
              <div className={classes.optionContent}>
                Reuse styles from recipe
              </div>
              {isSelected && (
                <Icon
                  name="general/check"
                  className={classes.selectedItemIndication}
                />
              )}
            </>
          )}
        </ListBoxItem>
      </ListBox>
    );
  },
};
