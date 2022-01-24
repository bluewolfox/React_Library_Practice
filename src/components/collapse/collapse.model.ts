/* eslint-disable @typescript-eslint/no-explicit-any */

export type types_Collapse = {
  Container: React.FC<{ data: Collapse_Data[]; children: (arg: { item: Collapse_Data }) => JSX.Element }>;
  Row: React.FC<{
    children: (arg: Patch) => any;
  }>;
  Header: React.FC<
    {
      head: Head;
      children: (arg: { head: Head }) => JSX.Element | string;
    } & Patch
  >;
  Body: React.FC<
    {
      body: any;
      children: (arg: { body: any }) => JSX.Element | string;
    } & Patch
  >;
};

export type Collapse_Data = {
  head: Head;
  body: any;
};

type Head = {
  msg: string;
  uqKey: string;
};

type Patch = { expanded: boolean; setExpanded: React.Dispatch<React.SetStateAction<boolean>> };
