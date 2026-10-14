import { createContext, useContext } from 'react';

export type ConfigProviderContextProps = {
  /**
   *  default value 41
   */
  buttonPressHandlerDelay: number;
};

export const ConfigProviderContext = createContext<ConfigProviderContextProps>({
  buttonPressHandlerDelay: 41,
});

export const useConfigProvider = (): ConfigProviderContextProps => {
  const context = useContext(ConfigProviderContext);
  if (!context) {
    throw new Error('ConfigProviderContext not found');
  }
  return context;
};
