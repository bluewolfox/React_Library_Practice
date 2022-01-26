/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

interface Props {
  callback: () => any;
}

// 브라우저 스크롤 감지 후 콜백
export const useWindowScroll = ({ callback }: Props): void => {
  const timeout = useRef<any>(null);

  const getScroll = () => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      callback();
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('scroll', getScroll);

    return () => {
      window.removeEventListener('scroll', getScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
