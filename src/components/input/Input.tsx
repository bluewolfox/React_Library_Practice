import React, { useEffect, useRef, useState } from 'react';
import './Input.scss';

interface Props {
  value?: string;
  onChange?: (e: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

export const Input: React.FC<Props> = ({ value, onChange, onEnter, placeholder, type = 'text' }): JSX.Element => {
  const [innerValue, setInnerValue] = useState('');
  const innerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) setInnerValue(value);
  }, [value]);

  // input 이벤트 모듈
  const eventModules = {
    onEnterHandler: (e: React.KeyboardEvent) => {
      if (onEnter && e.key === 'Enter') onEnter();
    },
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => {
      const localValue = e.target.value;
      setInnerValue(localValue);
      if (onChange) onChange(localValue);
    },
    onDeleteValue: () => {
      setInnerValue('');
      if (onChange) onChange('');
      if (innerInputRef) (innerInputRef.current as HTMLInputElement).focus();
    },
  };

  return (
    <div className="blwf-input-layout">
      <div className="input-inner">
        <input
          className="blwf-input"
          ref={innerInputRef}
          type={type}
          onChange={eventModules.onChangeValue}
          value={innerValue}
          onKeyUp={eventModules.onEnterHandler}
          placeholder={placeholder || '입력해주세요.'}
        />
        {innerValue && <div onClick={eventModules.onDeleteValue} className="btn-delete" />}
      </div>
    </div>
  );
};
