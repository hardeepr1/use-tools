import { useState, useEffect } from 'react';

/**
 * useWindowSize
 *
 * A custom React hook that returns the current window width and height.
 *
 * @returns {{ width: number, height: number }}
 *
 * Usage:
 * const { width, height } = useWindowSize();
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}