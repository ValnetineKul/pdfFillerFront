import type { BadgeRecipeVariantProps } from '#styled-system/recipes';

export const getRecordStatus = (
  transaction: string,
): BadgeRecipeVariantProps['colorScheme'] => {
  switch (transaction) {
    case 'Выигрыш':
      return 'success';
    case 'Проигрыш':
      return 'error';
    case 'Пополнение':
      return 'warning';
    default:
      return 'grayLight';
  }
};
