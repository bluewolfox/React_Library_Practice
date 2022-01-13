/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../store/actions';
import { RootState } from '../../store/configureStore';
import { T_Alert } from '../../store/reducers/alert';
import './Alert.scss';
import { setPosition } from './setposition';

const AlertItems: React.FC<{
  item: T_Alert;
  index: number;
  removeAlert: (index: number) => void;
  styles?: React.CSSProperties;
}> = ({ item, index, removeAlert, styles }): JSX.Element => {
  const { msg, type } = item;

  useEffect(() => {
    const dobounceExcutor = setTimeout(() => removeAlert(index), 5000);
    return (): void => clearTimeout(dobounceExcutor);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {msg && (
        <div className={classNames('alert-item', [type])} style={{ ...styles }}>
          <div className="alert-item-inner">
            <div className="alert-msg">{msg}</div>
            <div className="alert-dlt" onClick={() => removeAlert(index)}>
              닫기
            </div>
          </div>
        </div>
      )}
    </>
  );
};

type pos = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'center' | 'center-bottom';
interface Props {
  position?: pos;
  styles?: React.CSSProperties;
  classNames?: string;
  children?: JSX.Element;
}

export const Alert: React.FC<Props> = ({ position, styles, classNames: rootClass, children }): JSX.Element => {
  const alerts = useSelector((state: RootState) => state.alert.items);
  const AlertRoot = useMemo(() => document.createElement('div'), []);
  const dispatch = useDispatch();
  const Root = document.querySelector('#blwf-root') as HTMLDivElement;
  const removeAlert = useCallback((index:number) => dispatch(alertActions.delete(index)),[dispatch]) // prettier-ignore
  const resetAlert = useCallback(() => dispatch(alertActions.reset()),[dispatch]) // prettier-ignore
  const targetRef = useRef<HTMLElement>(null);

  const checkAllAlertExist = () => {
    const textLength = alerts.reduce((a: number, c: T_Alert) => a + c.msg.length, alerts[0].msg.length);
    if (!textLength) resetAlert();
  };
  useEffect(() => {
    if (alerts.length) checkAllAlertExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts]);

  useEffect(() => {
    AlertRoot.classList.add('alert-layout-wrapper');
    setPosition({ position, alertRoot: AlertRoot, rootClass, target: targetRef.current });
    Root.appendChild(AlertRoot);

    return () => {
      if (Root.contains(AlertRoot)) Root.removeChild(AlertRoot);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AlertWrapper = alerts.map((item, i) => {
    return <AlertItems styles={styles} removeAlert={removeAlert} item={item} index={i} key={`${item.type + i}`} />;
  });

  let CHILDREN: any = children;
  if (children) {
    CHILDREN = () => {
      const { className } = children.props;

      return React.cloneElement(children, {
        ...children.props,
        className: classNames('alert-target', [className]),
        ref: targetRef,
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
  }

  return (
    <>
      <CHILDREN />
      {createPortal(AlertWrapper, AlertRoot)}
    </>
  );
};
