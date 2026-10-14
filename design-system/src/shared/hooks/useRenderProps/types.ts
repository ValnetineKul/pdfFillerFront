import type { AriaLabelingProps, DOMProps } from '@react-types/shared';
import type { CSSProperties, ReactNode } from 'react';

interface StyleRenderProps<T> {
  /**
   * The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element.
   * A function may be provided to compute the class based on component state.
   */
  className?:
    | string
    | ((values: T & { defaultClassName: string | undefined }) => string);
  /**
   * The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element.
   * A function may be provided to compute the style based on component state.
   */
  style?:
    | CSSProperties
    | ((
        values: T & { defaultStyle: CSSProperties },
      ) => CSSProperties | undefined);
}

interface RenderProps<T> extends StyleRenderProps<T> {
  /**
   * The children of the component.
   * A function may be provided to alter the children based on component state.
   */
  children?:
    | ReactNode
    | ((values: T & { defaultChildren: ReactNode | undefined }) => ReactNode);
}

interface RenderPropsHookOptions<T>
  extends RenderProps<T>, DOMProps, AriaLabelingProps {
  values: T;
  defaultChildren?: ReactNode;
  defaultClassName?: string;
  defaultStyle?: CSSProperties;
}

export type UseRenderProps = <T>(props: RenderPropsHookOptions<T>) => {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};
