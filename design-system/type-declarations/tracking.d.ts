import 'react';
import type { TrackingAttributes } from '@front/design-system';

/**
 * Makes tracking attributes (`data-track-*`) typed on every native JSX element.
 *
 * Consumer setup (once, in their `global.d.ts` or via tsconfig):
 * ```ts
 * /// <reference types="@front/design-system/tracking" />
 * ```
 *
 * Values default to `string`; to make them strict, augment `TrackingRegister`
 * (see its JSDoc in `@front/design-system`).
 */
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> extends TrackingAttributes {}
}
