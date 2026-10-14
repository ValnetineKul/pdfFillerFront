// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTimer } from './useTimer';

const now = Date.parse('2024-01-01T00:00:00Z');
const nowInSeconds = now / 1000;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useTimer', () => {
  it('counts down and stops at zero', () => {
    const { result } = renderHook(() =>
      useTimer(nowInSeconds + 2, undefined, 'hours', 'UTC'),
    );

    expect(result.current).toEqual({
      timer: { hours: '0', minutes: '00', seconds: '02' },
      timeIsUp: false,
    });

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.timer.seconds).toBe('01');

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toEqual({
      timer: { hours: '00', minutes: '00', seconds: '00' },
      timeIsUp: true,
    });
    expect(vi.getTimerCount()).toBe(0);
  });

  it('updates immediately when the timestamp changes', () => {
    const { result, rerender } = renderHook(
      ({ timestamp }) => useTimer(timestamp, undefined, 'hours', 'UTC'),
      { initialProps: { timestamp: nowInSeconds + 10 } },
    );

    rerender({ timestamp: nowInSeconds + 20 });

    expect(result.current.timer.seconds).toBe('20');
  });

  it('uses the difference between server and client clocks', () => {
    const serverNow = nowInSeconds - 60;
    const { result } = renderHook(() =>
      useTimer(serverNow + 5, serverNow, 'hours', 'UTC'),
    );

    expect(result.current.timer.seconds).toBe('05');
  });
});
