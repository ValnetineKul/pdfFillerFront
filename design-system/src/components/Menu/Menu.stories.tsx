import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { MenuItem as AriaMenuItem } from 'react-aria-components';
import { MenuTrigger } from 'react-aria-components';

import { css } from '#styled-system/css';

import { FeaturedCard } from '../FeaturedCard';
import { FeaturedIcon } from '../FeaturedIcon';
import { IconButton } from '../IconButton';
import { Popover } from '../Popover';
import { Separator } from '../Separator';
import { Menu, MenuItem } from './Menu';

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'Collections/Menu',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {},
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <MenuTrigger onOpenChange={(x) => setIsOpen(x)}>
        <IconButton variant="outline" colorScheme="secondary" aria-label="Menu">
          <Icon
            name="arrows/chevron-down"
            style={isOpen ? { transform: 'rotate(180deg)' } : undefined}
          />
        </IconButton>
        <Popover>
          <Menu>
            <MenuItem
              beforeSlot={<Icon name="users/user-01" />}
              afterSlot={<Icon name="general/filter-lines" />}
            >
              View profile
            </MenuItem>
            <Separator />
            <MenuItem>Setting</MenuItem>
            <Separator />
            <MenuItem>Team</MenuItem>
            <Separator />
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    );
  },
};

type Wallet = {
  id: string;
  currency: string;
  balance: number;
  description: string;
  isBonus: boolean;
};

const WALLETS: Array<Wallet> = [
  {
    id: '1',
    currency: 'ETH',
    balance: 100,
    description: 'Бонусный баланс',
    isBonus: true,
  },
  {
    id: '2',
    currency: 'BTC',
    balance: 200,
    description: 'Бонусный баланс',
    isBonus: true,
  },
  {
    id: '3',
    currency: 'USDT',
    balance: 300,
    description: 'Основной баланс',
    isBonus: false,
  },
];

export const MenuWithWallets: Story = {
  args: {},
  render: function Render() {
    const wallets = useMemo(
      () =>
        WALLETS.map((w) => ({
          id: w.id,
          title: `${w.currency} ${w.balance}`,
          description: w.description,
          isBonus: w.isBonus,
        })),
      [],
    );

    const [isOpen, setIsOpen] = useState(false);

    return (
      <MenuTrigger onOpenChange={(x) => setIsOpen(x)}>
        <IconButton
          className={css({ position: 'relative', minWidth: '60' })}
          variant="outline"
          colorScheme="secondary"
          aria-label="Menu"
        >
          <span>{wallets?.[0]?.title}</span>
          <Icon
            name="arrows/chevron-down"
            className={css({ marginLeft: 'auto' })}
            style={isOpen ? { transform: 'rotate(180deg)' } : undefined}
          />
          <div
            className={css({
              width: '6',
              height: '6',
              marginLeft: '3',
            })}
          >
            <div
              className={css({
                position: 'absolute',
                right: '-0.25',
                bottom: '-0.25',
              })}
            >
              <IconButton
                size="md"
                colorScheme="primary"
                className={css({
                  _pressed: { backgroundColor: 'button.primary.default.bg!' },
                })}
              >
                <Icon name="finance-and-ecommerce/wallet-03" />
              </IconButton>
            </div>
          </div>
        </IconButton>
        <Popover>
          <Menu>
            {wallets?.map((w) => (
              <AriaMenuItem
                key={w.id}
                className={css({
                  display: 'flex',
                  gap: '3',
                  padding: '0',
                  width: 'var(--trigger-width)',
                })}
              >
                <FeaturedCard
                  withoutBorder
                  icon={
                    <>
                      {w.isBonus && (
                        <FeaturedIcon
                          colorScheme={'warning'}
                          size={'md'}
                          type={'circle'}
                        >
                          <Icon
                            name="finance-and-ecommerce/sale-01"
                            className={css({
                              stroke: 'featuredIcon.warning.fg',
                            })}
                          />
                        </FeaturedIcon>
                      )}
                      {!w.isBonus && (
                        <FeaturedIcon
                          colorScheme={'primary'}
                          size={'md'}
                          type={'circle'}
                        >
                          <Icon name="finance-and-ecommerce/wallet-03" />
                        </FeaturedIcon>
                      )}
                    </>
                  }
                  label={w.title}
                  description={w.description}
                />
              </AriaMenuItem>
            ))}
          </Menu>
        </Popover>
      </MenuTrigger>
    );
  },
};
