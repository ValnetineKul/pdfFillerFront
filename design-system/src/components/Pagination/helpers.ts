import { DOTS } from './constants'; // Предположим DOTS = '...' вынесен или объявлен тут
import { sanitizeDigitsInput } from './logic';

export const pageInputFromEventTarget = (
  target: EventTarget | null,
): HTMLInputElement | null =>
  target instanceof HTMLInputElement ? target : null;

export const readSanitizedPageInputFromEvent = (
  target: EventTarget | null,
): string => {
  const input = pageInputFromEventTarget(target);
  return input ? sanitizeDigitsInput(input.value) : '';
};

type PaginationRangeInput = {
  pageIndex: number;
  pageCount: number;
  siblingCount: number;
};

export const getPaginationRange = ({
  pageIndex,
  pageCount,
  siblingCount,
}: PaginationRangeInput): Array<string | number> => {
  // 1. Конвертируем 0-based индекс в 1-based для расчетов
  const currentPage = pageIndex + 1;

  // 2. Определяем размер "блока" кнопок:
  // first + last + current + 2*siblings + 2*dots
  const totalPageNumbers = 2 * siblingCount + 5;

  // Случай A: Если страниц меньше, чем мы можем показать в блоке — показываем все
  if (totalPageNumbers >= pageCount) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  // 3. Вычисляем границы соседей
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);

  // 4. Решаем, нужно ли показывать точки
  // Показываем точки, только если между границей и соседом есть больше 1 числа
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < pageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = pageCount;

  // Случай B: Точки только справа (мы в начале списка)
  // [1, 2, 3, 4, 5, ..., 100]
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, DOTS, lastPageIndex];
  }

  // Случай C: Точки только слева (мы в конце списка)
  // [1, ..., 96, 97, 98, 99, 100]
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => lastPageIndex - rightItemCount + i + 1,
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  // Случай D: Точки с обеих сторон (мы в середине)
  // [1, ..., 49, 50, 51, ..., 100]
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return [];
};

export { DOTS };
