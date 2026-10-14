import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

export const useClientWidthElement = (): {
  ref: RefObject<HTMLDivElement | null>;
  clientWidth: number;
  scrollWidth: number;
} => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState({
    clientWidth: 0,
    scrollWidth: 0,
  });

  useEffect(() => {
    let resizeObserver: ResizeObserver | undefined;
    if (ref.current) {
      resizeObserver = new ResizeObserver((resizeObserverEntry) => {
        setWidth({
          clientWidth: resizeObserverEntry[0].contentRect.width,
          scrollWidth: resizeObserverEntry[0].target.scrollWidth,
        });
      });
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver?.disconnect();
    };
  }, []);

  return {
    ref,
    ...width,
  };
};
