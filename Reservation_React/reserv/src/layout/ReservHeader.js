import React, { useEffect, useState } from 'react';
import '../css/ReservHeader.css';
import { Link, } from "react-router-dom";
import axios from 'axios';

const Header = () => {
  const [jsondata, setJsondata] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8083/BreadTour/api/reserv')
      .then(response => setJsondata(response.data))
      .catch(error => console.log(error))
  }, []);

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
              {(() => {
                if (jsondata) {
                  return <Link to="#">{jsondata.mname} 회원님</Link>;
                } else {
                  return <nav><Link to="#">로그인</Link>
                              <Link to="#">회원가입</Link></nav>;
                }
              })()}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;