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

  //
  const onHideFileClick = () => {
    const inputEle = document.getElementById('file-selector');
    if (inputEle) inputEle.click();
  };

  // input 셀렉트 파일
  const onSelectFiles = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { files } = target;

    if (!files) {
      if (onChange) onChange([]);
      setFiles([]);
      return;
    }

    const newState = [];
    for (let i = 0; i < files.length; i++) {
      const fileOne = files[i];
      newState.push(fileOne);
    }
    if (onChange) onChange(newState);
    setFiles(newState);
  };

  return (
    <div ref={dropJoneRef} className={classNames('drop-jone-layout-wrapper', [className])} onClick={onHideFileClick}>
      <input type="file" style={{ display: 'none' }} id="file-selector" multiple onChange={onSelectFiles} />
      <div ref={dropJoneInnerRef} className="drag-join-inner">
        {!files.length && '파일을 드래그하거나 네모를 클릭하세요.'}
        {!!files.length &&
          files.map((item) => {
            return (
              <div className="file-item" key={item.lastModified}>
                {item.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};
