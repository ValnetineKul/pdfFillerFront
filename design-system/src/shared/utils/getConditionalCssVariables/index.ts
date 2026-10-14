import type { CSSProperties } from 'react';

import { breakpoints } from '../../../preset/theme';
import type { ConditionalValue, GetConditionalCssVariables } from './types';

/**
 * Функция создает CSS-переменные для каждого брейкпоинта.
 * Принимает в себя названия переменной, значения и функцию для преобразования.
 * Функция также может принимать одно значения (number или string), тогда будет создана одна переменная для base-брейкпоинта.
 * Название переменной будет содержать префикс брейкпоинта (например: --base-width или --w940-width).
 *
 * @example
 * getConditionalCssVariables('width', 320);
 * {
 *   --base-width: 320,
 *   --w320-width: 320,
 *   ...,
 *   --w1920-width: 320,
 * }
 *
 * getConditionalCssVariables('width', { base: 320, w940: 560, w1280: 960 }, (rawValue) => rawValue + 'px')
 * {
 *   --base-width: 320px,
 *   --w320-width: 320px,
 *   ...,
 *   --w768-width: 320px,
 *   --w940-width: 560px,
 *   --w1024-width: 560px,
 *   --w1280-width: 960px,
 *   ...,
 *   --w1920-width: 960px,
 * }
 */

export const getConditionalCssVariables: GetConditionalCssVariables = (
  nameVariable,
  value,
  prepareValue = (rawValue) => rawValue,
) => {
  if (value === undefined) return undefined;

  const objectWithValues: ConditionalValue =
    typeof value === 'number' || typeof value === 'string'
      ? {
          base: value,
        }
      : value;

  let prevBreakpointValue: number | string | undefined;

  const keysOfBreakpoints = ['base', ...Object.keys(breakpoints)] as Array<
    keyof ConditionalValue
  >;

  return keysOfBreakpoints.reduce<CSSProperties>((acc, breakpoint) => {
    const rawValue = objectWithValues[breakpoint];

    if (rawValue) prevBreakpointValue = rawValue;

    const valueForPrepare = rawValue ?? prevBreakpointValue;

    if (valueForPrepare === undefined) return acc;

    return {
      ...acc,
      [`--${breakpoint}-${nameVariable}`]: prepareValue(
        valueForPrepare,
        breakpoint,
      ),
    };
  }, {});
};
