import type { PaginationLegacyRecipeVariantProps } from '#styled-system/recipes';

interface PaginationLegacyProps extends PaginationLegacyRecipeVariantProps {
  /**
   * Default - тема во всю ширину
   * Secondary - минимальная ширина
   */
  hidePageChanger?: boolean;
  countShowPageChanger?: number;
  hideNavigationLabels?: boolean;
  hidePageInput?: boolean;
  pageCount?: number;
  pageIndex?: number;
  messages?: {
    previousLabel?: string;
    nextLabel?: string;
    previousAriaLabel?: string;
    nextAriaLabel?: string;
    goToPageLabel?: string;
    goToPageButton?: string;
    pageInputPlaceholder?: string;
    shortPageInfo?: (pageInfo: {
      pageIndex: number;
      pageCount: number;
    }) => string;
  };
  onPage?: (pageIndex: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export type { PaginationLegacyProps };
