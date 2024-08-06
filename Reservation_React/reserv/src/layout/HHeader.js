import React from 'react';
import { Link } from "react-router-dom";
import logo from '../resources/images/img_logo.png';
import userIcon from '../resources/icons/ico_user_white.svg';
import menuIcon from '../resources/icons/ico_menu_white.svg';
import closeIcon from '../resources/icons/ico_close_white.svg';
import '../css/style.css';
import '../css/template.css';
import '../css/plugin.css';
import '../js/template.js';
import '../js/script.js';

const Header = ({ isAuthenticated }) => {
/*
  const handleLogout = () => {window.location.href = 'http://localhost:8083/logout';};
  const handleLogin = () => {window.location.href = 'http://localhost:8083/login';};
  const handleSignup = () => {window.location.href = 'http://localhost:8083/signup';};
  const handleProfile = () => {window.location.href = 'http://localhost:8083/profile';};
  const toCart = () => {window.location.href = 'http://localhost:8083/cart';};
  const toMap = () => {window.location.href = 'http://localhost:8083/map';};
  const toLogin = () => {window.location.href = 'http://localhost:8083/login';};
  */
  return (
    <header className="butti-N1" data-bid="PQLYMqEDN1">
      <div className="header-container container-lg">
        <div className="header-left">
          <h1 className="header-title">
            <Link to="/main">
              <img src={logo} alt="로고" />
            </Link>
          </h1>
        </div>
        <div className="header-center">
          <ul className="header-member">
            {isAuthenticated ? (
              <>
                <li>
                  <a href = 'http://localhost:8083/logout'>로그아웃</a>
                </li>
                <li>
                  <a href = 'http://localhost:8083/profile'>회원정보수정</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href = 'http://localhost:8083/login'>로그인</a>
                </li>
                <li>
                  <a href = 'http://localhost:8083/signup'>회원가입</a>
                </li>
              </>
            )}
          </ul>
          <ul className="header-gnblist">
            <li className="header-gnbitem on">
              <Link className="header-gnblink" to="/main">
                <span>예약하기</span>
              </Link>
              <ul className="header-sublist">
                <li className="header-subitem"><Link className="header-sublink" to="#"><span>인사말</span></Link></li>
                <li className="header-subitem"><Link className="header-sublink" to="#"><span>오시는길</span></Link></li>
              </ul>
            </li>
            <li className="header-gnbitem on">
              <a className="header-gnblink" href = 'http://localhost:8083/cart'>
                <span>구입하기</span>
              </a>
            </li>
            <li className="header-gnbitem on">
              <a className="header-gnblink" href = 'http://localhost:8083/map'>
                <span>추천받기</span>
              </a>
              <ul className="header-sublist">
                <li className="header-subitem"><Link className="header-sublink" to="#"><span>인사말</span></Link></li>
                <li className="header-subitem"><Link className="header-sublink" to="#"><span>오시는길</span></Link></li>
              </ul>
            </li>
            {/* 다른 항목들을 여기에 추가하세요 */}
          </ul>
        </div>
        <div className="header-right">
          <div className="header-utils">
            <a href = 'http://localhost:8083/login' className="btn-user header-utils-btn">
              <img src={userIcon} alt="유저 아이콘" />
            </a>
            <button className="btn-allmenu header-utils-btn">
              <img src={menuIcon} alt="PC 메뉴" />
            </button>
            <button className="btn-momenu header-utils-btn">
              <img src={menuIcon} alt="모바일 메뉴" />
            </button>
            <button className="btn-moclose header-utils-btn">
              <img src={closeIcon} alt="닫기" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;