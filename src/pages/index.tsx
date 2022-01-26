/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Alert,
  AutoTag,
  Button,
  Collapse,
  DropMenu,
  Input,
  Modal,
  ModalLayout,
  Pagination,
  Skeleton,
  Slider,
  SmoothWheel,
  Table,
  Tree,
} from '../components';
import { alertActions } from '../store/actions';
import './style.scss';
import Nav from '../json/Nav.json';

export const MainPage: React.FC = (): JSX.Element => {
  return (
    <div className="page">
      <div className="center">
        <div className="main-wrapper">
          {Nav.map((item) => {
            const { path, nameKo } = item;
            if (path === '/') return '';

            return (
              <Link className="main-item" to={path} key={path}>
                {nameKo}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
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
    <div className="test">
      <div onClick={closeHandler}>메뉴1</div>
      <div>메뉴2</div>
      <div>메뉴3</div>
      <div>메뉴4</div>
      <div className="local-calss">abc</div>
    </div>
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

export const AlertPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div className="page">
      <Alert position="center-bottom" classNames="local-class">
        <div className="center">
          <h1 className="page-title">Alert</h1>
          <button
            onClick={() => dispatch(alertActions.add({ msg: '경고 world', type: 'warn' }))}
            type="button"
            className="btn-alert warning"
            style={{ marginBottom: 10 }}
          >
            경고알림창
          </button>
          <button
            onClick={() => dispatch(alertActions.add({ msg: '성공 world', type: 'success' }))}
            type="button"
            className="btn-alert "
            style={{ marginBottom: 10 }}
          >
            성공알림창
          </button>
          <button
            onClick={() => dispatch(alertActions.add({ msg: '실패 world', type: 'err' }))}
            type="button"
            className="btn-alert failed"
          >
            실패알림창
          </button>
        </div>
      </Alert>
    </div>
  );
};

const Header = [
  {
    key: 'title',
    label: '타이틀',
    width: 100,
    maxWidth: 100,
    minWidth: 100,
    noTitle: true,
  },
  {
    key: 'location_type',
    label: '타입',
    width: 100,
    maxWidth: 100,
    minWidth: 100,
    noTitle: true,
  },
  {
    key: 'woeid',
    label: '지역ID',
    width: 100,
    maxWidth: 100,
    minWidth: 100,
    noTitle: true,
  },
  {
    key: 'latt_long',
    label: '위도경도',
    width: 100,
    minWidth: 100,
  },
];

export const TablePage: React.FC = (): JSX.Element => {
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    fetch('https://www.metaweather.com/api/location/44418')
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDummyData(result.consolidated_weather);
      });
  }, []);

  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">Table</h1>
        <Table.Container header={Header} data={dummyData}>
          <Table.THead>{({ label }) => label}</Table.THead>
          <Table.TBody>
            {({ index, item }) => {
              return (
                <Table.TR key={index} item={item}>
                  {({ value, column }) => {
                    if (column.key === 'woeid') return 'id';

                    return value;
                  }}
                </Table.TR>
              );
            }}
          </Table.TBody>
        </Table.Container>
      </div>
    </div>
  );
};

export const PaginationPage: React.FC = (): JSX.Element => {
  const [pages, setPages] = useState({ totalPage: 0, currentPage: 0 });
  const [data, setData] = useState<any>({});

  const getUserInfo = (numb?: number) => {
    fetch(`https://reqres.in/api/users?page=${numb || 1}&per_page=1`)
      .then((res) => res.json())
      .then((result) => {
        setPages({ currentPage: result.page, totalPage: result.total_pages });
        setData(result.data[0]);
      });
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">Pagination</h1>
        <div className="contents">
          <h2>
            <img src={data.avatar} alt="" />
            <div className="name">{`${data.first_name} ${data.last_name}`}</div>
          </h2>
          <div style={{ marginTop: 10 }}>{`email : ${data.email}`}</div>
        </div>
        <Pagination currentPage={pages.currentPage} totalPage={pages.totalPage} display={1} onChange={getUserInfo} />
      </div>
    </div>
  );
};

export const TreePage: React.FC = (): JSX.Element => {
  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">Tree</h1>
        <Tree />
      </div>
    </div>
  );
};

export const AutoTagPage: React.FC = (): JSX.Element => {
  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">AutoTag</h1>
        <AutoTag />
      </div>
    </div>
  );
};

export const CollapsePage: React.FC = (): JSX.Element => {
  const data = [
    {
      head: { msg: '저의 이름은', uqKey: 'name' },
      body: '김원석 입니다.',
    },
    {
      head: { msg: '저의 나이는', uqKey: 'age' },
      body: '올해 31세 입니다.',
    },
    {
      head: { msg: '저의 MBTI는', uqKey: 'mbti' },
      body: 'ISTJ 입니다.',
    },
  ];
  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">Collapse</h1>
        <Collapse.Container data={data}>
          {({ item }) => {
            const uniqID = `id${Math.random().toString(16).slice(2)}`;
            return (
              <Collapse.Row key={uniqID}>
                {({ expanded, setExpanded }) => {
                  return (
                    <>
                      <Collapse.Header head={item.head} expanded={expanded} setExpanded={setExpanded}>
                        {({ head }) => (
                          <>
                            <div className="custom-class">{head.msg}</div>
                            <div className="arrow">{expanded ? '⬇' : '⬆'}</div>
                          </>
                        )}
                      </Collapse.Header>
                      <Collapse.Body body={item.body} expanded={expanded} setExpanded={setExpanded}>
                        {({ body }) => body}
                      </Collapse.Body>
                    </>
                  );
                }}
              </Collapse.Row>
            );
          }}
        </Collapse.Container>
      </div>
    </div>
  );
};

