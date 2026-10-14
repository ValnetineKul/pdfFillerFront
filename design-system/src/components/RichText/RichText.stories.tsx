import type { Meta, StoryObj } from '@storybook/react-vite';

import { RichText } from './RichText';
import { richTextExample } from './sb/mock';

/**
 * Компонент **RichText** предназначен для отображения и управления форматированным текстовым контентом, предоставляя гибкость в работе с элементами, такими как заголовки, параграфы, ссылки, изображения, списки и другие. Обычно используется в следующих случаях:
 *
 * - **Динамический контент**: Отображение текста, полученного из CMS, API или других внешних источников.
 * - **Пользовательский ввод**: Вывод сгенерированного пользователями контента с сохранением стилей и форматирования.
 * - **Контент**: Управление текстом на страницах с большим количеством информации, таких как правила, описания бонусов и игр, лендинги и раздел FAQ.

 * ## Основные возможности:
 *
 * - **Поддержка базовых HTML-тегов**: Например, `<p>`, `<h1>`, `<ul>`, `<a>`, `<img>`, `<table>`, `<blockquote>`, `<frame>`.
 * - **Возможность добавления кастомных стилей**: Поддерживает стили, применимые к различным элементам текста.
 * - **Интеграция с редакторами WYSIWYG**: Совместим с редакторами для генерации форматированного текста.
 * - **Безопасность**: Обеспечивает защиту путем автоматической очистки или преобразования нежелательных HTML-тегов (реализуется в месте применения).
 * - **Универсальность**: Идеально подходит для работы с контентом, включающим сложные структуры и стили.
 */

const meta: Meta<typeof RichText> = {
  component: RichText,
  title: 'Tools/RichText',
  args: {
    textAlign: 'left',
    fontSize: 'md',
  },
  argTypes: {
    textAlign: {
      control: { type: 'radio' },
      options: ['left', 'right', 'center'],
    },
    fontSize: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RichText>;

export const Default: Story = {
  args: {},
  render: function Render(args) {
    return <RichText {...args}>{richTextExample}</RichText>;
  },
};
