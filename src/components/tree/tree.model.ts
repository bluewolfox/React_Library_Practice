export type TypeTree = {
  assetCount: number;
  childGroupCount: number;
  children: TypeTree[];
  groupType: number;
  id: number;
  name: string;
  nameMarkup: string;
  num: number;
  parentId: number;
  parentsId: number[];
  rnum: number;
  rootId: number;
  state: {
    expanded: boolean;
    indeterminate: boolean;
    lastChildren: boolean;
    lastChildrenTreeLevelArray: number[];
    match: boolean;
    selected: boolean;
  };
  treeLevel: number;
};
