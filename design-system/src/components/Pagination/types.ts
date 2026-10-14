import type { ButtonProps as AriaButtonProps } from 'react-aria-components';

import type { DataAttributes } from '#shared/types';
import type { PaginationRecipeVariantProps } from '#styled-system/recipes';

import type { ButtonProps } from '../shared';

type PageInfo = {
  pageIndex: number;
  pageCount: number;
};

type PageSizeOptionLabel = (pageSize: number) => string;

interface PaginationMessages {
  navigationAriaLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  previousAriaLabel?: string;
  nextAriaLabel?: string;
  firstPageAriaLabel?: string;
  lastPageAriaLabel?: string;
  pageAriaLabel?: (pageNumber: number) => string;
  goToPageLabel?: string;
  pageInputPlaceholder?: string;
  pageSizeAriaLabel?: string;
  pageSizeOptionLabel?: PageSizeOptionLabel;
  shortPageInfo?: (pageInfo: PageInfo) => string;
}

interface PaginationProps extends PaginationRecipeVariantProps {
  /**
   * Текущая страница (0-based index)
   */
  pageIndex?: number;
  /**
   * Всего страниц
   */
  pageCount?: number;
  /**
   * Количество страниц-соседей слева и справа от активной.
   * Например, при siblingCount=1 и активной 50: [..., 49, 50, 51, ...]
   * @default 1
   */
  siblingCount?: number;
  /**
   * Состояние загрузки данных. Блокирует все интерактивные элементы.
   */
  isLoading?: boolean;
  /**
   * Количество элементов на странице.
   * Если не передан, компонент работает в неконтролируемом режиме.
   */
  pageSize?: number;
  /**
   * Начальное значение поля быстрого перехода по странице.
   * По умолчанию поле стартует пустым.
   */
  initialPageInputValue?: number;
  /**
   * Доступные значения для выбора размера страницы.
   */
  pageSizeOptions?: ReadonlyArray<number>;
  /**
   * Вызывается при изменении размера страницы.
   */
  onPageSizeChange?: (pageSize: number) => void;

  // Старые пропсы (часть можно оставить для совместимости)
  hidePageChanger?: boolean;
  hideNavigationLabels?: boolean;
  hidePageInput?: boolean;
  messages?: PaginationMessages;

  onPage?: (pageIndex: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;

  /**
   * Пропсы для кнопки «предыдущая страница» (десктоп и мобайл).
   */
  prevButtonProps?: ButtonProps;
  /**
   * Пропсы для кнопки «следующая страница» (десктоп и мобайл).
   */
  nextButtonProps?: ButtonProps;
  /**
   * Пропсы для кнопки конкретной страницы. Функция от номера страницы (1-based),
   * чтобы можно было навесить, например, `data-page` для аналитики.
   */
  pageButtonProps?: (page: number) => AriaButtonProps & DataAttributes;
}

export type {
  PageInfo,
  PageSizeOptionLabel,
  PaginationMessages,
  PaginationProps,
};
