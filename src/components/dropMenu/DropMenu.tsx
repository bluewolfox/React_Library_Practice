import React, { useMemo } from 'react';
import './DropMenu.scss';

interface Props {
  children: JSX.Element;
}

export const DropMenu: React.FC<Props> = ({ children }): JSX.Element => {
  const CHILDREN = useMemo(() => {
    return <>{children}</>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="drop-menu-layout">{CHILDREN}</div>;
};
