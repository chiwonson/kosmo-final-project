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
      
  const moveToWrite = (m) => {
    navigate('/insert', {
      state: {
        rebakery: m.BNAME,
      },
    });
  };  
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
      <div className='detail'>
        <ul>
          {breadone && breadone.map(m => (
            <li key={m.BNUM}>
              <div className='bakeimg'>
                <img src={m.BPHOTO} alt={`bakery_${m.BNUM}`}/>
              </div>
              <p/>
              {m.BMEMO}
              <p/>
              {m.BHP}
              <p/>
              {m.BADDR}
            </li>
          ))} 
        </ul>
      </div>
      <div className='btn'>
        <button onClick={moveToMain}>&lArr;처음으로</button>
        {breadone && breadone.map(m => (
        <button onClick={() => moveToWrite(m)}>다음으로&rArr;</button>
        ))}
      </div>
    </>
  );
}

export default ReservDetail;