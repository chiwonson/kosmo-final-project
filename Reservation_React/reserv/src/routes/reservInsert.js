import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import "./bakery.css"
import DatePick from "./Datepick";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReservInsert = () => {

  const location = useLocation();
  const navigate = useNavigate();  
  // const [Mname, SetMname] = useState("");
  // const [Mid, SetMid] = useState("");
  const Rebakery = location.state?.rebakery ?? '정보 없음';
  const [Redate, SetRedate] = useState("");
  const [Retime, SetRetime] = useState("");
  const [Subdate, SetSubdate] = useState("");
  const [Remember, SetRemember] = useState("");

  const handleDataChange = (newDate) => {SetRedate(moment(newDate).format('yyyyMMDD'));};
  const timeHandler = (e) => { e.preventDefault(); SetRetime(e.target.value);};
  const subdateHandler = (e) => {e.preventDefault();SetSubdate(e.target.value);};
  const memHandler = (e) => {e.preventDefault();SetRemember(e.target.value);};
  const moveToMain = () => {navigate('/main');};

  const handleReset = (e) => {
    e.preventDefault(); // 기본 리셋 동작 방지
    SetRedate("");
    SetRetime("");
    SetSubdate("");
    SetRemember("");
  };

  const handleClick = (time) => {
    alert(`예약 시간: ${time}`);
    SetRetime(time);
  };

  const times = [
    '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <>
      <div>
      <form id="myForm">          
        <table border="1">
          <tbody>
          <tr><td>가게이름</td>
          <td><input type="text" name="rebakery" value={Rebakery} readOnly></input></td></tr>
          <tr><td>예약날짜</td>
          <td><input type="text" name="redate" value={Redate} readOnly></input></td></tr>          
          <tr><td>예약시간</td>
          <td><input type="text" name="retime" value={Retime} readOnly></input></td></tr>
          <tr><td>인원수</td>
          <td><input type="text" name="remember" value={Remember} onChange={memHandler}></input></td></tr>
          <tr><td>신청일</td>
          <td><input type="hidden" name="subdate" value={Subdate} onChange={subdateHandler}></input></td></tr>			  
          <tr>   

          <td colSpan="2">
            <button type="submit">보내기</button>
            <button type="button" onClick={handleReset}>처음부터</button>
          </td>				
          </tr>
          </tbody>
        </table>
      </form>
      </div>
      <div className="container">
        <div className="box">
          <DatePick onDataChange={handleDataChange}/>
        </div>
        <div className="box">
          <div>방문할 시간을 선택하세요.</div>
          <div className="grid-container">
            {times.map((time) => (
              <Button
                key={time}
                variant="success"
                size="sm"
                onClick={() => handleClick(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          <div>
            sdfsdf
          </div>
        </div>
      </div>
      <h2>{`가게이름: ${Rebakery ?? '정보 없음'}`}</h2>
      <div className='btn2'>
        <button onClick={moveToMain}>&lArr;처음으로</button>
      </div> 
    </>
  );
}

export default ReservInsert;









<div className="grid-container">
            <Button variant="success" size="sm">10:00</Button>
            <Button variant="success" size="sm">11:00</Button>
            <Button variant="success" size="sm">12:00</Button>
            <Button variant="success" size="sm">13:00</Button>
            <Button variant="success" size="sm">14:00</Button>
            <Button variant="success" size="sm">15:00</Button>
            <Button variant="success" size="sm">16:00</Button>
            <Button variant="success" size="sm">17:00</Button>
            <Button variant="success" size="sm">18:00</Button>  
          </div>