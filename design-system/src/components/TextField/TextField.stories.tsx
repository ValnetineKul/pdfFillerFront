import { Icon } from '@front/icons';
import type { MaskitoOptions } from '@maskito/core';
import { useMaskito } from '@maskito/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../Button';
import { FieldAddon } from '../FieldAddon';
import { Select, SelectItem } from '../Select';
import { Separator } from '../Separator';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: 'Forms/TextField',
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
    isRequired: true,
    errorMessage: 'Error',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {},
};

export const WithAddon: Story = {
  render: (args) => (
    <>
      <TextField
        {...args}
        label="FieldAddon start"
        contentStart={
          <>
            <FieldAddon>http://</FieldAddon>
            <Separator />
          </>
        }
      />

      <TextField
        {...args}
        label="FieldAddon end"
        contentEnd={
          <>
            <Separator />
            <FieldAddon>.com</FieldAddon>
          </>
        }
      />

      <TextField
        {...args}
        label="FieldAddon start"
        contentStart={<FieldAddon>€</FieldAddon>}
      />

      <TextField
        {...args}
        label="FieldAddon end"
        contentEnd={<FieldAddon>%</FieldAddon>}
      />
    </>
  ),
};

export const WithAddons: Story = {
  render: (args) => (
    <TextField
      {...args}
      contentStart={
        <>
          <FieldAddon>http://</FieldAddon>
          <Separator />
        </>
      }
      contentEnd={
        <>
          <FieldAddon>.com</FieldAddon>
          <Button aria-label="help-button">
            <Icon name="general/help-circle" />
          </Button>
          <Separator />
          <Button aria-label="pay-button">
            <Icon name="general/copy-01" />
            Copy
          </Button>
        </>
      }
      label="Password field"
    />
  ),
};

export const PhoneInput: Story = {
  render: function Render(args) {
    const phoneMask = {
      mask: [
        '+',
        '4',
        '2',
        '0',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
    } as MaskitoOptions;

    const options: Array<{ id: string; name: string }> = [
      { id: '1', name: 'RU' },
      { id: '2', name: 'LV' },
      { id: '3', name: 'PL' },
      { id: '4', name: 'CZ' },
      { id: '5', name: 'US' },
      { id: '6', name: 'FR' },
      { id: '7', name: 'DE' },
      { id: '8', name: 'IT' },
      { id: '9', name: 'ES' },
      { id: '10', name: 'AU' },
      { id: '11', name: 'BR' },
      { id: '12', name: 'JP' },
    ];

    const inputRef = useMaskito({ options: phoneMask });
    const [inputValue, setInputValue] = useState<string>();

    return (
      <TextField
        {...args}
        ref={inputRef}
        value={inputValue}
        label="Phone field"
        onInput={(value) => setInputValue(value.currentTarget.value)}
        placeholder="+420"
        contentStart={
          <Select
            defaultSelectedKey={'4'}
            items={options}
            aria-label="country-code"
            variant="unstyled"
          >
            {(item) => (
              <SelectItem id={item.id} textValue={item.name}>
                {item.name}
              </SelectItem>
            )}
          </Select>
        }
      />
    );
  },
};
