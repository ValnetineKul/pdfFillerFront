import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { css } from '#styled-system/css';

import { Button } from '../Button';
import { FieldAddon } from '../FieldAddon';
import { Separator } from '../Separator';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  component: SearchField,
  title: 'Forms/SearchField',
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
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchField>;

const wrapperStyles = css({
  width: '100%',
});

const resultText = css({
  paddingBlock: '8',
  color: 'text.brand.primary',
  textStyle: 'md',
  fontWeight: 'semibold',
});

export const Default: Story = {
  args: {},
};

export const WithAddons: Story = {
  render: function Render(args) {
    const [currentText, setCurrentText] = useState('');
    const [submittedText, setSubmittedText] = useState('');

    return (
      <div className={wrapperStyles}>
        <SearchField
          {...args}
          aria-label="Search field example"
          value={currentText}
          onClear={() => setCurrentText('')}
          onChange={setCurrentText}
          onSubmit={setSubmittedText}
          contentStart={
            <>
              <FieldAddon>
                <Icon name="general/search-lg" />
              </FieldAddon>
              <Separator />
            </>
          }
          contentEnd={
            <>
              <Separator />
              <Button>
                <Icon name="general/x-close" />
              </Button>
            </>
          }
          label="Search field"
        />
        <div className={resultText}>
          <p>Mirrored text: {currentText}</p>
          <p>Submitted text: {submittedText}</p>
        </div>
      </div>
    );
  },
};

export const WithControlledAddons: Story = {
  render: function Render(args) {
    const [currentText, setCurrentText] = useState('');
    const [submittedText, setSubmittedText] = useState('');

    return (
      <div className={wrapperStyles}>
        <SearchField
          {...args}
          aria-label="Search field example"
          value={currentText}
          onClear={() => setCurrentText('')}
          onChange={setCurrentText}
          onSubmit={setSubmittedText}
          contentStart={({ isEmpty }) => {
            return (
              <>
                {isEmpty ? (
                  <FieldAddon>
                    <Icon name="general/search-lg" />
                  </FieldAddon>
                ) : (
                  <Button>
                    <Icon name="general/x-close" />
                  </Button>
                )}
                <Separator />
              </>
            );
          }}
          label="Search field"
        />
        <div className={resultText}>
          <p>Mirrored text: {currentText}</p>
          <p>Submitted text: {submittedText}</p>
        </div>
      </div>
    );
  },
};
