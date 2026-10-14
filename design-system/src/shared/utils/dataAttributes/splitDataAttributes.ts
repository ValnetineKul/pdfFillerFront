import type { DataAttributes } from '../../types';

/**
 * Splits props into `data-*` attributes and everything else.
 * @param props
 * @returns tuple `[dataAttributes, restProps]`
 */
export function splitDataAttributes<T extends object>(
  props: T,
): [DataAttributes, T] {
  const dataAttributes: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};

  for (const prop in props) {
    if (prop.startsWith('data-')) {
      dataAttributes[prop] = (props as Record<string, unknown>)[prop];
    } else {
      rest[prop] = (props as Record<string, unknown>)[prop];
    }
  }

  return [dataAttributes as DataAttributes, rest as T];
}
