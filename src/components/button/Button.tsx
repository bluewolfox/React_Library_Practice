/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React from 'react';
import './Button.scss';
import LoadingIMG from '../../assets/img/loading.png';

interface Props {
  onClick?: () => any;
  styles?: React.CSSProperties;
  className?: string;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<Props> = ({
  className,
  styles,
  children,
  text,
  onClick,
  disabled,
  loading,
}): JSX.Element => {
  const onClickHandler = () => {
    if (!disabled && onClick) onClick();
  };

  return (
    <div
      className={classNames('blwf-button-wrapper', { disabled, loading }, [className])}
      style={{ ...styles }}
      onClick={onClickHandler}
    >
      <div className="button-inner">
        {loading && (
          <i className="loading-img">
            <img src={LoadingIMG} alt="" />
          </i>
        )}
        <div className="contents">{!loading && (text || children)}</div>
      </div>
    </div>
  );
};
