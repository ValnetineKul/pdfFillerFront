import { defineUtility } from '@pandacss/dev';

const sizes = {
  xs: 'sizes.3',
  sm: 'sizes.4',
  md: 'sizes.5',
  lg: 'sizes.6',
  xl: 'sizes.7',
};

export const iconSize = defineUtility({
  values: sizes,
  transform(value, { token }) {
    let strokeWidth = '';

    switch (value) {
      case sizes.xs: {
        strokeWidth = '1px';
        break;
      }
      case sizes.sm: {
        strokeWidth = '1.3px';
        break;
      }
      case sizes.md: {
        strokeWidth = '1.6px';
        break;
      }
      case sizes.lg: {
        strokeWidth = '2px';
        break;
      }
      case sizes.xl: {
        strokeWidth = '2.6px';
        break;
      }
      default: {
        strokeWidth = '1px';
        break;
      }
    }

    const size = token(value);
    return { width: size, height: size, strokeWidth };
  },
});
