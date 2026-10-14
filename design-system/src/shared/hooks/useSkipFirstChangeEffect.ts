import type { DependencyList, EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

export const useSkipFirstChangeEffect = (
  callback: EffectCallback,
  deps: DependencyList,
): void => {
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return callback();
  }, deps);
};
