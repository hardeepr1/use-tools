import { useEffect, useRef } from 'react';

/**
 * Custom hook to get the previous value of a state or prop.
 * @param value The current value to track.
 * @returns The previous value of the input.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
