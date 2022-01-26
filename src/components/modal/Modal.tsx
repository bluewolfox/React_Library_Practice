/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

interface Props {
  children: JSX.Element;
  content: (arg: { closeHandler: () => void }) => JSX.Element;
}
export const Modal: React.FC<Props> = ({ children, content }): JSX.Element => {
  const [toggle, setToggle] = useState(false);
  const Root = useMemo(() => document.getElementById('blwf-root'), []);

  const closeHandler = useCallback(() => setToggle(false), []);
  const CONTENT = (() => content({ closeHandler }))();

  const CHILDREN = React.cloneElement(children, {
    className: classNames([children.props.className], 'blwf-target-controller'),
    onClick: () => {
      if (children.props.onClick) children.props.onClick();
      setToggle(true);
    },
  });

  return (
    <>
      {toggle && createPortal(CONTENT, Root as HTMLDivElement)}
      {CHILDREN}
    </>
  );
};
