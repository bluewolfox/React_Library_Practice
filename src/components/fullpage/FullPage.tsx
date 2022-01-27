/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import './FullPage.scss';

interface Props {
  children: JSX.Element[];
}

export const ReactFullPage: React.FC<Props> = ({ children }): JSX.Element => {
  const LayoutRef = useRef<HTMLDivElement>(null);
  const currentPageStatus = useRef(0);
  const debounce = useRef<any>(0);

  const wheelEvent = (e: WheelEvent) => {
    e.preventDefault();
    if (debounce) clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      const Layout = LayoutRef.current as HTMLDivElement;
      const dir = e.deltaY > 0 ? 'down' : 'up';

      const maxpage = Layout.childNodes.length - 1;
      // prettier-ignore
      switch (dir) {
        case 'down': if(currentPageStatus.current < maxpage) currentPageStatus.current += 1; break;
        case 'up': if(currentPageStatus.current > 0) currentPageStatus.current -= 1; break;
        default: break;
      }
      const target = Layout.childNodes[currentPageStatus.current] as HTMLElement;
      Layout.style.transform = `translate3d(0px, -${target.offsetTop}px, 0px)`;
      Layout.style.transition = `all 1000ms ease 0s`;
    }, 100);
  };

  useEffect(() => {
    const Layout = LayoutRef.current as HTMLDivElement;
    Layout.style.transform = `translate3d(0px, 0px, 0px)`;
    Layout.style.transition = `all 1000ms ease 0s`;
    Layout.style.height = `${window.innerHeight}px`;

    Layout.addEventListener('wheel', wheelEvent);

    return () => {
      Layout.removeEventListener('wheel', wheelEvent);
      currentPageStatus.current = 0;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LayoutRef]);

  const CLOEN_CHILDREN = React.Children.map(children as JSX.Element[], (child, idx) => {
    return React.cloneElement(child as JSX.Element, {
      ...child.props,
      className: ClassNames(`fullpage-item fullpage-item__${idx}`, child.props.className),
      style: { height: `${window.innerHeight}px`, ...child.props.style },
    });
  });
  return (
    <div className="blwf-fullpage-layout" ref={LayoutRef}>
      {CLOEN_CHILDREN}
    </div>
  );
};
