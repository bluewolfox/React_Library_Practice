import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Nav from '../json/Nav.json';
import './MainLayout.scss';
import LOGO from '../assets/img/logo.png';
import { Alert } from '../components';

const MainLayout: React.FC = (): JSX.Element => {
  return (
    <div className="main-layout-wrapper">
      <div className="main-layout-inner">
        <div className="header-layout-wrapper">
          {Nav.map((item) => {
            const { path, label } = item;

            return (
              <NavLink to={path} key={label} className="link-item">
                {path === '/' && <img src={LOGO} alt="" />}
                {path !== '/' && label}
              </NavLink>
            );
          })}
        </div>
        <div className="contents-inner">
          <div className="center">
            <Outlet />
          </div>
        </div>
        <div className="footer-layout-wrapper">
          <div className="center">
            <div className="copyright">© ALL RIGHT 개발자 김원석</div>
            <div className="author-info">
              uox0091@gmail.com . +82-10-3292-0091
              {/* . GitHub . Repository */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
