import React from 'react';
import { Link } from 'react-router-dom';
import { DropMenu, Slider } from '../components';

export const MainPage: React.FC = (): JSX.Element => {
  return <div className="page">메인</div>;
};

export const SliderPage: React.FC = (): JSX.Element => {
  return (
    <div className="page">
      <h1 className="page-title">SLIDER</h1>
      <Slider />
      {/* <Slider>
        <div>abc</div>
      </Slider>
      <Slider>
        <div className="abc">
          <div>김원석은</div>
          <div>바보입니다</div>
        </div>
        <div>abc</div>
      </Slider> */}
    </div>
  );
};

export const DropDownPage: React.FC = (): JSX.Element => {
  const DropMenuItem: React.FC<{ closeHandler: () => void }> = ({ closeHandler }) => (
    <>
      <div onClick={closeHandler}>메뉴1</div>
      <div>메뉴2</div>
      <div>메뉴3</div>
      <div>메뉴4</div>
      <div className="local-calss">abc</div>
    </>
  );

  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">Dropdown</h1>
        <DropMenu content={({ closeHandler }) => <DropMenuItem closeHandler={closeHandler} />}>
          <Link
            to="/"
            className="local-class"
            style={{
              height: 45,
              padding: '0 20px',
              backgroundColor: '#000',
              color: '#ffffff',
              display: 'inline-block',
              lineHeight: '45px',
              cursor: 'pointer',
            }}
          >
            나는 메뉴
          </Link>
        </DropMenu>
      </div>
    </div>
  );
};
