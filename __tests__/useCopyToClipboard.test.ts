import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../src/hooks/useCopyToClipboard';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useCopyToClipboard', () => {
  let writeTextMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    // @ts-ignore
    global.navigator.clipboard = { writeText: writeTextMock };
  });

  it('should copy text to clipboard and set isCopied to true', async () => {
    const { result } = renderHook(() => useCopyToClipboard(100));
    await act(async () => {
      await result.current.copy('hello');
    });
    expect(writeTextMock).toHaveBeenCalledWith('hello');
    expect(result.current.isCopied).toBe(true);
  });

  it('should reset isCopied to false after resetInterval', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCopyToClipboard(100));
    await act(async () => {
      await result.current.copy('world');
    });
    expect(result.current.isCopied).toBe(true);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.isCopied).toBe(false);
    vi.useRealTimers();
  });

  it('should set error if clipboard API is not supported', async () => {
    // @ts-ignore
    global.navigator.clipboard = undefined;
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      await result.current.copy('fail');
    });
    expect(result.current.error).toBe('Clipboard API not supported');
    expect(result.current.isCopied).toBe(false);
  });

  it('should set error if writeText throws', async () => {
    writeTextMock.mockRejectedValueOnce(new Error('Copy failed!'));
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      await result.current.copy('fail');
    });
    expect(result.current.error).toBe('Copy failed!');
    expect(result.current.isCopied).toBe(false);
  });
});
