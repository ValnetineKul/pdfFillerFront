import type { Meta, StoryObj } from '@storybook/react-vite';

import { checkboxRecipe } from '#styled-system/recipes';

import { Checkbox } from './Checkbox';

/**
 * Чекбокс используется для управления параметром с двумя состояниями.
 *
 * ## Поведение
 *
 * - Клик по названию или по самому чекбоксу приводит к его выбору или снятию выбора.
 *
 * - В случае чекбокса с описанием активная область чекбокса вытягивается на всю высоту элемента.
 *
 * ## Особенности
 *
 * -  Стилизация — Состояния наведения, нажатия, фокуса клавиатуры, выбора и неопределенности предоставляются для удобной стилизации.
 * Эти состояния применяются только при взаимодействии с соответствующими устройствами ввода, в отличие от псевдоклассов CSS.
 *
 * - Доступность — Используется скрытый элемент <input>, который также поддерживает интеграцию с HTML-формами и автозаполнение.
 * Элемент label встроен, чтобы чекбокс был доступен для технологий экранного доступа.
 *
 *  - Кроссбраузерность — Взаимодействия с помощью мыши, касания, клавиатуры и фокуса нормализованы для обеспечения согласованности во всех браузерах и на всех устройствах.
 *
 * ## Анатомия
 *
 * -  Чекбокс состоит из визуального индикатора выбора и метки. Чекбоксы поддерживают три состояния выбора: отмечено, не отмечено и неопределённое.
 * Пользователи могут кликнуть или коснуться чекбокса, чтобы переключить состояние выбора, или использовать клавишу Tab для навигации к нему и клавишу Space для переключения состояния.
 *
 * - В большинстве случаев чекбоксы должны иметь визуальную метку. Если у чекбокса нет видимой метки,
 * необходимо передать проп aria-label или aria-labelledby, чтобы элемент был идентифицирован технологиями экранного доступа.
 *
 * ## Примечание
 * > Checkbox в отличие от RadioButton может применяться как самодостаточный элемент формы, RadioButton требует список элементов RadioButton в обертке RadioGroup для полноценного функционирования.
 *
 * [Ссылка на документацию Checkbox](https://react-spectrum.adobe.com/react-aria/Checkbox.html#checkbox)
 */
const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Forms/Checkbox',
  args: {
    children: 'Checkbox label',
    defaultSelected: true,
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
    isIndeterminate: false,
    size: 'md',
  },
  argTypes: {
    size: {
      description: 'The size variations of the element',
      table: { defaultValue: { summary: 'md' }, category: 'Visual' },
      control: { type: 'select' },
      options: checkboxRecipe.variantMap.size,
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: (args) => (
    <div>
      {checkboxRecipe.variantMap.size.map((size, index) => (
        <Checkbox {...args} size={size} key={index}>
          {size}
        </Checkbox>
      ))}
    </div>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <div>
      <Checkbox {...args} description="Description text">
        Label
      </Checkbox>
    </div>
  ),
};

export const WithErrorMessage: Story = {
  args: { defaultSelected: false },
  render: (args) => (
    <div>
      <Checkbox {...args} isInvalid errorMessage="Error message">
        Label
      </Checkbox>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '30px',
        flexDirection: 'column',
        maxWidth: '300px',
      }}
    >
      <Checkbox
        {...args}
        isSelected={false}
        description="Это состояние по умолчанию, когда он не выбран и с ним не взаимодействуют."
      >
        Unselected
      </Checkbox>

      <Checkbox
        {...args}
        isSelected
        description="Это состояние указывает на то, что значение установлено пользователем."
      >
        Selected
      </Checkbox>

      <Checkbox
        {...args}
        isSelected
        isDisabled
        description="В этом состоянии пользователь не может взаимодействовать с элементом."
      >
        Selected (disabled)
      </Checkbox>

      <Checkbox
        {...args}
        isInvalid
        isSelected
        isIndeterminate
        description="Неопределенный чекбокс обычно используется в таких сценариях,
        как выбор всех элементов в списке, где выбраны некоторые, но не все элементы."
      >
        Indeterminate
      </Checkbox>

      <Checkbox
        {...args}
        isSelected
        isIndeterminate
        isDisabled
        description="Неопределенный чекбокс, в этом состоянии пользователь не может взаимодействовать с элементом."
      >
        Indeterminate (disabled)
      </Checkbox>

      <Checkbox
        {...args}
        isSelected={false}
        isInvalid
        description="Это состояние указывает на то, что чекбокс имеет недопустимое значение, обычно используемое в сценариях проверки формы."
      >
        Invalid
      </Checkbox>
    </div>
  ),
};
