import type { DataAttributes } from '../../types';

/**
 * Picks only `data-*` attributes from props to spread onto the root DOM element.
 * @param props
 */
export function pickDataAttributes(props: object): DataAttributes {
  const result: Record<string, unknown> = {};

  for (const prop in props) {
    if (prop.startsWith('data-')) {
      result[prop] = (props as Record<string, unknown>)[prop];
    }
  }

  return result as DataAttributes;
}
