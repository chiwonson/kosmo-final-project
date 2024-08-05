import React from 'react';
import '../css/ReservHeader.css';
import { Link, } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="headcontainer">
        <div className="header">
          <div className='logoimg'><img src="logo.png" alt="Logo" /></div>
          <div>
            <nav>
              <Link to="#">빵집 소개</Link>
              <Link to="#">제품 판매</Link>
              <Link to="#">실시간 빵뉴스</Link>
              <Link to="/main">예약 / 웨이팅 등록</Link>
              <Link to="#">로그인</Link>
              <Link to="#">회원가입</Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;