/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './Pagination.scss';

interface Props {
  totalPage: number; // 총 페이지
  currentPage: number; // 현재 페이지
  display?: number; // 나누고 싶은 단위
  onChange: (numb: number) => void; // 페이지네이션 동작
}

export const Pagination: React.FC<Props> = ({ totalPage, display = 10, currentPage = 1, onChange }): JSX.Element => {
  const [unit, setUnit] = useState<number[]>([]);

  useEffect(() => {
    if (!totalPage) return;

    const newUnit = Math.ceil(totalPage / display);

    const newUnitArr = [];
    for (let i = 1; i < newUnit + 1; i++) {
      newUnitArr.push(i);
    }
    setUnit(newUnitArr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPage, currentPage]);

  const CurrentPageArr = () => {
    return unit.map((numb) => {
      const changePage = () => {
        if (currentPage === numb) return;

        onChange(numb);
      };

      return (
        <div key={numb} className={classNames('unit-item', { active: currentPage === numb })} onClick={changePage}>
          {numb}
        </div>
      );
    });
  };

  const isDisabledPrev = () => currentPage === 1;
  const isDisabledNext = () => currentPage === totalPage;

  return (
    <div className="blwf-pag-layout-wrapper">
      <div
        className={classNames('arrow-wrapper start-status', { disabled: isDisabledPrev() })}
        onClick={() => !isDisabledPrev() && onChange(1)}
      >
        처음
      </div>
      <div
        className={classNames('arrow-wrapper prev-status', { disabled: isDisabledPrev() })}
        onClick={() => {
          if (isDisabledPrev()) return;
          onChange(currentPage - 1);
        }}
      >
        이전
      </div>
      <div className="unit-wrapper">{CurrentPageArr()}</div>
      <div
        className={classNames('arrow-wrapper next-status', { disabled: isDisabledNext() })}
        onClick={() => {
          if (isDisabledNext()) return;
          onChange(currentPage + 1);
        }}
      >
        다음
      </div>
      <div
        className={classNames('arrow-wrapper end-status', { disabled: isDisabledNext() })}
        onClick={() => !isDisabledNext() && onChange(totalPage)}
      >
        끝
      </div>
    </div>
  );
};
