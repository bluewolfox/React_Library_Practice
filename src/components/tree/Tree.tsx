/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import Data from './TreeFake.json';
import './Tree.scss';
import { TypeTree } from './tree.model';

export const Tree: React.FC = (): JSX.Element => {
  const [treeData, setTreeData] = useState<TypeTree[]>([]);
  const [loading, setLoading] = useState(false);

  const getTreeData = () => {
    setLoading(true);
    setTimeout(() => {
      setTreeData(Data);
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    getTreeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TreeItems = useCallback((arg: { children: TypeTree[] }): any => {
    return arg.children.map((item) => {
      const { children, id, name, state, treeLevel } = item;

      const ableChild = !!children.length;
      const expanded = !!state.expanded;

      const findExpandTargetID = (params: TypeTree[]) => {
        if (!Array.isArray(params)) return params; // array가 아닐 경우 그대로 반환
        return params.map((x) => {
          if (x.id === id) x.state.expanded = !x.state.expanded;
          else findExpandTargetID(x.children); // id랑 x의 id가 다를 경우 재귀 호출
          return x;
        });
      };
      const onClickExpanded = () => {
        if (!ableChild) return;
        setTreeData((prevTree) => findExpandTargetID(prevTree));
      };

      return (
        <div key={id} className="tree-content">
          <div
            className={classNames('tree-item', { expanded, 'exist-children': ableChild })}
            onClick={onClickExpanded}
            title={name}
            style={{ paddingLeft: `${treeLevel * 13}px` }}
          >
            <div className="name-arrow-box">
              {ableChild && <div className="item-arrow" />}
              <div className="name">{name}</div>
            </div>
            <div className="id">{id}</div>
          </div>
          {ableChild && expanded && TreeItems({ children })}
        </div>
      );
    });
  }, []);

  return (
    <div className="blwf-tree-layout-wrapper">
      {loading && `로딩중...`}
      {!loading && <div className="tree-item-wrapper">{TreeItems({ children: treeData })}</div>}
    </div>
  );
};
