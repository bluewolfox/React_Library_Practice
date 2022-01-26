/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

type T_Ratio = 'portrait' | 'landscape' | 'square'; // portrait:세로, landscape:가로, square:정사각형
type T_Standard = {
  pc: boolean;
  laptop: boolean;
  tablet: boolean;
  mobile: boolean;
  n_mobile: boolean;
  s_mobile: boolean;
};
type T_Size = { width: number; height: number };

// 반응형 범위
// [첫번째,두번째] => [첫번째]부터 ~ [두번째]까지
const ranges = {
  pc: [0, 1280],
  laptop: [1279, 1025],
  tablet: [1024, 768],
  mobile: [767, 0], // 모바일 크기
  n_mobile: [479, 0], // 모바일 normal 크기
  s_mobile: [320, 0], // 모바일 small 크기
};

const initialStandard = { pc: false, laptop: false, tablet: false, mobile: false, n_mobile: false, s_mobile: false };

// 브라우저 리사이즈 감지
export const useWindowResize = (): {
  size: T_Size;
  standard: T_Standard;
  ratio: T_Ratio;
} => {
  const [size, setSize] = useState<T_Size>({ width: 0, height: 0 });
  const [standard, setStandard] = useState<T_Standard>({ ...initialStandard });
  const [ratio, setRatio] = useState<T_Ratio>('portrait');
  const timeout = useRef<any>(null);

  // 사이즈 책정
  const sizeDetect = (arg: { height: number; width: number }) => {
    const { width, height } = arg;

    // 브라우저 사이즈로 기기 여부 확인
    const stands = { ...initialStandard };
    Object.keys(ranges).forEach((key) => {
      const newKey = key as keyof T_Standard;
      const stand = ranges[newKey];

      const maxWidth = stand[0] === 0 ? true : width <= stand[0];
      const minWidth = stand[1] === 0 ? true : width >= stand[1];

      if (!!maxWidth && !!minWidth) stands[newKey] = true;
      else stands[newKey] = false;
    });
    setStandard(stands);

    // 브라우저 사이즈로 브라우즈 화면 비율 확인
    if (width === height) setRatio('square');
    else if (width > height) setRatio('landscape');
    else if (width < height) setRatio('portrait');
  };

  const resizeHandler = (e: UIEvent) => {
    if (timeout.current) cancelAnimationFrame(timeout.current as number);

    timeout.current = requestAnimationFrame(() => {
      const target = e.target as Window;
      const values = { height: target.innerHeight, width: target.innerWidth };
      setSize(values);
      sizeDetect(values);
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

  return { size, standard, ratio };
};
