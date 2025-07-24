import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import { usePrevious } from '../src/hooks/usePrevious';
import { describe, expect, it } from 'vitest';

describe('usePrevious', () => {
  it('returns undefined on first render', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const prev = usePrevious(count);
      return { prev };
    });

    expect(result.current.prev).toBeUndefined();
  });

  it('returns the previous value after update', () => {
    let setCount: React.Dispatch<React.SetStateAction<number>>;

    const { result, rerender } = renderHook(() => {
      const [count, set] = useState(0);
      setCount = set;
      const prev = usePrevious(count);
      return { prev, count };
    });

    // First render
    expect(result.current.prev).toBeUndefined();

    // Update state
    act(() => {
      setCount!(1);
    });

    rerender();

    // After second render, previous should be 0
    expect(result.current.prev).toBe(0);
  });

  it('tracks multiple updates correctly', () => {
    let setCount: React.Dispatch<React.SetStateAction<number>>;

    const { result, rerender } = renderHook(() => {
      const [count, set] = useState(5);
      setCount = set;
      const prev = usePrevious(count);
      return { prev, count };
    });

    expect(result.current.prev).toBeUndefined();

    act(() => setCount!(10));
    rerender();
    expect(result.current.prev).toBe(5);

    act(() => setCount!(15));
    rerender();
    expect(result.current.prev).toBe(10);
  });
});
