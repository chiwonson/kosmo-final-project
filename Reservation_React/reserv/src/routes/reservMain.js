import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "./bakery.css";

const ReservMain = () => {
  const navigate = useNavigate(); 
  const [breadselect, setBreadSelect] = useState(null);

  const aaa = async () => {
    const resp = await axios.get("http://localhost:5001/breadAll");    
    console.log(">>>>>>>>>>>> :: ");  
    console.log(resp); 
  
    setBreadSelect(resp.data);
  };
      
  const moveToWrite = () => {
    navigate('/insert');
  };  
  useEffect(() => {
    aaa();
  }, []);
  
  return (
    <>
      <ul class="wrap-vertical">
        {breadselect && breadselect.map(m => (
          <li key={m.bnum}>
            <img src='m.bphoto' alt='bakery_01'/>
            <Link to={`/board/${m.bnum}`}>사진{m.bnum}</Link>
          </li>
        ))} 
      </ul>
      <div>
        <button onClick={moveToWrite}>다음으로-&gt;</button>
      </div>
    </>
  );
}

export default ReservMain;
