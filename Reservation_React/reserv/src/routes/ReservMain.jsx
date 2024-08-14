import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../css/ReservMain.css";

const ReservMain = () => {
  const [breadselect, setBreadSelect] = useState(null);

  const aaa = async () => {
    const resp = await axios.get("http://localhost:5001/breadAll");
    setBreadSelect(resp.data);
  };
      
  useEffect(() => {aaa();}, []);
  
  return (
    <>
      <div className="wrap-vertical">
      <div className="header-image-container">
          <img src={require('../resources/images/breadpattern31.jpg')} alt="Header" className="header-image" />
          <div className="header-text">
            
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
    </>
  );
}

export default ReservMain;
