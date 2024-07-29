import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./bakery.css"

const ReservDetail = () => {
  const navigate = useNavigate(); 
  const [breadselect, setBreadSelect] = useState(null);
  const [breadone, setBreadOne] = useState(null);
  const { bnum } = useParams();
  
  const aaa = async () => {
    const resp = await axios.get("http://localhost:5001/breadAll");    
    console.log(">>>>>>>>>>>> :: ");  
    console.log(resp); 
  
    setBreadSelect(resp.data);
  };

  const bbb = async () => {
    const resp2 = await axios.post(`http://localhost:5001/breadone/${bnum}`); 
    console.log(">>>>ONE>>> :: ");  
    console.log(resp2); 
  
    setBreadOne(resp2.data);
  };
      
  const moveToWrite = () => {navigate('/insert');};  
  const moveToMain = () => {navigate('/main');};
  const location = useLocation();
  useEffect(() => {aaa(); bbb();}, [location.pathname]);
  
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
        자세한 설명들
        <ul>
          {breadone && breadone.map(m => (
            <li key={m.BNUM}>
              {m.BMEMO}
              <br/>
              {m.BHP}
              <br/>
              {m.BADDR}
            </li>
          ))} 
        </ul>
      </div>
      <div>
        <button onClick={moveToMain}>&lt;-처음으로</button>
        <button onClick={moveToWrite}>다음으로-&gt;</button>
      </div>
    </>
  );
}

export default ReservDetail;