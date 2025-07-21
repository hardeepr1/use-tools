import { renderHook, act } from '@testing-library/react';
import { usePageVisibility } from '../src/hooks/usePageVisibility';
import { afterEach, describe, expect, it } from 'vitest';

describe('usePageVisibility', () => {
  const originalHidden = Object.getOwnPropertyDescriptor(document, 'hidden');

  afterEach(() => {
    // Restore original 'document.hidden' after each test
    if (originalHidden) {
      Object.defineProperty(document, 'hidden', originalHidden);
    }
  });

  const setDocumentHidden = (value: boolean) => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => value,
    });

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
  };

  it('should return true when the tab is visible', () => {
    setDocumentHidden(false);

    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(true);
  });

  it('should return false when the tab is hidden', () => {
    setDocumentHidden(true);

    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(false);
  });

  it('should update value when visibility changes', () => {
    setDocumentHidden(false);

    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(true);

    setDocumentHidden(true);
    expect(result.current).toBe(false);

    setDocumentHidden(false);
    expect(result.current).toBe(true);
  });
});
