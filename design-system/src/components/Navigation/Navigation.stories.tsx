import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { mergeProps } from 'react-aria';
import type { Key } from 'react-aria-components';
import { Collection, TreeItem, TreeItemContent } from 'react-aria-components';
import type { Selection } from 'react-stately';
import { action } from 'storybook/actions';
import { useArgs } from 'storybook/preview-api';

import { navigationItemRecipe } from '#styled-system/recipes';

import type { NavItemProps } from './components/NavItem';
import { NavItem } from './components/NavItem';
import type { NavigationProps } from './Navigation';
import { Navigation } from './Navigation';
import { EXPANDED_ITEMS, ITEMS } from './sb/mock';

interface ExtendedNavigationProps extends NavigationProps<NavItemProps> {
  selectedKeys: Set<Key>;
  updateArgs: (args: Partial<NavigationProps<NavItemProps>>) => void;
}

const meta: Meta<typeof Navigation> = {
  component: Navigation,
  args: {},
  argTypes: {},
  title: 'Navigation / Navigation',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Navigation>;
type ExpandedNavigationStory = StoryObj<ExtendedNavigationProps>;

export const Default: Story = {
  render: function Render(args) {
    const [{ selectedKeys }, updateArgs] =
      useArgs<NavigationProps<NavItemProps>>();

    /**
     * В реальном приложении это может быть функция навигации из роутера
     */

    function navigate(keys: Selection): void {
      action('onSelectionChange')(keys);
      if (keys instanceof Set) {
        keys.forEach((key) => {
          const item = ITEMS.find(
            (navItem) =>
              navItem.id === key ||
              navItem.action === key ||
              navItem.url === key,
          );
          if (item) {
            if (item.url) {
              window.location.href = item.url;
            } else if (item.action) {
              alert(item.action);
            }
          }
        });
      }
      updateArgs({ selectedKeys: keys });
    }

    return (
      <div
        style={{
          width: 390,
        }}
      >
        <Navigation
          {...args}
          aria-label="Default navigation"
          items={ITEMS}
          selectionBehavior="toggle"
          selectionMode={'single'}
          selectedKeys={selectedKeys}
          onSelectionChange={navigate}
        >
          {(item) => {
            return (
              <TreeItem
                {...item}
                textValue={item.name}
                id={item.url ?? item.action}
              >
                <TreeItemContent>
                  {(renderProps) => {
                    const mergedProps: NavItemProps = mergeProps(
                      item,
                      renderProps,
                    );
                    return (
                      <NavItem
                        {...mergedProps}
                        colorScheme={'gray'}
                        iconType={'icon'}
                      />
                    );
                  }}
                </TreeItemContent>
              </TreeItem>
            );
          }}
        </Navigation>
      </div>
    );
  },
};

export const ColorSchemes: Story = {
  render: function Render(args) {
    return (
      <div
        style={{
          width: 390,
        }}
      >
        <Navigation
          {...args}
          aria-label="Color schemes"
          selectionMode="single"
          selectionBehavior="toggle"
        >
          {navigationItemRecipe.variantMap.colorScheme.map(
            (colorScheme, index) => {
              return (
                <TreeItem textValue={colorScheme} key={index}>
                  <TreeItemContent>
                    {(renderProps) => {
                      return (
                        <NavItem
                          {...renderProps}
                          name={colorScheme}
                          colorScheme={colorScheme}
                          icon={<Icon name="casino/roulette" />}
                          badge="10"
                          iconType="featuredIcon"
                        />
                      );
                    }}
                  </TreeItemContent>
                </TreeItem>
              );
            },
          )}
        </Navigation>
      </div>
    );
  },
};

export const SizeSchemes: Story = {
  render: function Render(args) {
    return (
      <div
        style={{
          width: 390,
        }}
      >
        <Navigation
          {...args}
          aria-label="Size schemes"
          selectionMode="single"
          selectionBehavior="toggle"
        >
          {navigationItemRecipe.variantMap.size.map((size, index) => {
            return (
              <TreeItem textValue={size} key={index}>
                <TreeItemContent>
                  {(renderProps) => {
                    return (
                      <NavItem
                        {...renderProps}
                        name={size}
                        icon={<Icon name="casino/roulette" />}
                        badge="10"
                        iconType="featuredIcon"
                        size={size}
                        colorScheme="purple"
                      />
                    );
                  }}
                </TreeItemContent>
              </TreeItem>
            );
          })}
        </Navigation>
      </div>
    );
  },
};

export const IconVariantSchemes: Story = {
  render: function Render(args) {
    return (
      <div
        style={{
          width: 390,
        }}
      >
        <Navigation
          {...args}
          aria-label="Icon variant schemes"
          selectionMode="single"
          selectionBehavior="toggle"
        >
          {navigationItemRecipe.variantMap.iconType.map((iconType, index) => {
            return (
              <TreeItem textValue={iconType} key={index}>
                <TreeItemContent>
                  {(renderProps) => {
                    return (
                      <NavItem
                        {...renderProps}
                        name={iconType}
                        icon={<Icon name="users/user-01" />}
                        badge="10"
                        dot
                        iconType={iconType}
                        colorScheme="gray"
                      />
                    );
                  }}
                </TreeItemContent>
              </TreeItem>
            );
          })}
        </Navigation>
      </div>
    );
  },
};

export const ExpandedTree: ExpandedNavigationStory = {
  decorators: [
    (Story) => {
      const [{ selectedKeys }, updateArgs] =
        useArgs<NavigationProps<NavItemProps>>();
      return <Story selectedKeys={selectedKeys} updateArgs={updateArgs} />;
    },
  ],
  render: function Render(args, { selectedKeys, updateArgs }) {
    /**
     * В реальном приложении это может быть функция навигации из роутера
     */

    function navigate(keys: Selection): void {
      action('onSelectionChange')(keys);
      if (keys instanceof Set) {
        keys.forEach((key) => {
          const item = ITEMS.find(
            (navItem) =>
              navItem.id === key ||
              navItem.action === key ||
              navItem.url === key,
          );
          if (item) {
            if (item.url) {
              window.location.href = item.url;
            } else if (item.action) {
              alert(item.action);
            }
          }
        });
      }
      updateArgs({ selectedKeys: keys });
    }

    const [expandedKeysState, setExpandedKeysState] = useState<Set<Key>>();

    function handleNavigationSelection(newSet: Set<Key>): Set<Key> {
      const lastSelectedKey = Array.from(newSet).pop() ?? '';
      return new Set([lastSelectedKey]);
    }

    return (
      <div
        style={{
          width: 390,
        }}
      >
        <Navigation
          {...args}
          aria-label="Expanded tree"
          items={EXPANDED_ITEMS}
          selectionBehavior="toggle"
          expandedKeys={expandedKeysState}
          onExpandedChange={(expandedKeys) => {
            setExpandedKeysState(handleNavigationSelection(expandedKeys));
          }}
          selectionMode={'single'}
          selectedKeys={selectedKeys}
          onSelectionChange={navigate}
        >
          {function renderItem(item) {
            return (
              <TreeItem
                {...item}
                textValue={item.name}
                id={item.url ?? item.action}
              >
                <TreeItemContent>
                  {(renderProps) => {
                    const mergedProps = mergeProps(item, renderProps);
                    return (
                      <NavItem
                        {...mergedProps}
                        colorScheme={'gray'}
                        iconType={'icon'}
                      />
                    );
                  }}
                </TreeItemContent>
                <Collection items={item.children}>{renderItem}</Collection>
              </TreeItem>
            );
          }}
        </Navigation>
      </div>
    );
  },
};

export const Collapsed: Story = {
  render: function Render(args) {
    const [{ selectedKeys }, updateArgs] =
      useArgs<NavigationProps<NavItemProps>>();

    /**
     * В реальном приложении это может быть функция навигации из роутера
     */

    function navigate(keys: Selection): void {
      action('onSelectionChange')(keys);
      updateArgs({ selectedKeys: keys });
    }

    return (
      <div>
        <Navigation
          {...args}
          aria-label="Collapsed navigation"
          items={ITEMS}
          selectionBehavior="toggle"
          selectionMode={'single'}
          selectedKeys={selectedKeys}
          onSelectionChange={navigate}
        >
          {(item) => {
            return (
              <TreeItem
                {...item}
                textValue={item.name}
                id={item.url ?? item.action}
              >
                <TreeItemContent>
                  {(renderProps) => {
                    const mergedProps: NavItemProps = mergeProps(
                      item,
                      renderProps,
                    );
                    return (
                      <NavItem
                        {...mergedProps}
                        colorScheme={'teal'}
                        iconType={'icon'}
                        isCollapsed
                      />
                    );
                  }}
                </TreeItemContent>
              </TreeItem>
            );
          }}
        </Navigation>
      </div>
    );
  },
};
