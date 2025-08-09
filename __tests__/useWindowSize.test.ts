import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from '../src/hooks/useWindowSize';
import { describe, it, expect } from 'vitest';

describe('useWindowSize', () => {
  const setWindowSize = (width: number, height: number) => {
    // @ts-ignore
    window.innerWidth = width;
    // @ts-ignore
    window.innerHeight = height;
    window.dispatchEvent(new Event('resize'));
  };

  it('should return the initial window size', () => {
    setWindowSize(800, 600);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  it('should update when the window is resized', () => {
    setWindowSize(1024, 768);
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      setWindowSize(1200, 900);
    });

    expect(result.current.width).toBe(1200);
    expect(result.current.height).toBe(900);
  });
});
