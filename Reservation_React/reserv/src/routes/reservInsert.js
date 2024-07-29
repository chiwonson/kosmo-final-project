import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import "./bakery.css"

const ReservInsert = () => {

  const location = useLocation();
  const navigate = useNavigate();  
  const [Mname, SetMname] = useState("");
  const [Mid, SetMid] = useState("");
  const Rebakery = location.state?.rebakery ?? '정보 없음';
  const [Redate, SetRedate] = useState("");
  const [Retime, SetRetime] = useState("");
  const [Subdate, SetSubdate] = useState("");
  const [Remember, SetRemember] = useState("");

  const dateHandler = (e) => {
    e.preventDefault();
    SetRedate(e.target.value);
  };

  const timeHandler = (e) => {
    e.preventDefault();
    SetRetime(e.target.value);
  };

  const subdateHandler = (e) => {
    e.preventDefault();
    SetSubdate(e.target.value);
  };

  const memHandler = (e) => {
    e.preventDefault();
    SetRemember(e.target.value);
  };

  const moveToMain = () => {navigate('/main');};

  return (
    <>
      <div>
      <form>          
        <table border="1">
          <tbody>
          <tr><td>가게이름</td>
          <td><input type="text" name="rebakery" value={Rebakery} readOnly></input></td></tr>
          <tr><td>id</td>
          <td><input type="text" name="redate" value={Redate} onChange={dateHandler}></input></td></tr>          
          <tr><td>password</td>
          <td><input type="text" name="retime" value={Retime} onChange={timeHandler}></input></td></tr>
          <tr><td>id</td>
          <td><input type="text" name="remember" value={Remember} onChange={memHandler}></input></td></tr>
          <tr><td>password</td>
          <td><input type="hidden" name="subdate" value={Subdate} onChange={subdateHandler}></input></td></tr>			  
          <tr>   

          <td colSpan="2">
            <button type="submit">보내기</button>
            <button >취소</button>
          </td>				
          </tr>
          </tbody>
        </table>
      </form>
      </div>
      <h1>insert</h1>
      <h2>{`가게이름: ${Rebakery ?? '정보 없음'}`}</h2>
      <div className='btn'>
        <button onClick={moveToMain}>&lArr;처음으로</button>
      </div> 
    </>
  );
}

export default ReservInsert;