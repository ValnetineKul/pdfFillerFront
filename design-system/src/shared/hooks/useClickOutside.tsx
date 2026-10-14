import { useEffect } from 'react';

export function useClickOutside(
  refs:
    | React.RefObject<HTMLElement | null>
    | Array<React.RefObject<HTMLElement | null>>,
  handler: EventListener,
  events: Array<keyof DocumentEventMap> = ['mousedown', 'touchstart'],
): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const listener: EventListener = (event): void => {
      const refArray = Array.isArray(refs) ? refs : [refs];

      const isInside = refArray.some((ref) => {
        const el = ref.current;
        return el?.contains(event.target as Node);
      });

      if (!isInside) {
        handler(event);
      }
    };

    events.forEach((eventName) => {
      document.addEventListener(eventName, listener, { passive: true });
    });

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, listener);
      });
    };
  }, [refs, handler, events]);
}
