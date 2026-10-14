import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Separator } from '../Separator';
import { FieldAddon, NumberField } from './NumberField';

const meta: Meta<typeof NumberField> = {
  component: NumberField,
  title: 'Forms/NumberField',
  argTypes: {
    onInput: { action: true },
    errorMessage: { type: 'string' },
    isDisabled: { type: 'boolean' },
    isInvalid: { type: 'boolean' },
    placeholder: { type: 'string' },
    necessityIndicator: {
      description: 'This show aster symbol when field is required',
      table: { category: 'State' },
      control: { type: 'boolean' },
    },
  },
  args: {
    label: 'Label',
    description: 'Description text',
    placeholder: 'Placeholder',
    isRequired: false,
    errorMessage: 'Error',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  args: {},
};

/**
 * Поле принимает дополнительные элементы и размещает их перед и после ввода значения.
 * Следуя этому подходу, мы можем создавать гибкие компоненты, которые покрывают различные бизнес-требования.
 */

export const WithAddon: Story = {
  render: (args) => (
    <>
      <NumberField
        {...args}
        label="FieldAddon start"
        contentStart={
          <>
            <FieldAddon>€</FieldAddon>
            <Separator />
          </>
        }
      />

      <NumberField
        {...args}
        label="FieldAddon end"
        contentEnd={
          <>
            <Separator />
            <FieldAddon>EUR</FieldAddon>
          </>
        }
      />

      <NumberField
        {...args}
        label="FieldAddon start"
        contentStart={<FieldAddon>€</FieldAddon>}
      />

      <NumberField
        {...args}
        label="FieldAddon end"
        contentEnd={<FieldAddon>%</FieldAddon>}
      />
    </>
  ),
};

/**
 * Мы можем одновременно передавать группу различных элементов для contentStart и contentEnd.
 * Используя этот подход, мы можем настраивать компоненты для удовлетворения сложных требований.
 */

export const WithAddons: Story = {
  render: (args) => (
    <NumberField
      {...args}
      contentStart={
        <>
          <FieldAddon>Text</FieldAddon>
          <Separator />
        </>
      }
      contentEnd={
        <>
          <FieldAddon>Text</FieldAddon>
          <Separator />
          <Button aria-label="help-button">
            <Icon name="general/help-circle" />
          </Button>
          <Button aria-label="pay-button">Pay</Button>
        </>
      }
      label="Password field"
    />
  ),
};
/**
 * Опция стиля: 'currency' может быть передана в проп formatOptions,
 * чтобы трактовать значение как валютное.
 * Также необходимо передать опцию currency, чтобы установить код валюты (например, USD).
 * Кроме того, опцию currencyDisplay можно использовать для выбора,
 * отображать ли символ валюты, код валюты или название валюты. Наконец, опцию currencySign
 * можно установить на accounting, чтобы использовать бухгалтерскую нотацию для отрицательных чисел,
 * которая в некоторых странах использует скобки вместо знака минус.
 *
 * Если вам нужно позволить пользователю менять валюту,
 * вы должны включить отдельный выпадающий список рядом с полем ввода числа.
 * Само поле ввода числа не будет определять валюту по вводу пользователя.
 */

export const CurrencyIncrement: Story = {
  render: function Render(args) {
    return (
      <NumberField
        {...args}
        minValue={0}
        defaultValue={0}
        formatOptions={{
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'code',
          currencySign: 'accounting',
        }}
        contentEnd={
          <>
            <Separator />
            <Button slot="decrement">-</Button>
            <Button slot="increment">+</Button>
          </>
        }
        label="Currency field"
      />
    );
  },
};

/**
 * Опция стиля: 'percent' может быть передана в проп formatOptions, чтобы трактовать значение как процент.
 * В этом режиме значение умножается на 100 перед отображением, т.е. 0.45 отображается как 45%.
 * Обратное также верно: когда пользователь вводит значение, событие onChange будет вызвано с
 * введённым значением, делённым на 100. Когда опция percent включена, значение по умолчанию
 * автоматически изменяется на 0.01, так что увеличение и уменьшение происходит на 1%.
 */
export const WithPercentFormat: Story = {
  render: (args) => (
    <NumberField
      {...args}
      formatOptions={{
        style: 'percent',
      }}
      defaultValue={0}
      contentEnd={
        <>
          <Separator />
          <Button slot="decrement">-</Button>
          <Button slot="increment">+</Button>
        </>
      }
      label="Percents field"
    />
  ),
};
