import { Icon } from '@front/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { css } from '#styled-system/css';

import { Picker } from './Picker';
import { PickerField } from './PickerField';

const options: Array<{ id: string; name: string }> = [
  { id: '1', name: 'Aerospace' },
  { id: '2', name: 'Mechanical' },
  { id: '3', name: 'Civil' },
  { id: '4', name: 'Some very long option name' },
  { id: '5', name: 'Nuclear' },
  { id: '6', name: 'Industrial' },
  { id: '7', name: 'Chemical' },
  { id: '8', name: 'Agricultural' },
  { id: '9', name: 'Electrical' },
];

const meta: Meta<typeof Picker> = {
  component: Picker,
  title: 'Others/Picker',
  args: {
    isInvalid: false,
    isDisabled: false,
    placeholder: 'Placeholder text',
  },
  argTypes: {
    isInvalid: { type: 'boolean' },
    isDisabled: { type: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Picker>;

export const Default: Story = {
  args: {},
  render: function Render(args) {
    return (
      <div
        className={css({
          width: '300px',
        })}
      >
        <Picker {...args} />
      </div>
    );
  },
};

export const PickerFields: Story = {
  args: {},
  render: function Render() {
    return (
      <div
        className={css({
          width: '300px',
        })}
      >
        <PickerField
          label="Single"
          isInvalid
          options={options}
          getOptionLabel={(item) => item.name}
          getOptionValue={(item) => item.id}
          defaultValue={options[0]}
          contentStart={
            <div className={css({ padding: '2.5' })}>
              <Icon name="users/user-01" className={css({ iconSize: 'md' })} />
            </div>
          }
        />
        <br />
        <PickerField
          label="Multiple"
          isRequired
          isMulti
          options={options}
          getOptionLabel={(item) => item.name}
          getOptionValue={(item) => item.id}
        />
      </div>
    );
  },
};

export const PickerFieldsDisabled: Story = {
  args: {},
  render: function Render() {
    return (
      <div
        className={css({
          width: '300px',
        })}
      >
        <PickerField
          label="Single"
          isDisabled
          options={options}
          getOptionLabel={(item) => item.name}
          getOptionValue={(item) => item.id}
          defaultValue={options[0]}
          contentStart={
            <div className={css({ padding: '2.5' })}>
              <Icon name="users/user-01" className={css({ iconSize: 'md' })} />
            </div>
          }
        />
      </div>
    );
  },
};
