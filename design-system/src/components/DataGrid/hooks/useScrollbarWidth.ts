import { useRef } from 'react';

export const useScrollbarWidth = (isThin?: boolean): number => {
  const didCompute = useRef(false);
  const widthRef = useRef(0);

  if (didCompute.current) return widthRef.current;

  if (typeof document === 'undefined') return 0;
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  // eslint-disable-next-line
  // @ts-expect-error
  outer.style.msOverflowStyle = 'scrollbar';
  if (isThin) {
    outer.style.scrollbarWidth = 'thin';
  }
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode?.removeChild(outer);

  didCompute.current = true;
  widthRef.current = scrollbarWidth;

  return scrollbarWidth;
};
