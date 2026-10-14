import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { css } from '#styled-system/css';
import { vstack } from '#styled-system/patterns';
import { paginationRecipe } from '#styled-system/recipes';

import { Pagination } from './Pagination';

const DEFAULT_STORY_MESSAGES = {
  navigationAriaLabel: 'Pagination navigation',
  previousAriaLabel: 'Go to previous page',
  goToPageLabel: 'Page',
  nextAriaLabel: 'Go to next page',
  firstPageAriaLabel: 'Go to first page',
  lastPageAriaLabel: 'Go to last page',
  pageAriaLabel: (pageNumber: number) => `Go to page ${pageNumber}`,
  pageSizeAriaLabel: 'Items per page',
  pageSizeOptionLabel: (pageSize: number) => `${pageSize} / page`,
  shortPageInfo: (pageInfo: { pageIndex: number; pageCount: number }) =>
    `${pageInfo.pageIndex + 1} of ${pageInfo.pageCount}`,
};

const PAGINATION_DOCS_DESCRIPTION = [
  'Производительный и доступный компонент пагинации для списков/таблиц с адаптивной раскладкой и контролируемым состоянием.',
  '',
  '## Когда использовать',
  '- Большие наборы данных (таблицы, реестры, каталоги, feed, history).',
  '- Серверная пагинация (API принимает `pageIndex`, `pageSize`).',
  '- Клиентская пагинация, когда нужно единое UX-поведение desktop/mobile.',
  '',
  '## Контракт компонента',
  '- `pageIndex` — текущая страница (0-based, controlled).',
  '- `pageCount` — количество страниц (>= 0).',
  '- `onPage` — основной колбэк смены страницы по индексу.',
  '- `onPrevious`/`onNext` — опциональные override-обработчики; если переданы, используются вместо внутреннего fallback на `onPage`.',
  '',
  '## Быстрый старт (рекомендуемый)',
  '1. Храните `pageIndex` и (опционально) `pageSize` во внешнем состоянии.',
  '2. Передавайте `pageCount`, вычисленный из total/items-per-page.',
  '3. Для селекта размера страницы задайте одновременно `pageSize`, `pageSizeOptions`, `onPageSizeChange`.',
  '4. Для интернационализации передайте `messages` (включая aria-label).',
  '',
  '## Responsive поведение',
  '- **Desktop**: page changer + навигация + поле перехода + (опционально) селект размера страницы.',
  '- **Mobile**: компактная панель навигации; поле показывает текущую страницу.',
  '- Переключение режимов основано на container queries, поэтому истории рендерятся в контейнере с `containerType: inline-size`.',
  '',
  '## Поведение поля перехода',
  '- При фокусе подставляется текущая страница.',
  '- Ввод санитизируется до цифр.',
  '- Подтверждение работает по `Enter` и по `blur`.',
  '- Переход выполняется только если значение валидно и отличается от текущей страницы.',
  '',
  '## Смена размера страницы (`pageSize`)',
  '- Поддерживается пропорциональный перерасчет страницы, чтобы пользователь оставался на близкой позиции в данных.',
  '- Рекомендуется синхронизировать `pageSize` и данные списка в одном state-слое (container/page).',
  '',
  '## Локализация и доступность',
  '- Все пользовательские тексты и aria-label настраиваются через `messages`.',
  '- Для доступности обязательно передавайте осмысленные `navigationAriaLabel`, `previousAriaLabel`, `nextAriaLabel` и `pageAriaLabel`.',
  '',
  '## Проверочный чек-лист интеграции',
  '- [ ] `pageIndex` не выходит за границы `[0, pageCount - 1]`.',
  '- [ ] `pageCount` пересчитывается при изменении фильтров/поиска/`pageSize`.',
  '- [ ] Для i18n передан полный `messages` для целевого языка.',
  '- [ ] В mobile-контейнерах компонент протестирован на узких ширинах.',
].join('\n');

