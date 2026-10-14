import type { PageSizeOptionLabel } from './types';

type NormalizedPaginationState = {
  normalizedPageCount: number;
  lastPageIndex: number;
  normalizedPageIndex: number;
  normalizedSiblingCount: number;
  currentPageNumber: number;
  lastPageNumber: number;
  initialInputValue?: string;
};

type PageSizeItem = {
  id: string;
  label: string;
  value: number;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const toNonNegativeInt = (value: number): number => {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, Math.trunc(value));
};

const sanitizeDigitsInput = (value: string): string =>
  value.replace(/[^\d]/g, '');

const normalizePaginationState = ({
  pageIndex,
  pageCount,
  siblingCount,
  initialPageInputValue,
}: {
  pageIndex: number;
  pageCount: number;
  siblingCount: number;
  initialPageInputValue?: number;
}): NormalizedPaginationState => {
  const normalizedPageCount = toNonNegativeInt(pageCount);
  const lastPageIndex = Math.max(0, normalizedPageCount - 1);
  const normalizedPageIndex =
    normalizedPageCount === 0
      ? 0
      : clamp(Math.trunc(pageIndex), 0, lastPageIndex);
  const normalizedSiblingCount = toNonNegativeInt(siblingCount);
  const currentPageNumber = normalizedPageIndex + 1;
  const lastPageNumber = Math.max(1, lastPageIndex + 1);

  const normalizedInitialPageInputValue = toNonNegativeInt(
    initialPageInputValue ?? 0,
  );
  const initialInputValue =
    normalizedInitialPageInputValue > 0
      ? String(clamp(normalizedInitialPageInputValue, 1, lastPageNumber))
      : undefined;

  return {
    normalizedPageCount,
    lastPageIndex,
    normalizedPageIndex,
    normalizedSiblingCount,
    currentPageNumber,
    lastPageNumber,
    initialInputValue,
  };
};

const normalizePageSizeOptions = (
  options?: ReadonlyArray<number>,
): Array<number> =>
  Array.from(
    new Set(
      (options ?? [])
        .map((option) => toNonNegativeInt(option))
        .filter((option) => option > 0),
    ),
  ).sort((left, right) => left - right);

const createPageSizeItems = (
  options: Array<number>,
  getLabel?: PageSizeOptionLabel,
): Array<PageSizeItem> =>
  options.map((option) => ({
    id: String(option),
    label: getLabel?.(option) ?? String(option),
    value: option,
  }));

const parsePageInputToPageNumber = (
  rawInput: string,
  normalizedPageCount: number,
): number | undefined => {
  const normalizedInput = rawInput.trim();
  if (normalizedInput.length === 0) {
    return undefined;
  }

  const parsedPage = Number(normalizedInput);
  if (!Number.isFinite(parsedPage)) {
    return undefined;
  }

  return clamp(Math.trunc(parsedPage), 1, normalizedPageCount);
};

const getProportionalPageIndex = ({
  currentPageIndex,
  currentPageCount,
  currentPageSize,
  nextPageSize,
}: {
  currentPageIndex: number;
  currentPageCount: number;
  currentPageSize: number;
  nextPageSize: number;
}): number => {
  const estimatedTotalItems = currentPageCount * currentPageSize;
  const nextPageCount = Math.max(
    1,
    Math.ceil(estimatedTotalItems / nextPageSize),
  );
  const nextLastPageIndex = Math.max(0, nextPageCount - 1);
  const currentPageNumber = currentPageIndex + 1;
  const proportionalPageNumber = Math.round(
    (nextPageCount / currentPageCount) * currentPageNumber,
  );

  return clamp(proportionalPageNumber - 1, 0, nextLastPageIndex);
};

export {
  clamp,
  createPageSizeItems,
  getProportionalPageIndex,
  normalizePageSizeOptions,
  normalizePaginationState,
  parsePageInputToPageNumber,
  sanitizeDigitsInput,
  toNonNegativeInt,
};
export type { NormalizedPaginationState, PageSizeItem };
