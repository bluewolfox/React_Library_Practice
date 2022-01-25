/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

export const useWindowResize = (): {
  size: { width: number; height: number };
} => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const timeout = useRef<any>(null);

  const resizeHandler = (e: UIEvent) => {
    if (timeout.current) cancelAnimationFrame(timeout.current as number);

    timeout.current = requestAnimationFrame(() => {
      const target = e.target as Window;
      setSize({ height: target.innerHeight, width: target.innerWidth });
    });
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (timeout) cancelAnimationFrame(timeout.current as number);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { size };
};
