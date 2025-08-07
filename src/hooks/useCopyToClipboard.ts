import { useState, useCallback } from 'react';

/**
 * A custom hook to copy text to the clipboard and track the copy status.
 * @param resetInterval {number} - The time in milliseconds to reset the copy status after a successful copy.   
 * @returns { isCopied: boolean, copy: (text: string) => Promise<void>, error: string | null }
 */
export function useCopyToClipboard(resetInterval = 1500) {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator?.clipboard) {
          await navigator.clipboard.writeText(text);
          setIsCopied(true);
          setError(null);
        } else {
          throw new Error('Clipboard API not supported');
        }
      } catch (err: any) {
        setIsCopied(false);
        setError(err.message || 'Copy failed');
      }
      setTimeout(() => setIsCopied(false), resetInterval);
    },
    [resetInterval]
  );

  return { isCopied, copy, error };
}
