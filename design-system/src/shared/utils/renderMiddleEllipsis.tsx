import type { ReactElement } from 'react';

export function splitByDot(s: string): [string, string] {
  const idxBase = s.lastIndexOf('.');
  if (idxBase === -1) {
    return [s, ''];
  }

  let idx = idxBase - 5;

  if (idx < 0) {
    idx = 0;
  }

  if (s[idx] === ' ' && idx > 0) {
    idx -= 1;
  }

  return [s.slice(0, idx), s.slice(idx)];
}

export function renderMiddleEllipsis(
  text: string | undefined,
  classNames: {
    head: string;
    tail: string;
  },
): ReactElement | null {
  if (!text) return null;

  const [head, tail] = splitByDot(text);

  return (
    <>
      <span className={classNames.head}>{head}</span>
      <span className={classNames.tail}>{tail}</span>
    </>
  );
}
