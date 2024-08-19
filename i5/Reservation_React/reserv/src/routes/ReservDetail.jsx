import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/ReservDetail.css"

const ReservDetail = () => {
  const navigate = useNavigate(); 
  const [breadselect, setBreadSelect] = useState(null);
  const [breadone, setBreadOne] = useState(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false); // 슬라이드 창 표시 여부 관리
  const { bnum } = useParams();
  
  const aaa = async () => {
    const resp = await axios.get("http://localhost:5001/breadAll");
    setBreadSelect(resp.data);
  };

  const bbb = async () => {
    const resp2 = await axios.post(`http://localhost:5001/breadone/${bnum}`);
    setBreadOne(resp2.data);
    setIsDetailVisible(true); // 슬라이드 창 표시
  };
      
  const moveToWrite = (m) => {
    navigate('/insert', {
      state: {
        rebakery: m.BNAME,
        bphoto: m.BPHOTO,
        baddr: m.BADDR,
        bhp: m.BHP,
      },
    });
  };  

  const closeDetail = () => {
    setIsDetailVisible(false); // 슬라이드 창 숨기기
  };

  const location = useLocation();
  useEffect(() => {aaa(); bbb();}, [location.pathname]);
  
  return (
    <>
      <div className="wrap-vertical">
      <div className="header-image-container">
          <img src={require('../resources/images/breadpattern31.jpg')} alt="Header" className="header-image" />
          <div className="header-text">
            {/* 필요하다면 여기에 헤더 텍스트 추가 */}
          </div>
          <div className="section-text">
            빵지순례 핫플레이스
          </div>
          <div className="section-subtext">
            핫한 빵집들, 이제 웨이팅없이 breadtour 에서 !
          </div>
        </div>
        <ul>
          {breadselect && breadselect.map(m => (
            <li key={m.BNUM}>
              <img src={`http://localhost:5001${m.BPHOTO}`} alt={`bakery_${m.BNUM}`}/>
              <span><Link to={`/reservation/${m.BNUM}`}>{m.BNAME}</Link></span>
            </li>
          ))} 
        </ul>
      </div>
      <br/>
      <div className={`detail ${isDetailVisible ? 'slide-up' : 'hidden'}`}>
        <ul>
          {breadone && breadone.map(m => (
            <li key={m.BNUM}>
              <div className='containerdes'>
                <div className='dhalf bakeimg'>
                  <img src={`http://localhost:5001${m.BPHOTO}`} alt={`bakery_${m.BNUM}`}/>
                </div>
                <div className='dhalf bakedes'>
                  <table>
                    <tr><td>{m.BMEMO}</td></tr><br/>
                    <tr><td>{m.BHP}</td></tr><br/>
                    <tr><td>{m.BADDR}</td></tr><br/>
                    <button onClick={() => moveToWrite(m)}>예약하기</button>
                    <button onClick={closeDetail}>닫기</button> {/* 닫기 버튼 추가 */}
                  </table>
                </div>
              </div>           
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ReservDetail;
