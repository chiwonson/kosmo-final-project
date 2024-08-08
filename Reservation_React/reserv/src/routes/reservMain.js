import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../css/ReservMain.css";

const ReservMain = () => {
  const [breadselect, setBreadSelect] = useState(null);

  const aaa = async () => {
    const resp = await axios.get("http://localhost:5001/breadAll");    
    console.log(">>>>>>mainjs>>>>>> :: ");  
    console.log(resp); 
  
    setBreadSelect(resp.data);
  };
      

  useEffect(() => {aaa();}, []);
  
  return (
    <>
      <div className="wrap-vertical">
        <ul>
          {breadselect && breadselect.map(m => (
            <li key={m.BNUM}>
              <img src={`http://localhost:5001${m.BPHOTO}`} alt={`bakery_${m.BNUM}`}/>
              <br/><br/>
              <span><Link to={`/reservation/${m.BNUM}`}>{m.BNAME}</Link></span>

            </li>
          ))} 
        </ul>
      </div>
    </>
  );
}

export default ReservMain;
