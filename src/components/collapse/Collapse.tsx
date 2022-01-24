import classNames from 'classnames';
import React, { createContext, Dispatch, useContext, useEffect, useState } from 'react';
import { Collapse_Data, types_Collapse } from './collapse.model';
import './Collapse.scss';

const initialState: {
  data: Collapse_Data[];
} = {
  data: [],
};
const CollapseContext = createContext(initialState);

export const Collapse: types_Collapse = {
  Container: ({ data, children }) => {
    useEffect(() => {
      React.createContext({ data });
    }, [data]);

    return (
      <CollapseContext.Provider value={{ ...initialState, ...data }}>
        <div className="blwf-collapse-layout">
          <div className="collapse-inner">
            {data.map((item) => {
              return children({ item });
            })}
          </div>
        </div>
      </CollapseContext.Provider>
    );
  },
  Row: ({ children }) => {
    const [expanded, setExpanded] = useState(false);
    return <div className="collapse-item">{children({ expanded, setExpanded })}</div>;
  },
  Header: ({ children, head, expanded, setExpanded }) => {
    return (
      <div className="head-wrappper" onClick={() => setExpanded((prev) => !prev)}>
        <div className="collapse-head">{children({ head })}</div>
      </div>
    );
  },
  Body: ({ children, body, expanded }) => {
    return (
      <div className={classNames('body-wrappper', { active: expanded })}>
        <div className="collapse-body">{children({ body })}</div>
      </div>
    );
  },
};
