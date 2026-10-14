import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { ListBoxItem, TooltipTrigger } from 'react-aria-components';

import { css } from '#styled-system/css';

import { FeaturedCard } from '../FeaturedCard';
import { FeaturedIcon } from '../FeaturedIcon';
import { IconButton } from '../IconButton';
import { Flex } from '../Layout';
import { Tooltip } from '../Tooltip';
import { Select } from './Select';
import { SelectItem } from './SelectItem';

type OptionType = { id: string; name: string };

const options: Array<OptionType> = [
  { id: '1', name: 'Aerospace' },
  { id: '2', name: 'Mechanical' },
  { id: '3', name: 'Civil' },
  {
    id: '4',
    name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi atque commodi',
  },
  { id: '5', name: 'Nuclear' },
  { id: '6', name: 'Industrial' },
  { id: '7', name: 'Chemical' },
  { id: '8', name: 'Agricultural' },
  { id: '9', name: 'Electrical' },
  { id: '10', name: 'Special' },
  { id: '11', name: 'Equipment' },
  { id: '12', name: 'Exclusive' },
  { id: '13', name: 'Environmental ' },
];

const meta: Meta<typeof Select<OptionType>> = {
  component: Select,
  title: 'Forms/Select',
  args: { items: options },
  argTypes: {
    description: { type: 'string' },
    errorMessage: { type: 'string' },
    placeholder: { type: 'string' },
    isInvalid: { type: 'boolean' },
    isDisabled: { type: 'boolean' },
    isRequired: { type: 'boolean' },
    disabledKeys: {
      control: { type: 'select' },
      options: options.map(({ id }) => id),
    },
    necessityIndicator: {
      description: 'This show aster symbol when field is required',
      table: { category: 'State' },
      control: { type: 'boolean' },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Select<OptionType>>;

export const Default: Story = {
  args: {},
  render: function Render(args) {
    return (
      <div style={{ width: '320px' }}>
        <Select {...args} label="Select">
          {(item) => (
            <SelectItem
              id={item.id}
              textValue={item.name}
              isDisabled={args.isDisabled}
            >
              {item.name}
            </SelectItem>
          )}
        </Select>
      </div>
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

type SelectWallet = {
  id: string;
  title: string;
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

export const WithSlots: Story = {
  args: {},
  render: function Render(args) {
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

    const [selectedWallet, setSelectedWallet] = useState(wallets?.[0]);

    return (
      <div style={{ width: '320px' }}>
        <Select<SelectWallet>
          {...args}
          rightSlot={
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
                  size="lg"
                  colorScheme="primary"
                  className={css({
                    _pressed: { backgroundColor: 'button.primary.default.bg!' },
                  })}
                >
                  <Icon
                    name="finance-and-ecommerce/wallet-03"
                    className={css({ iconSize: 'md' })}
                  />
                </IconButton>
              </div>
            </div>
          }
          selectedKey={selectedWallet.id}
          onSelectionChange={(key) =>
            setSelectedWallet(
              wallets?.find((w) => w.id === key) ?? wallets?.[0],
            )
          }
          items={wallets}
          renderValue={(renderParams) => {
            const selectedItem = renderParams?.selectedItem;

            if (!selectedItem) return null;

            return (
              <>
                {selectedItem?.isBonus && (
                  <FeaturedIcon
                    colorScheme={'warning'}
                    size={'xs'}
                    type={'circle'}
                  >
                    <Icon
                      name="finance-and-ecommerce/sale-01"
                      className={css({ stroke: 'featuredIcon.warning.fg' })}
                    />
                  </FeaturedIcon>
                )}
                {selectedItem?.title && <div>{selectedItem?.title}</div>}
              </>
            );
          }}
        >
          {(item) => (
            <ListBoxItem
              id={item.id}
              textValue={item.description}
              isDisabled={args.isDisabled}
              className={css({ display: 'flex', gap: '3' })}
            >
              <FeaturedCard
                withoutBorder
                icon={
                  <>
                    {item.isBonus && (
                      <FeaturedIcon
                        colorScheme={'warning'}
                        size={'md'}
                        type={'circle'}
                      >
                        <Icon
                          name="finance-and-ecommerce/sale-01"
                          className={css({ stroke: 'featuredIcon.warning.fg' })}
                        />
                      </FeaturedIcon>
                    )}
                    {!item.isBonus && (
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
                label={item.title}
                description={item.description}
              />
            </ListBoxItem>
          )}
        </Select>
      </div>
    );
  },
};

export const WithLabelHint: Story = {
  args: {},
  render: (args) => {
    return (
      <Flex flexDirection="column" gap="4" style={{ width: '320px' }}>
        <Select
          {...args}
          label="Select"
          isRequired
          necessityIndicator
          labelHint={
            <TooltipTrigger delay={0}>
              <IconButton size="sm" variant="link" colorScheme="secondary">
                <Icon
                  name="general/info-circle"
                  className={css({ iconSize: 'sm' })}
                />
              </IconButton>
              <Tooltip offset={5}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt, ratione ea tenetur iste magni
              </Tooltip>
            </TooltipTrigger>
          }
        >
          {(item) => (
            <SelectItem
              id={item.id}
              textValue={item.name}
              isDisabled={args.isDisabled}
            >
              {item.name}
            </SelectItem>
          )}
        </Select>
      </Flex>
    );
  },
};
