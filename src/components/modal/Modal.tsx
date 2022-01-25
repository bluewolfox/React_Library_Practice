/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import { ModalLayout } from './ModalLayout';

interface Props {
  children: JSX.Element;
  content: (arg: { closeHandler: () => void }) => JSX.Element;
  title?: string;
  noBGClick?: boolean;
  styles?: React.CSSProperties;
}
export const Modal: React.FC<Props> = ({ children, content, title, noBGClick, styles }): JSX.Element => {
  const [toggle, setToggle] = useState(false);
  const Root = useMemo(() => document.getElementById('blwf-root'), []);
  const closeHandler = useCallback(() => setToggle(false), []);

  const CHILDREN = React.cloneElement(children, {
    className: classNames([children.props.className], 'blwf-target-controller'),
    onClick: () => {
      if (children.props.onClick) children.props.onClick();
      setToggle(true);
    },
  });

  return (
    <>
      {toggle &&
        createPortal(
          <ModalLayout
            toggle={toggle}
            closeHandler={closeHandler}
            content={content}
            title={title}
            noBGClick={noBGClick}
            styles={styles}
          />,
          Root as HTMLDivElement
        )}
      {CHILDREN}
    </>
  );
};