const storyContainerClass = css({
  width: 'full',
  containerType: 'inline-size',
});

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Navigation/Pagination',
  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      description: {
        component: PAGINATION_DOCS_DESCRIPTION,
      },
    },
  },
  args: {
    theme: 'default',
    pageCount: 10,
    pageIndex: 0,
    pageChangerPosition: 'start',
    hidePageChanger: false,
    hideNavigationLabels: false,
    messages: DEFAULT_STORY_MESSAGES,
  },
  argTypes: {
    pageIndex: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Текущий индекс страницы (0-based).',
      table: { category: 'State' },
    },
    pageCount: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Общее количество страниц.',
      table: { category: 'State' },
    },
    siblingCount: {
      control: { type: 'number', min: 0, step: 1 },
      description:
        'Количество соседних страниц слева/справа от текущей в десктопном page changer.',
      table: { category: 'Behavior' },
    },
    pageSize: {
      control: { type: 'number', min: 1, step: 1 },
      description:
        'Текущий размер страницы. Используется вместе с `pageSizeOptions` и `onPageSizeChange`.',
      table: { category: 'Page Size Control' },
    },
    pageSizeOptions: {
      control: { type: 'object' },
      description:
        'Список доступных размеров страницы (например: `[10, 20, 50, 100]`).',
      table: { category: 'Page Size Control' },
    },
    onPageSizeChange: {
      action: true,
      description: 'Колбэк изменения размера страницы.',
      table: { category: 'Page Size Control' },
    },
    hidePageChanger: {
      control: 'boolean',
      description:
        'Скрывает список страниц. Вместо него отображается компактная текстовая информация.',
      table: { category: 'Visibility' },
    },
    hidePageInput: {
      control: 'boolean',
      description: 'Скрывает поле быстрого перехода на страницу.',
      table: { category: 'Visibility' },
    },
    hideNavigationLabels: {
      control: 'boolean',
      description: 'Скрывает текстовые подписи кнопок навигации.',
      table: { category: 'Visibility' },
    },
    isLoading: {
      control: 'boolean',
      description:
        'Переводит компонент в loading-состояние: интерактивные элементы становятся недоступны.',
      table: { category: 'Behavior' },
    },
    theme: {
      control: { type: 'select' },
      options: paginationRecipe.variantMap.theme,
      description: 'Визуальная тема компонента.',
      table: { category: 'Appearance' },
    },
    pageChangerPosition: {
      control: { type: 'select' },
      options: paginationRecipe.variantMap.pageChangerPosition,
      description: 'Позиционирование page changer в десктопной раскладке.',
      table: { category: 'Appearance' },
    },
    messages: {
      control: { type: 'object' },
      description:
        'Локализация UI-строк и aria-label. Используйте для мультиязычности и доступности.',
      table: { category: 'Localization' },
    },
    onPage: {
      action: true,
      description: 'Колбэк прямого перехода на страницу по 0-based индексу.',
      table: { category: 'Events' },
    },
    onPrevious: {
      action: true,
      description: 'Колбэк перехода на предыдущую страницу.',
      table: { category: 'Events' },
    },
    onNext: {
      action: true,
      description: 'Колбэк перехода на следующую страницу.',
      table: { category: 'Events' },
    },
  },
  decorators: [
    (Story) => (
      <div className={vstack({ width: 'full', alignItems: 'normal' })}>
        <div className={storyContainerClass}>
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Эталонный сценарий controlled-пагинации.',
          '',
          '- Используйте как отправную точку для боевой интеграции.',
          '- Подходит и для API-пагинации, и для клиентского листания.',
          '- Демонстрирует базовую связку `pageIndex` + `onPage` + `onPrevious` + `onNext`.',
        ].join('\n'),
      },
    },
  },
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <>
        <Pagination
          pageCount={10}
          pageSize={10}
          onPage={setPageIndex}
          onNext={() => setPageIndex((p) => p + 1)}
          onPrevious={() => setPageIndex((p) => p - 1)}
          pageIndex={pageIndex}
        />
      </>
    );
  },
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Проверка визуальной темы и альтернативного позиционирования.',
          '',
          '- Удобно использовать при визуальных ревью и сравнении тем.',
          '- Показывает, как `pageChangerPosition` влияет на desktop-сетку.',
        ].join('\n'),
      },
    },
  },
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <>
        <Pagination
          {...args}
          onPage={setPageIndex}
          onNext={() => setPageIndex((p) => p + 1)}
          onPrevious={() => setPageIndex((p) => p - 1)}
          pageIndex={pageIndex}
          pageChangerPosition="center"
        />
      </>
    );
  },
};
export const WithPageSizeControl: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Сценарий с управлением размером страницы.',
          '',
          '- Демонстрирует обязательный набор: `pageSize` + `pageSizeOptions` + `onPageSizeChange`.',
          '- При смене размера страницы индекс пересчитывается пропорционально, чтобы сохранять позицию пользователя.',
          '- Рекомендуемый паттерн для таблиц и data-grid экранов.',
        ].join('\n'),
      },
    },
  },
  render: function Render(args) {
    const countElements = 1000;
    const pageSizeOptions = [10, 20, 50, 100];
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);
    const [pageSize, setPageSize] = useState(args.pageSize ?? 50);
    const pageCount = Math.ceil(countElements / pageSize);

    return (
      <>
        <Pagination
          {...args}
          onPage={setPageIndex}
          onNext={() => setPageIndex((p) => p + 1)}
          onPrevious={() => setPageIndex((p) => p - 1)}
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageCount={pageCount}
          siblingCount={2}
          pageSizeOptions={pageSizeOptions}
          onPageSizeChange={setPageSize}
          pageChangerPosition="center"
        />
      </>
    );
  },
};

