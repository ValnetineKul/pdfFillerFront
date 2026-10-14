type Dots = '…';

type GetPaginationRange = (input: {
  pageIndex: number;
  pageCount: number;
  delta?: number;
}) => Array<Dots | number>;

const DOTS: Dots = '…';
const maxPageVisible = 5;
const initialNumber = 1;
const minSidePageCount = 2;

const getPaginationRange: GetPaginationRange = ({ pageIndex, pageCount }) => {
  const result = [] as Array<Dots | number>;
  const formatPageNumber = pageIndex + 1; // индекс начинается с 0, страницы с 1;

  const addRange = (from: number, to: number): void => {
    for (let i = from; i <= to; i++) {
      result.push(i);
    }
  };

  // Если страниц мало — возвращаем их все
  if (pageCount <= maxPageVisible) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const isLeftVariant = formatPageNumber <= maxPageVisible - minSidePageCount;
  const isRightVariant = formatPageNumber + minSidePageCount >= pageCount;
  const isCenterVariant = !isLeftVariant && !isRightVariant;

  if (isLeftVariant) {
    addRange(initialNumber, maxPageVisible - minSidePageCount);
    result.push(DOTS, pageCount);

    return result;
  }

  if (isCenterVariant) {
    result.push(initialNumber, DOTS, formatPageNumber, DOTS, pageCount);

    return result;
  }

  if (isRightVariant) {
    result.push(initialNumber, DOTS);
    addRange(pageCount - minSidePageCount, pageCount);

    return result;
  }

  return result;
};

export { DOTS, getPaginationRange };
