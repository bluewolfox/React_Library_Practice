/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { cloneElement, createElement, useEffect, useMemo, useRef, useState } from 'react';
import './Slider.scss';

interface Props {
  height: number | string;
  moveTime: number;
  children: JSX.Element[] | JSX.Element;
  autoPlay: boolean;
  pauseTime: number;
  direction: 'left' | 'right';
  showArrow: boolean;
  showDots: boolean;
  arrowClass: string;
  dotsClass: string;
}

export const Slider: React.FC<Partial<Props>> = ({
  height = 450,
  moveTime = 1,
  children,
  autoPlay = true,
  pauseTime = 2500,
  direction = 'left',
  showArrow = true,
  showDots = true,
  arrowClass,
  dotsClass,
}): JSX.Element => {
  const SlideInnerRef = useRef<HTMLDivElement>(null);
  const SlideInner = SlideInnerRef.current as HTMLDivElement;
  let SlideItemLength = 0;
  if (SlideInner) SlideItemLength = SlideInner.childNodes.length;
  const [mount, setMount] = useState(false);
  const timerRef = useRef<{ resetTimer: any; slideTimer: any }>({ resetTimer: null, slideTimer: null });
  const currentIndex = useRef(0);

  // 최신 index 변경
  const onChangeCurrentIndex: (payload: { status: 'prev' | 'next' | 'numb'; index?: number }) => void = ({
    status = 'next',
    index,
  }) => {
    let slideIndex = currentIndex.current;
    const itemIndexLength = SlideItemLength - 1;

    // prettier-ignore
    switch (status) {
      case 'prev': {
        if(slideIndex - 1 < 0) slideIndex = itemIndexLength;
        else slideIndex -= 1
        break;
      }
      case 'next': {
        if(slideIndex + 1 > itemIndexLength) slideIndex = 0;
        else slideIndex += 1
        break;
      }
      case 'numb': {
        if(index) slideIndex = index
        break;
      }
      default: break;
    }

    currentIndex.current = slideIndex;
  };

  // 슬라이드 다음 순서를 바꿔준다
  const orderSlider = () => {
    const child = SlideInner.childNodes[0];
    SlideInner.appendChild(child);
  };

  // 슬라이드 이너의 transform의 위치를 원래대로 위치해준다.
  const resetSlider = () => {
    SlideInner.style.transition = `none`;
    SlideInner.style.transform = `translate(0px)`;
  };

  // slide move
  const moveSlideX = () => {
    onChangeCurrentIndex({ status: 'next' });
    SlideInner.style.transition = `transform ${moveTime * 1000}ms`;
    SlideInner.style.transform = `translate(${direction === 'left' ? '-' : ''}${window.innerWidth}px)`;
  };

  // 슬라이드 start
  const autoMoveSlider = () => {
    moveSlideX();

    timerRef.current.resetTimer = setTimeout(() => {
      orderSlider();
      resetSlider();
    }, moveTime * 1000);
    timerRef.current.slideTimer = setTimeout(autoMoveSlider, pauseTime);
  };

  // 슬라이드 초기화 세팅
  const initialSetup = () => {
    SlideInner.style.width = `${SlideItemLength * window.innerWidth}px`;
    if ((autoPlay && !!Array.isArray(children)) || !children)
      timerRef.current.slideTimer = setTimeout(autoMoveSlider, pauseTime);
  };

  // 일시정지
  const clearTimes = () => {
    if (timerRef.current.resetTimer) clearTimeout(timerRef.current.resetTimer);
    if (timerRef.current.slideTimer) clearTimeout(timerRef.current.slideTimer);
    timerRef.current = { resetTimer: null, slideTimer: null };
    currentIndex.current = 0;
  };

  useEffect(() => {
    if (!mount) setMount(true);
    if (mount) initialSetup();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mount]);

  // 컴포넌트 언마운트시 메모리 참조 값들 clear
  useEffect(() => {
    return () => clearTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // arrowHandler
  const onArrowHandler = {
    btnPrev: () => {
      clearTimes();
      console.log('prev');
    },
    btnNext: () => {
      clearTimes();
      moveSlideX();

      timerRef.current.resetTimer = setTimeout(() => {
        orderSlider();
        resetSlider();
      }, moveTime * 1000);
    },
  };

  // 자식요소 가져오기
  const CHILDREN = useMemo(() => {
    const child: any[] = [];
    // children이 없을때
    if (!children) {
      for (let i = 0; i < 5; i++) {
        const creElement = createElement(
          'div',
          {
            className: 'basic slider-item',
            key: `${i}+${new Date().getTime()}`,
            'data-slide-index': i,
          },
          <div>Slider {i + 1}</div>
        );
        child.push(creElement);
      }

      return (
        <>
          {child.map((ele) => {
            const { props } = ele;
            return cloneElement(ele, { ...props });
          })}
        </>
      );
    }

    // children이 여러개일때
    if (Array.isArray(children)) {
      children.forEach((element, i) => {
        let className = 'slider-item';
        const { props, type } = element;
        if (props.className) className += ` ${props.className}`;
        const ele = createElement(type, {
          ...props,
          className,
          key: `${i}+${new Date().getTime()}`,
          'data-slide-index': i,
        });
        child.push(ele);
      });

      return (
        <>
          {child.map((ele) => {
            const { props } = ele;
            return cloneElement(ele, { ...props, className: '' });
          })}
        </>
      );
    }

    // children이 한개일때
    const { props } = children;
    let className = 'slider-item';
    if (props.className) className += ` ${props.className}`;
    child.push(
      cloneElement(children, { ...props, className, key: `alone+${new Date().getTime()}`, 'data-slide-index': 0 })
    );
    return (
      <>
        {child.map((ele) => {
          const { props } = ele;
          return cloneElement(ele, { ...props });
        })}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 점
  const DotsWrapper = useMemo(() => {
    let length = 0;

    if (!children) length = 5;
    if (Array.isArray(children)) length = children.length;
    if (!showDots || !length) return <></>;

    return (
      <div className={`dots-area ${dotsClass || ''}`}>
        <div className="dot-inner">
          {Array(length)
            .fill(null)
            .map((_, i) => {
              return <div className={`dot-item ${currentIndex.current === i ? 'active' : ''}`} key={i} />;
            })}
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="blwf-slider" className="blwf-slider-layout-wrapper" style={{ height }}>
      <div className="slider-inner" ref={SlideInnerRef}>
        {CHILDREN}
      </div>
      {showArrow && (
        <div className={`arrow-area ${arrowClass || ''}`}>
          <div className="arrow-inner">
            <div className="prev arrow" onClick={onArrowHandler.btnPrev}>
              ←
            </div>
            <div className="next arrow" onClick={onArrowHandler.btnNext}>
              →
            </div>
          </div>
        </div>
      )}
      {DotsWrapper}
    </div>
  );
};
