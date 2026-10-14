import type { FC, PropsWithChildren } from 'react';

import type { ConfigProviderContextProps } from './ConfigProviderContext';
import { ConfigProviderContext } from './ConfigProviderContext';

type ConfigProviderProps = PropsWithChildren<{
  value: ConfigProviderContextProps;
}>;

export const ConfigProvider: FC<ConfigProviderProps> = (
  props: ConfigProviderProps,
) => {
  const { children, ...rest } = props;

  return (
    <ConfigProviderContext.Provider {...rest}>
      {children}
    </ConfigProviderContext.Provider>
  );
};
