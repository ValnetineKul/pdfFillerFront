/**
 * Tracking types registry. Empty by default — tracking attribute values resolve to `string`.
 *
 * Design-system consumers can narrow the values by augmenting this interface with stricter
 * types — then `data-track-*` become strictly typed:
 *
 * ```ts
 * import type { TrackAction, TrackEntity, TrackCompoundScope } from '@/utils/tracking';
 *
 * declare module '@front/design-system' {
 *   interface TrackingRegister {
 *     action: TrackAction;
 *     entity: TrackEntity;
 *     scope: TrackCompoundScope;
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TrackingRegister {}

type Resolve<Key extends string, Fallback> = Key extends keyof TrackingRegister
  ? TrackingRegister[Key]
  : Fallback;

export type TrackAction = Resolve<'action', string>;
export type TrackEntity = Resolve<'entity', string>;
export type TrackCompoundScope = Resolve<'scope', string>;

export type TrackingAttributes = {
  'data-track-scope'?: TrackCompoundScope;
  'data-track-entity'?: TrackEntity;
  'data-track-id'?: string;
  'data-track-position'?: number;
  'data-track-action'?: TrackAction;
};
