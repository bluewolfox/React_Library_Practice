/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch } from 'react';

export type types_Collapse = {
  Container: React.FC<{ data: Collapse_Data[] }>;
  Row: React.FC<{ item: Collapse_Data }>;
  Header: React.FC<{ head: string } & Patch>;
  Body: React.FC<{ body: any } & Patch>;
};

type CommonNode = React.FC<{ children: (arg: { value: string }) => JSX.Element | string }>;

export type Collapse_Data = {
  head: string;
  body: any;
};

type Patch = {
  expanded: boolean;
  setExpanded: Dispatch<boolean>;
};
