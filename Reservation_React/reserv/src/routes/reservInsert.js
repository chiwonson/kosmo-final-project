import React, { useState, useEffect, useRef  } from "react";
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
  const Bphoto = location.state?.bphoto ?? 'main_photo';
  const [Redate, SetRedate] = useState("");
  const [Retime, SetRetime] = useState("");
  const [Remember, SetRemember] = useState("");
  const [buttonStates, setButtonStates] = useState({1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true});
  const buttonRefs = useRef([]);

  const handleDataChange = (newDate) => {SetRedate(moment(newDate).format('yyyyMMDD'));};
  const handleClick = (time) => {SetRetime(time);};
  
  useEffect(() => {
    const fetchData = async () => {
      if (Retime && Redate) {
        try {
          alert(`예약 날짜: ${Redate}\n예약 시간: ${Retime}`);
          console.log(Rebakery);
          console.log(Redate);
          console.log(Retime);
          let bodys = {rebakery: Rebakery, redate: Redate, retime: Retime,};
          const resp = await axios.post("http://localhost:5001/total", bodys);
          let tot = resp.data.map(item => item.total_sum)[0];
          console.log(tot);

          const updatedButtonStates = {};
          buttonRefs.current.forEach((ref, index) => {
            if (ref) {
              const buttonValue = parseInt(ref.innerText, 10);
              if (20 - tot - buttonValue >= 0) {updatedButtonStates[index] = false;}
              else {updatedButtonStates[index] = true;}
            }
          });
          setButtonStates(updatedButtonStates);    
        } catch (error) {console.error("비동기 작업 오류: ", error);}
      }
    };
    fetchData();
  }, [Redate, Retime, Rebakery]);

  const handlerMem = (mem) => {SetRemember(mem);}; 

  const saveReserv = async (e) => {
    e.preventDefault();
    let now = new Date();
    let Subdate = now.toLocaleString();    
    // console.log(Mname);
    // console.log(Mid);
    console.log(Rebakery);
    console.log(Redate);
    console.log(Retime);
    console.log(Remember);
    console.log(Subdate);
    if (!Redate) {alert('날짜를 다시 입력해주세요.'); return;}
    if (!Retime) {alert('원하시는 시간응 입력해주세요.'); return;}
    if (!Remember) {alert('인원 수를 입력해주세요.'); return;}
    let bodys = {
      // mname: Mname,
      // mid: Mid,
      rebakery: Rebakery,
      redate: Redate,
      retime: Retime,
      remember: Remember,
      subdate: Subdate, 
    };
   
    await axios.post("http://localhost:5001/write", bodys)
    .then((res) => {
      alert('등록되었습니다.');
      navigate('/main');
    });
  };

  const moveToMain = () => {navigate('/main');};

  const handleReset = (e) => {
    e.preventDefault();
    SetRedate("");
    SetRetime("");
    SetRemember("");
    setButtonStates({1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true});
  };

  const times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const members = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <>
      <div className="insertimage">
        <img src={Bphoto} alt="photo_main"/>
      </div>
      <div className="container">
        <div className="box">
          <DatePick onDataChange={handleDataChange}/>
        </div>
        <div className="box">  
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
        </div>
        <div className="box">
          <div className="grid-containerm">
            {members.map((mem) => (
              <Button className="btnm"
                key={mem}
                variant="success"
                size="sm"
                onClick={() => handlerMem(mem)}
                ref={el => buttonRefs.current[mem] = el}
                disabled={buttonStates[mem]}
              >
                {mem}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="retable">       
        <table border="1">
          <tbody>
          <tr><td>가게이름:&nbsp;</td>
          <td><input type="text" value={Rebakery} readOnly></input></td></tr>
          <tr><td>예약날짜:</td>
          <td><input type="text" value={Redate} readOnly></input></td></tr>          
          <tr><td>예약시간:</td>
          <td><input type="text"value={Retime} readOnly></input></td></tr>
          <tr><td>인원수 :</td>
          <td><input type="text" value={Remember} readOnly></input></td></tr>		  
          </tbody>
        </table>
      </div>
      <div className='btn2'>
        <Button variant="warning" size="lg" onClick={handleReset}> 처음부터 </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="warning" size="lg" onClick={saveReserv}> 예약하기 </Button>
      </div>
      <div className='btn2'>
        <button onClick={moveToMain}>&lArr;처음으로</button>
      </div> 
    </>
  );
}

export default ReservInsert;
