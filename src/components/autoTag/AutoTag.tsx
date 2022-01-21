import React, { Dispatch, SetStateAction, useState } from 'react';
import './AutoTag.scss';

const TagItem: React.FC<{ str: string; idx: number; setTags: Dispatch<SetStateAction<string[]>> }> = ({
  idx,
  str,
  setTags,
}) => {
  const onDeleteItem = () => {
    setTags((prev: string[]) => prev.filter((_, eggIdx) => eggIdx !== idx));
  };

  return (
    <div className="egg-item">
      <div className="item-value">{str}</div>
      <div className="item-delete" onClick={onDeleteItem}>
        x
      </div>
    </div>
  );
};

export const AutoTag: React.FC = (): JSX.Element => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value) {
      setTags((prev) => [...prev, value]);
      setValue('');
    }
  };

  return (
    <div className="blwf-auto-tag-layout-wrapper">
      <div className="tag-contet-box">
        <div className="tags-container">
          {!!tags.length &&
            tags.map((str, idx) => {
              const id = `id${Math.random().toString(16).slice(2)}`;

              return <TagItem key={id} str={str} idx={idx} setTags={setTags} />;
            })}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="auto-input"
            onKeyUp={onEnter}
            placeholder="입력하시고 Enter치세요."
          />
        </div>
      </div>
    </div>
  );
};
