declare module '*.svg?react' {
  import type { ComponentProps, FunctionComponent } from 'react';

  const ReactComponent: FunctionComponent<
    ComponentProps<'svg'> & { title?: string; slot?: string }
  >;

  export default ReactComponent;
}
