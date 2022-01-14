/* eslint-disable @typescript-eslint/no-explicit-any */

export type T_table_header = {
  key: string;
  label: string;
  width?: number;
  maxWidth?: number;
  noTitle?: boolean;
  minWidth?: number;
};

type Item = { [key: string]: any };

export declare namespace Types_Table {
  interface table {
    Container: React.FC<T_Container>;
    THead: React.FC<T_Head>;
    TH: React.FC<{ head: T_table_header }>;
    TBody: React.FC<T_BODY>;
    TR: React.FC<T_TR>;
    TD: React.FC<T_Td>;
  }

  // 전체 레퍼
  type T_Container = {
    children: JSX.Element | JSX.Element[];
    data: Item[];
    header: T_table_header[];
  };

  type T_Head = {
    children: (arg: T_table_header) => string | JSX.Element;
  };

  type T_Th = {
    children: JSX.Element | string;
    head: T_table_header;
  };

  type T_BODY = {
    children: (arg: { item: Item; index: number }) => JSX.Element;
  };

  type T_TR = {
    children: (arg: { item: Item; value: any; column: T_table_header }) => JSX.Element;
    item: Item;
  };

  type T_Td = {
    styles?: React.CSSProperties;
    title: string;
    noTitle?: boolean;
  };
}