export const NoNavigationLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Компактная версия интерфейса.',
          '',
          '- Текстовые лейблы и page changer скрыты.',
          '- Полезно для плотных layout-сценариев и ограниченной ширины.',
        ].join('\n'),
      },
    },
  },
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <Pagination
        {...args}
        onPage={setPageIndex}
        onNext={() => setPageIndex((p) => p + 1)}
        onPrevious={() => setPageIndex((p) => p - 1)}
        pageIndex={pageIndex}
        pageChangerPosition="end"
        hideNavigationLabels
        hidePageChanger
      />
    );
  },
};

export const Position: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Матрица раскладок `pageChangerPosition`.',
          '',
          '- Используется для быстрого выбора подходящей композиции под конкретный экран.',
          '- Рекомендуется проверять совместно с реальными длинами лейблов (i18n).',
        ].join('\n'),
      },
    },
  },
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <>
        {paginationRecipe.variantMap.pageChangerPosition.map(
          (pageChangerPosition, pageChangerPositionIndex) => (
            <div
              style={{ marginTop: '24px' }}
              className={storyContainerClass}
              key={pageChangerPositionIndex}
            >
              <p style={{ paddingBlock: '16px', textTransform: 'capitalize' }}>
                {pageChangerPosition}
              </p>
              <Pagination
                {...args}
                onPage={setPageIndex}
                onNext={() => setPageIndex((p) => p + 1)}
                onPrevious={() => setPageIndex((p) => p - 1)}
                pageIndex={pageIndex}
                pageChangerPosition={pageChangerPosition}
              />
            </div>
          ),
        )}
      </>
    );
  },
};

export const MobileVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Базовый mobile-сценарий.',
          '',
          '- Рендер в узком контейнере активирует мобильную композицию.',
          '- Поле показывает текущую страницу вне фокуса.',
          '- Подтверждение введенной страницы работает на `Enter` и `blur`.',
        ].join('\n'),
      },
    },
  },
  render: function Render(args) {
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);

    return (
      <>
        <div
          style={{ marginTop: '24px', width: '100%', maxWidth: '520px' }}
          className={storyContainerClass}
        >
          <Pagination
            {...args}
            onPage={setPageIndex}
            onNext={() => setPageIndex((p) => p + 1)}
            onPrevious={() => setPageIndex((p) => p - 1)}
            pageIndex={pageIndex}
            pageSize={10}
          />
        </div>
      </>
    );
  },
};

export const MobileVariantWithPageSizeControl: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Mobile + pageSize control.',
          '',
          '- Демонстрирует совместную работу мобильной навигации и селекта размера страницы.',
          '- Подходит для экранов со списками, где нужен контроль плотности данных.',
        ].join('\n'),
      },
    },
  },
  render: function Render(args) {
    const countElements = 1000;
    const [pageIndex, setPageIndex] = useState(args.pageIndex ?? 0);
    const [pageSize, setPageSize] = useState(args.pageSize ?? 10);
    const pageCount = Math.ceil(countElements / pageSize);
    const pageSizeOptions = [10, 20, 50, 100];

    return (
      <>
        <div
          style={{ marginTop: '24px', width: '100%', maxWidth: '520px' }}
          className={storyContainerClass}
        >
          <Pagination
            {...args}
            onPage={setPageIndex}
            onNext={() => setPageIndex((p) => p + 1)}
            onPrevious={() => setPageIndex((p) => p - 1)}
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount}
            pageSizeOptions={pageSizeOptions}
            onPageSizeChange={setPageSize}
          />
        </div>
      </>
    );
  },
};
