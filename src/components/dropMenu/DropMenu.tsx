/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React, { Dispatch, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './DropMenu.scss';

type Content = (props: { closeHandler: () => void }) => JSX.Element;

interface ContProps {
  children: Content;
  setToggle: Dispatch<boolean>;
}
const DropContents: React.FC<ContProps> = ({ children, setToggle }): JSX.Element => {
  const CONTENT = children({ closeHandler: () => setToggle(false) });
  const PEELED_CONTENT = ((): JSX.Element =>
    typeof CONTENT.type === 'function' ? CONTENT.type(CONTENT.props) : CONTENT)();

  const CHILDREN = useMemo(() => {
    return React.Children.map(PEELED_CONTENT, (child) => {
      const { className, onClick } = child.props;

      return React.cloneElement(child, {
        className: classNames('blwf-drop-contents', [className]),
        onClick: () => {
          if (onClick) onClick();
        },
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{CHILDREN}</>;
};

interface DropProps {
  children: JSX.Element;
  content: Content;
}
export const DropMenu: React.FC<DropProps> = ({ children, content }): JSX.Element => {
  const Root = document.querySelector('#blwf-root') as HTMLDivElement;
  const targetRef = useRef<HTMLDivElement>(null);
  const ContentStandard = useMemo(() => document.createElement('div'), []);
  const [toggle, setToggle] = useState(false);
  const timerRef = useRef<any>();

  const mouseMoveHandler = (e: MouseEvent) => {
    const targetRect = (targetRef.current as HTMLDivElement).getBoundingClientRect();
    const ContentRect = (ContentStandard as HTMLDivElement).getBoundingClientRect();
    const X = e.clientX;
    const Y = e.clientY;
    const targetBoundaryWidthStart = targetRect.left;
    const targetBoundaryWidthEnd = targetRect.left + targetRect.width;
    const targetBoundaryHeightStart = targetRect.top;
    const targetBoundaryHeightEnd = targetRect.top + targetRect.height;

    const ContentBoundaryWidthStart = ContentRect.left;
    const ContentBoundaryWidthEnd = ContentRect.left + ContentRect.width;
    const ContentBoundaryHeightStart = ContentRect.top;
    const ContentBoundaryHeightEnd = ContentRect.top + ContentRect.height;

    const mouseInTarget =
      targetBoundaryWidthStart <= X &&
      targetBoundaryWidthEnd >= X &&
      targetBoundaryHeightStart <= Y &&
      targetBoundaryHeightEnd >= Y;

    const mouseInContent =
      ContentBoundaryWidthStart <= X &&
      ContentBoundaryWidthEnd >= X &&
      ContentBoundaryHeightStart <= Y &&
      ContentBoundaryHeightEnd >= Y;

    if (mouseInTarget || mouseInContent) {
      if (!toggle) setToggle(true);
    } else if (toggle) setToggle(false);
  };

  const onDebounceMouseHandler = async (event: MouseEvent) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const newTimer = setTimeout(() => {
      mouseMoveHandler(event);
    }, 0);
    timerRef.current = newTimer;
  };

  const getStylesTarget = () => {
    const targetRect = (targetRef.current as HTMLDivElement).getBoundingClientRect();

    ContentStandard.style.width = String(`${targetRect.width}px`);
    ContentStandard.style.left = String(`${targetRect.left}px`);
    ContentStandard.style.top = String(`${targetRect.top + targetRect.height}px`);
  };

  useEffect(() => {
    getStylesTarget();
    ContentStandard.classList.add('drop-contents-wrapper');

    if (toggle) {
      Root.appendChild(ContentStandard);
      document.addEventListener('mousemove', onDebounceMouseHandler);
    } else {
      document.removeEventListener('mousemove', onDebounceMouseHandler);

      if (Root.contains(ContentStandard)) Root.removeChild(ContentStandard);
    }
    return () => {
      if (Root.contains(ContentStandard)) Root.removeChild(ContentStandard);
      document.removeEventListener('mousemove', onDebounceMouseHandler);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  const CHILDREN = useMemo(() => {
    const { className, onClick } = children.props;

    return React.cloneElement(children, {
      className: classNames(`blwf-drop-target`, [className]),
      ref: targetRef,
      onClick: () => {
        if (onClick) onClick();
      },
      onMouseOver: () => !toggle && setToggle(true),
      onMouseOut: () => toggle && setToggle(false),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {CHILDREN}
      {createPortal(<DropContents setToggle={setToggle}>{content}</DropContents>, ContentStandard)}
    </>
  );
};
