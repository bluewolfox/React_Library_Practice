import React, { createContext, useContext, useEffect, useState } from 'react';
import { Collapse_Data, types_Collapse } from './collapse.model';
import './Collapse.scss';

const initialState: { data: Collapse_Data[] } = {
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
              const id = `id${Math.random().toString(16).slice(2)}`;
              return <Collapse.Row key={id} item={item} />;
            })}
          </div>
        </div>
      </CollapseContext.Provider>
    );
  },
  Row: ({ children, item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="collapse-item">
        <Collapse.Header head={item.head} expanded={expanded} setExpanded={setExpanded} />
        <Collapse.Body body={item.body} expanded={expanded} setExpanded={setExpanded} />
      </div>
    );
  },
  Header: ({ children, head, expanded, setExpanded }) => {
    return (
      <div className="head-wrappper">
        <div className="collapse-head">
          <div className="value-box">{head}</div>
          <div className="arrow-box">⬇</div>
        </div>
      </div>
    );
  },
  Body: ({ children, body, expanded, setExpanded }) => {
    return (
      <div className="body-wrappper">
        <div className="collapse-body">{body}</div>
      </div>
    );
  },
};
