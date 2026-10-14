import type { ForwardedRef, ReactElement } from 'react';
import { createContext, forwardRef } from 'react';
import type { ContextValue, TagProps } from 'react-aria-components';
import { Tag as AriaTag, useContextProps } from 'react-aria-components';

type TagExtendedProps = TagProps & {
  'data-scrollable'?: boolean;
};

export const TagContext =
  createContext<ContextValue<TagExtendedProps, HTMLDivElement>>(null);

function Tag(props: TagProps, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  [props, ref] = useContextProps(props, ref, TagContext);

  return <AriaTag ref={ref} {...props} />;
}

const _Tag = /* #__PURE__ */ forwardRef(Tag);

export { _Tag as Tag };
export type { TagProps } from 'react-aria-components';
