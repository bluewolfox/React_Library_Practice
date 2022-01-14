/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react';
import { Types_Table, T_table_header } from './table.model';
import './Table.scss';

const initialState: { data: any[]; header: T_table_header[] } = {
  data: [],
  header: [],
};

const TableContext = createContext(initialState);

export const Table: Types_Table.table = {
  Container: ({ children, data, header }) => {
    return (
      <TableContext.Provider value={{ ...initialState, data, header }}>
        <div className="blwf-table-layout-wrapper">{children}</div>
      </TableContext.Provider>
    );
  },
  THead: ({ children }) => {
    const { header } = useContext(TableContext);
    return (
      <div className="table-header-layout">
        {header.map((head) => {
          return (
            <Table.TH key={head.key} head={head}>
              {children({ ...head })}
            </Table.TH>
          );
        })}
      </div>
    );
  },
  TH: ({ children, head }) => {
    const { maxWidth, minWidth, width } = head;

    return (
      <div className="th-cell" style={{ maxWidth, minWidth, width }}>
        <div className="values">{children}</div>
      </div>
    );
  },
  TBody: ({ children }) => {
    const { data } = useContext(TableContext);

    return (
      <div className="table-body-layout">
        {!!data.length &&
          data.map((item, index) => {
            return children({ item, index });
          })}
        {!data.length && '로딩중...'}
      </div>
    );
  },
  TR: ({ children, item }) => {
    const { header } = useContext(TableContext);

    return (
      <div className="tbody-row">
        {header.map((cont) => {
          const { key, maxWidth, minWidth, width, noTitle } = cont;
          return (
            <Table.TD noTitle={noTitle} title={item[key]} key={key} styles={{ maxWidth, minWidth, width }}>
              {children({ value: item[key], item, column: cont })}
            </Table.TD>
          );
        })}
      </div>
    );
  },
  TD: ({ children, styles, title, noTitle }) => {
    let tit = title;
    if (noTitle) tit = '';

    return (
      <div className="td-cell" title={tit} style={{ ...styles }}>
        <div className="values">{children}</div>
      </div>
    );
  },
};
