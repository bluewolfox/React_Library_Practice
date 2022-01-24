import React from 'react';
import './Skeleton.scss';
import './fake_Skeleton.scss';
import classNames from 'classnames';

interface Props {
  loading: boolean;
}

export const Skeleton: React.FC<Props> = ({ loading, children }): JSX.Element => {
  return <div className={classNames('blwf-skeleton-layout', { loading })}>{children}</div>;
};
