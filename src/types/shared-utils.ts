import type { CSSProperties } from 'react';

import { breakpoints } from '../../design-system/src/preset/theme/breakpoints';
import type {
  ConditionalValue,
  GetConditionalCssVariables,
} from '../../design-system/src/shared/utils/getConditionalCssVariables/types';

export {
  pickDataAttributes,
  removeDataAttributes,
  splitDataAttributes,
} from '../../design-system/src/shared/utils/dataAttributes';
export { formatFileSize } from '../../design-system/src/shared/utils/formatFileSize';
export { renderMiddleEllipsis } from '../../design-system/src/shared/utils/renderMiddleEllipsis';

export const getConditionalCssVariables: GetConditionalCssVariables = (
  nameVariable,
  value,
  prepareValue = (rawValue) => rawValue,
) => {
  if (value === undefined) {
    return undefined;
  }

  const objectWithValues: ConditionalValue =
    typeof value === 'number' || typeof value === 'string'
      ? { base: value }
      : value;

  let previousValue: number | string | undefined;
  const breakpointKeys = ['base', ...Object.keys(breakpoints)] as Array<
    keyof ConditionalValue
  >;

  return breakpointKeys.reduce<CSSProperties>((accumulator, breakpoint) => {
    const rawValue = objectWithValues[breakpoint];
    if (rawValue) {
      previousValue = rawValue;
    }

    const valueForPrepare = rawValue ?? previousValue;
    if (valueForPrepare === undefined) {
      return accumulator;
    }

    return {
      ...accumulator,
      [`--${breakpoint}-${nameVariable}`]: prepareValue(
        valueForPrepare,
        breakpoint,
      ),
    };
  }, {});
};
