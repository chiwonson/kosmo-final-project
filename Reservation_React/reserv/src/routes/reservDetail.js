import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/ReservDetail.css"

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
        bphoto: m.BPHOTO,
        baddr: m.BADDR,
        bhp: m.BHP,
      },
    });
  };  
  const location = useLocation();
  useEffect(() => {aaa(); bbb();}, [location.pathname]);
  
  return (
    <>
      <div className="wrap-vertical">
        <ul>
          {breadselect && breadselect.map(m => (
            <li key={m.BNUM}>
              <img src={`http://localhost:5001${m.BPHOTO}`} alt={`bakery_${m.BNUM}`}/>
              <br/>
              <span><Link to={`/main/${m.BNUM}`}>{m.BNAME}</Link></span>
            </li>
          ))} 
        </ul>
      </div>
      <br/>
      <div className='detail'>
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
                    <button onClick={() => moveToWrite(m)}>다음으로&rArr;</button>
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