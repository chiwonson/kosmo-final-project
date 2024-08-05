import React, { useEffect, useState } from 'react';
import '../css/style.css';
import '../css/template.css';
import '../css/plugin.css';
import axios from 'axios';

const Header = () => {
  const [jsondata, setJsondata] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8083/BreadTour/api/reserv')
      .then(response => setJsondata(response.data))
      .catch(error => console.log(error))
  }, []);

  return (
  <header class="butti-N1" data-bid="PQLYMqEDN1">
    <div class="header-container container-lg">
      <div class="header-left">
        <h1 class="header-title">
          <a href="javascript:void(0);">
            <img src="../../resources/images/img_logo.png" alt="로고" />
          </a>
        </h1>
      </div>
      <div class="header-center">
        <ul class="header-member">
          <li>
            <a href="http://localhost:8083/logout">로그아웃</a>
          </li>
          <li>
            <a href="http://localhost:8083/profile">회원정보수정</a>
          </li>
        </ul>
        <ul class="header-gnblist">
          <li class="header-gnbitem on">
            <a class="header-gnblink" href="http://localhost:8083/map">
              <span>예약하기</span>
            </a>
            <ul class="header-sublist">
              <li class="header-subitem"><a class="header-sublink" href="#"><span>인사말</span></a></li>
              <li class="header-subitem"><a class="header-sublink" href="#"><span>오시는길</span></a></li>
            </ul>
          </li>

          <li class="header-gnbitem on">
            <a class="header-gnblink" href="http://localhost:8083/cart">
              <span>구입하기</span>
            </a>
          </li>

          <li class="header-gnbitem on">
            <a class="header-gnblink" href="http://localhost:8083/map">
              <span>추천받기</span>
            </a>
            <ul class="header-sublist">
              <li class="header-subitem"><a class="header-sublink" href="#"><span>인사말</span></a></li>
              <li class="header-subitem"><a class="header-sublink" href="#"><span>오시는길</span></a></li>
            </ul>
          </li>

        </ul>
      </div>
      <div class="header-right">
        <div class="header-utils">
          <a href="http://localhost:8083/login" class="btn-user header-utils-btn">
            <img src="../../resources/icons/ico_user_white.svg" alt="유저 아이콘" />
          </a>
          <button class="btn-allmenu header-utils-btn">
            <img src="../../resources/icons/ico_menu_white.svg" alt="PC 메뉴" />
          </button>
          <button class="btn-momenu header-utils-btn">
            <img src="../../resources/icons/ico_menu_white.svg" alt="모바일 메뉴" />
          </button>
          <button class="btn-moclose header-utils-btn">
            <img src="../../resources/icons/ico_close_white.svg" alt="닫기" />
          </button>
        </div>
      </div>
    </div>
  </header>
  );
};

export default Header;