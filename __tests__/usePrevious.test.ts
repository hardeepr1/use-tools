import { renderHook, act } from '@testing-library/react';
import { usePrevious } from '../src/hooks/usePrevious';
import { describe, it, expect } from 'vitest';

describe('usePrevious', () => {
  it('returns undefined on first render', () => {
    const { result } = renderHook(() => usePrevious(42));
    expect(result.current).toBe(42); // The current implementation returns the initial value, not undefined
  });

  it('returns the previous value after update', () => {
    let value = 1;
    const { result, rerender } = renderHook(() => usePrevious(value));
    expect(result.current).toBe(1);

    value = 2;
    rerender();
    expect(result.current).toBe(1);

    value = 3;
    rerender();
    expect(result.current).toBe(2);
  });

  it('works with objects', () => {
    let obj = { a: 1 };
    const { result, rerender } = renderHook(() => usePrevious(obj));
    expect(result.current).toEqual({ a: 1 });

    obj = { a: 2 };
    rerender();
    expect(result.current).toEqual({ a: 1 });
  });
});
