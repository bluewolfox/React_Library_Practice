import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import './DragDrop.scss';

interface Props {
  className?: string;
  onChange?: (files: File[]) => void;
}

export const DragDrop: React.FC<Props> = ({ className, onChange }): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);
  const dropJoneRef = useRef<HTMLDivElement>(null);
  const dropJoneInnerRef = useRef<HTMLDivElement>(null);
  const mousemoveDetect = () => {
    const target = dropJoneRef.current as HTMLDivElement;

    const dragEnter = (e: DragEvent) => {
      e.preventDefault();
      target.classList.add('active-area');
    };
    const dragOver = (e: DragEvent) => {
      e.preventDefault();
    };
    const drop = (e: DragEvent) => {
      if (target.classList.contains('active-area')) target.classList.remove('active-area');

      e.preventDefault();

      const dt = e.dataTransfer;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (dt && dt.files.length) {
        const fileList = dt.files;
        const newState = [];

        for (let i = 0; i < fileList.length; i++) {
          const fileOne = fileList[i];
          newState.push(fileOne);
        }
        if (onChange) onChange(newState);
        setFiles(newState);
      }
    };

    target.addEventListener('dragenter', dragEnter, false);
    target.addEventListener('dragover', dragOver, false);
    target.addEventListener('drop', drop, false);
  };

  useEffect(() => {
    mousemoveDetect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropJoneRef]);

  return (
    <div ref={dropJoneRef} className={classNames('drop-jone-layout-wrapper', [className])}>
      <div ref={dropJoneInnerRef} className="drag-join-inner">
        {!files.length && '드래그할 요소를 넣으세요.'}
        {!!files.length &&
          files.map((item) => {
            return <div key={item.lastModified}>{item.name}</div>;
          })}
      </div>
    </div>
  );
};
