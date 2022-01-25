import { Button } from 'components';
import { useWindowResize } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  toggle: boolean;
  closeHandler: () => void;
  content: (arg: { closeHandler: () => void }) => JSX.Element;
  title?: string;
  noBGClick?: boolean;
  styles?: React.CSSProperties;
}

export const ModalLayout: React.FC<Props> = ({ closeHandler, content, title, noBGClick, styles }): JSX.Element => {
  const { size: { height } } = useWindowResize(); // prettier-ignore
  const [modalHeight, setModalHeight] = useState(0);
  const ContentsRef = useRef<HTMLDivElement>(null);
  const HeaderRef = useRef<HTMLDivElement>(null);
  const FooterRef = useRef<HTMLDivElement>(null);

  // 모달 높이 사이즈
  const getModalHeightSize = () => {
    if (!ContentsRef.current || !HeaderRef.current || !FooterRef.current) return;

    const contentsSize = ContentsRef.current.getBoundingClientRect();
    const headerSize = HeaderRef.current.getBoundingClientRect();
    const footerSize = FooterRef.current.getBoundingClientRect();

    const height = contentsSize.height - (headerSize.height + footerSize.height);

    setModalHeight(height);
  };

  useEffect(() => {
    getModalHeightSize();
  }, [height]);

  return (
    <div className="blwf-modal-layout-wrapper">
      <div className="modal-layout-contents" ref={ContentsRef} style={{ ...styles }}>
        <div className="modal-header-wrapper" ref={HeaderRef}>
          <div className="header__inner">
            <div className="modal-title">{title || '모달 타이틀'}</div>
            <div className="close-modal" onClick={closeHandler}>
              ❌
            </div>
          </div>
        </div>
        <div className="modal-body-wrapper" style={{ height: modalHeight }}>
          {content({ closeHandler })}
        </div>
        <div className="modal-footer-wrapper" ref={FooterRef}>
          <div className="footer__inner">
            <Button className="btn-modal cancel__modal" onClick={closeHandler}>
              취소
            </Button>
            <Button className="btn-modal confirm__modal" onClick={closeHandler}>
              확인
            </Button>
          </div>
        </div>
      </div>
      <div className="modal-background" onClick={() => !noBGClick && closeHandler()} />
    </div>
  );
};
