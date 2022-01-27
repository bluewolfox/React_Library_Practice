/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'components';
import { dragElement } from 'functions';
import { useWindowResize } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  closeHandler: () => void;
  title?: string;
  styles?: React.CSSProperties;
  customHeader?: JSX.Element;
  customFooter?: JSX.Element;
  children: any;
  bgProps?: Partial<{
    noBg: boolean;
    opacity: number;
    color: string;
    noClick: boolean;
  }>;
  cancelHandler?: () => any;
  confirmHandler?: () => any;
  form?: boolean; // form 모달
  cancelText?: string;
  confirmText?: string;
  drag?: boolean;
}

export const ModalLayout: React.FC<Props> = ({
  closeHandler,
  title,
  styles,
  children,
  customHeader: CustomHeader,
  customFooter: CustomFooter,
  bgProps,
  cancelHandler,
  confirmHandler,
  form,
  cancelText,
  confirmText,
  drag,
}): JSX.Element => {
  const { size: { height } } = useWindowResize(); // prettier-ignore

  const [modalHeight, setModalHeight] = useState(0);
  const WrapperRef = useRef<HTMLDivElement>(null);
  const ContentsRef = useRef<HTMLDivElement>(null);
  const HeaderRef = useRef<HTMLDivElement>(null);
  const FooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drag) dragElement(WrapperRef.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const commonHandler = {
    cancel: () => {
      if (cancelHandler) {
        cancelHandler();
        return;
      }
      closeHandler();
    },
    confirm: () => {
      if (confirmHandler) {
        confirmHandler();
        return;
      }
      closeHandler();
    },
  };

  const Layout = {
    Content: () => {
      return (
        <>
          <Layout.Header />
          <div className="modal-body-wrapper" style={{ height: modalHeight }}>
            {children}
          </div>
          <Layout.Footer />
        </>
      );
    },

    // 헤더 영역
    Header: () => {
      if (CustomHeader)
        return (
          <div className="modal-header-wrapper" ref={HeaderRef}>
            {CustomHeader}
          </div>
        );
      return (
        <div className="modal-header-wrapper" ref={HeaderRef}>
          <div className="header__inner">
            <div className="modal-title">{title || '모달 타이틀'}</div>
            <div className="close-modal" onClick={commonHandler.cancel}>
              ❌
            </div>
          </div>
        </div>
      );
    },
    // 푸터 영역
    Footer: () => {
      if (CustomFooter)
        return (
          <div className="modal-footer-wrapper" ref={FooterRef}>
            {CustomFooter}
          </div>
        );
      return (
        <div className="modal-footer-wrapper" ref={FooterRef}>
          <div className="footer__inner">
            <Button className="btn-modal cancel__modal" onClick={commonHandler.cancel}>
              {cancelText || '취소'}
            </Button>
            <Button className="btn-modal confirm__modal" onClick={commonHandler.confirm}>
              {confirmText || '확인'}
            </Button>
          </div>
        </div>
      );
    },
    // 컨텐츠 영역
    Contents: () => {
      if (form)
        return (
          <form>
            <Layout.Content />
          </form>
        );

      return <Layout.Content />;
    },
  };

  return (
    <div className="blwf-modal-layout-wrapper" ref={WrapperRef}>
      <div className="modal-layout-contents" ref={ContentsRef} style={{ ...styles }}>
        <Layout.Contents />
      </div>
      {!bgProps?.noBg && (
        <div
          className="modal-background"
          style={{
            backgroundColor: bgProps?.color,
            opacity: bgProps?.opacity,
          }}
          onClick={() => !bgProps?.noClick && closeHandler()}
        />
      )}
    </div>
  );
};
