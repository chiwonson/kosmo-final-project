import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "./bakery.css"

const ReservMain = () => {
  const navigate = useNavigate(); 
  const [breadselect, setBreadSelect] = useState(null);

  const aaa = async () => {
    const resp = await axios.get("http://localhost:5001/breadAll");    
    console.log(">>>>>>mainjs>>>>>> :: ");  
    console.log(resp); 
  
    setBreadSelect(resp.data);
  };
      
  const moveToWrite = () => {navigate('/');};  
  useEffect(() => {aaa();}, []);
  
  return (
    <>
      <div className="wrap-vertical">
        <ul>
          {breadselect && breadselect.map(m => (
            <li key={m.BNUM}>
              <img src={m.BPHOTO} alt={`bakery_${m.BNUM}`}/>
              <br/>
              <span><Link to={`/main/${m.BNUM}`}>{m.BNAME}</Link></span>
            </li>
          ))} 
        </ul>
      </div>
      <div>
        <button onClick={moveToWrite}>&lt;-메인으로</button>
      </div>
    </>
  );
}

export default ReservMain;