export const SkeletonPage: React.FC = (): JSX.Element => {
  const [loading] = useState(true);

  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">Skeleton</h1>
        <Skeleton loading={loading}>
          <h2 className="title">안녕하세용</h2>
          <div className="main-banner">메인배너입니다.</div>
          <div className="sub-banner">서브배너입니다.</div>
          <div className="main-banner">메인배너입니다.</div>
          <h2 className="title">안녕하세용</h2>
          <h2 className="title">안녕하세용</h2>
          <div className="avatar" />
        </Skeleton>
      </div>
    </div>
  );
};

export const SmoothWheelPage: React.FC = (): JSX.Element => {
  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">SmoothWheel</h1>
        <SmoothWheel styles={{ width: '500px' }}>
          <div style={{ height: 10000, background: '#f1f1f1' }} />
        </SmoothWheel>
      </div>
    </div>
  );
};

export const ButtonPage: React.FC = (): JSX.Element => {
  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">Button</h1>
        <Button onClick={() => alert('abc')}>김원석</Button>
        <Button disabled>김원석</Button>
        <Button loading>김원석</Button>
        <Button className="abc">김원석</Button>
      </div>
    </div>
  );
};

export const ModalPage: React.FC = (): JSX.Element => {
  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">Modal</h1>
        <Modal content={({ closeHandler }) => <ModalLayout closeHandler={closeHandler}>모달샘플</ModalLayout>}>
          <Button className="abc">기본</Button>
        </Modal>
        <Modal
          content={({ closeHandler }) => {
            return (
              <ModalLayout title="모달1" closeHandler={closeHandler}>
                <Modal
                  content={({ closeHandler }) => {
                    return (
                      <ModalLayout title="모달2" closeHandler={closeHandler} styles={{ width: '60%', height: 500 }}>
                        <Modal
                          content={({ closeHandler }) => {
                            return (
                              <ModalLayout
                                title="모달3"
                                closeHandler={closeHandler}
                                styles={{ width: '40%', height: 400 }}
                              >
                                <Modal
                                  content={({ closeHandler }) => (
                                    <ModalLayout
                                      title="모달4"
                                      closeHandler={closeHandler}
                                      styles={{ width: '30%', height: 300 }}
                                    >
                                      모달끝
                                    </ModalLayout>
                                  )}
                                >
                                  <Button>모달4</Button>
                                </Modal>
                              </ModalLayout>
                            );
                          }}
                        >
                          <Button>모달3</Button>
                        </Modal>
                      </ModalLayout>
                    );
                  }}
                >
                  <Button>모달2</Button>
                </Modal>
              </ModalLayout>
            );
          }}
        >
          <Button>모달1</Button>
        </Modal>
        <Modal
          content={({ closeHandler }) => (
            <ModalLayout
              closeHandler={closeHandler}
              customHeader={<div onClick={closeHandler}>헤더</div>}
              customFooter={<div onClick={closeHandler}>푸터</div>}
            >
              커스텀모달
            </ModalLayout>
          )}
        >
          <Button>모달 커스텀 헤더 푸터</Button>
        </Modal>
        <Modal
          content={({ closeHandler }) => (
            <ModalLayout
              closeHandler={closeHandler}
              bgProps={{
                color: 'red',
                opacity: 0.2,
              }}
            >
              비쥐
            </ModalLayout>
          )}
        >
          <Button>백그라운드 자율성</Button>
        </Modal>
        <Modal
          content={({ closeHandler }) => (
            <ModalLayout closeHandler={closeHandler} bgProps={{ noBg: true }}>
              노비쥐
            </ModalLayout>
          )}
        >
          <Button>백그라운드 없음</Button>
        </Modal>
        <Modal
          content={({ closeHandler }) => (
            <ModalLayout
              closeHandler={closeHandler}
              cancelHandler={() => alert('취소')}
              confirmHandler={() => alert('확인')}
            >
              커스텀 핸들러
            </ModalLayout>
          )}
        >
          <Button>커스텀 핸들러</Button>
        </Modal>
        <Modal
          content={({ closeHandler }) => (
            <ModalLayout closeHandler={closeHandler} form>
              FORM 이벤트
            </ModalLayout>
          )}
        >
          <Button>FORM</Button>
        </Modal>
        <Modal
          content={({ closeHandler }) => (
            <ModalLayout drag closeHandler={closeHandler} form>
              드래그 모달
            </ModalLayout>
          )}
        >
          <Button>드래그 모달</Button>
        </Modal>
      </div>
    </div>
  );
};

export const InputPage: React.FC = (): JSX.Element => {
  return (
    <div className="page">
      <div className="center">
        <h1 className="page-title">Input</h1>
        <Input />
      </div>
    </div>
  );
};
