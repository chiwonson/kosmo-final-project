import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import logo from '../resources/images/img_logo.png';
import userIcon from '../resources/icons/ico_user_white.svg';
import menuIcon from '../resources/icons/ico_menu_white.svg';
import closeIcon from '../resources/icons/ico_close_white.svg';
import '../css/style.css';
import '../css/template.css';
import '../css/plugin.css';
import '../css/setting.css';

const Header = ({ isAuthenticated }) => {

  useEffect(() => {
    // Define handleScroll function
    const handleScroll = () => {
      const blocks = document.querySelectorAll('.butti-N1');
      blocks.forEach(block => {
        const scrollTop = window.scrollY;
        if (scrollTop > 0) {
          block.classList.add('header-top-active');
        } else {
          block.classList.remove('header-top-active');
        }
      });
    };

    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    const blocks = document.querySelectorAll('.butti-N1');
    blocks.forEach(block => {
      // Gnb
      const headerCenter = block.querySelector('.header-center');
      if (headerCenter) {
        headerCenter.addEventListener('mouseover', () => {
          if (window.innerWidth > 992) {
            block.classList.add('block-active');
          }
        });

        headerCenter.addEventListener('mouseout', () => {
          if (window.innerWidth > 992) {
            block.classList.remove('block-active');
          }
        });
      }

      // Gnb DecoLine
      const gnbItems = block.querySelectorAll('.header-gnbitem');
      gnbItems.forEach(item => {
        item.addEventListener('mouseover', () => {
          if (window.innerWidth > 992) {
            const link = item.querySelector('.header-gnblink');
            if (link) link.classList.add('on');
          }
        });

        item.addEventListener('mouseout', () => {
          if (window.innerWidth > 992) {
            const link = item.querySelector('.header-gnblink');
            if (link) link.classList.remove('on');
          }
        });
      });

      // Mobile Top
      const btnMoMenu = block.querySelector('.btn-momenu');
      const btnMoClose = block.querySelector('.btn-moclose');

      if (btnMoMenu) {
        btnMoMenu.addEventListener('click', () => {
          block.classList.add('mo-active');
        });
      }

      if (btnMoClose) {
        btnMoClose.addEventListener('click', () => {
          block.classList.remove('mo-active');
        });
      }

      // Mobile Gnb
      gnbItems.forEach(item => {
        const link = item.querySelector('.header-gnblink');
        if (link) {
          link.addEventListener('click', () => {
            const parent = link.closest('.header-gnbitem');
            if (parent && !parent.classList.contains('item-active')) {
              gnbItems.forEach(i => i.classList.remove('item-active'));
            }
            if (parent) parent.classList.toggle('item-active');
          });
        }
      });

      // Full Gnb
      const btnAllMenu = block.querySelector('.btn-allmenu');
      const fullMenuClose = block.querySelector('.fullmenu-close');

      if (btnAllMenu) {
        btnAllMenu.addEventListener('click', () => {
          const headerFullMenu = block.querySelector('.header-fullmenu');
          if (headerFullMenu) headerFullMenu.classList.add('fullmenu-active');
        });
      }

      if (fullMenuClose) {
        fullMenuClose.addEventListener('click', () => {
          const headerFullMenu = block.querySelector('.header-fullmenu');
          if (headerFullMenu) headerFullMenu.classList.remove('fullmenu-active');
        });
      }

      // Full Gnb DecoLine
      const fullGnbItems = block.querySelectorAll('.fullmenu-gnbitem');
      fullGnbItems.forEach(item => {
        item.addEventListener('mouseover', () => {
          if (window.innerWidth > 992) {
            const link = item.querySelector('.fullmenu-gnblink');
            if (link) link.classList.add('on');
          }
        });

        item.addEventListener('mouseout', () => {
          if (window.innerWidth > 992) {
            const link = item.querySelector('.fullmenu-gnblink');
            if (link) link.classList.remove('on');
          }
        });
      });

      // Header Mobile 1Depth Click
      if (window.innerWidth <= 992) {
        fullGnbItems.forEach(item => {
          const sublist = item.querySelector('.fullmenu-sublist');
          if (sublist) {
            const link = item.querySelector('.fullmenu-gnblink');
            if (link) link.setAttribute('href', 'javascript:void(0);');
          }
        });
      }
    });

    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
      // Remove other event listeners if needed
    };
  }, []);

  return (
    <header className="butti-N1" data-bid="PQLYMqEDN1">
      <div className="header-container container-lg">
        <div className="header-left">
          <h1 className="header-title">
            <a href="http://localhost:8083/main">
              <img src={logo} alt="로고" />
            </a>
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
            <li class="header-gnbitem on">
                        <a class="header-gnblink" href="http://127.0.0.1:5000/sall">
                            <span>추천받기</span>
                        </a>
                    </li>
            <li class="header-gnbitem on">
              <a class="header-gnblink" href="http://192.168.0.2:5000/map">
                <span>빵지도</span>
              </a>
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