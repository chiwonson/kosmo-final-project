import React from 'react';
import logo from '../resources/images/img_logo.png';
import userIcon from '../resources/icons/ico_user_white.svg';
import menuIcon from '../resources/icons/ico_menu_white.svg';
import closeIcon from '../resources/icons/ico_close_white.svg';
import '../css/style.css';
import '../css/template.css';
import '../css/plugin.css';
import '../js/plugin';
import '../js/template';
import '../js/script';

const Header = ({ isAuthenticated }) => {

  const handleLogout = () => {
    // 로그아웃 로직을 여기에 추가하세요.
    window.location.href = 'http://localhost:8083/logout';
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:8083/login';
  };

  const handleSignup = () => {
    window.location.href = 'http://localhost:8083/signup';
  };

  const handleProfile = () => {
    window.location.href = 'http://localhost:8083/profile';
  };

  return (
    <header className="butti-N1" data-bid="PQLYMqEDN1">
      <div className="header-container container-lg">
        <div className="header-left">
          <h1 className="header-title">
            <a href="#">
              <img src={logo} alt="로고" />
            </a>
          </h1>
        </div>
        <div className="header-center">
          <ul className="header-member">
            {isAuthenticated ? (
              <>
                <li>
                  <a onClick={handleLogout}>로그아웃</a>
                </li>
                <li>
                  <a onClick={handleProfile}>회원정보수정</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a onClick={handleLogin}>로그인</a>
                </li>
                <li>
                  <a onClick={handleSignup}>회원가입</a>
                </li>
              </>
            )}
          </ul>
          <ul className="header-gnblist">
            <li className="header-gnbitem on">
              <a className="header-gnblink" href="http://localhost:3000/main">
                <span>예약하기</span>
              </a>
              <ul className="header-sublist">
                <li className="header-subitem"><a className="header-sublink" href="#"><span>인사말</span></a></li>
                <li className="header-subitem"><a className="header-sublink" href="#"><span>오시는길</span></a></li>
              </ul>
            </li>
            <li className="header-gnbitem on">
              <a className="header-gnblink" href="http://localhost:8083/cart">
                <span>구입하기</span>
              </a>
            </li>
            <li className="header-gnbitem on">
              <a className="header-gnblink" href="http://localhost:8083/map">
                <span>추천받기</span>
              </a>
              <ul className="header-sublist">
                <li className="header-subitem"><a className="header-sublink" href="#"><span>인사말</span></a></li>
                <li className="header-subitem"><a className="header-sublink" href="#"><span>오시는길</span></a></li>
              </ul>
            </li>
            {/* 다른 항목들을 여기에 추가하세요 */}
          </ul>
        </div>
        <div className="header-right">
          <div className="header-utils">
            <a href="http://localhost:8083/login" className="btn-user header-utils-btn">
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