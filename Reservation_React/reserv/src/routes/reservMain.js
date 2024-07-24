import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const reservMain = () => {
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
          <ul>       
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

export default reservMain;
