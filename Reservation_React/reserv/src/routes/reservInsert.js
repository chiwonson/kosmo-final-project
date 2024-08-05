import React, { useState, useEffect, useRef  } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import DatePick from "./Datepick";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ReservInsert.css';

const ReservInsert = () => {

  const location = useLocation();
  const navigate = useNavigate();  
  // const [Mname, SetMname] = useState("");
  // const [Mid, SetMid] = useState("");
  const Rebakery = location.state?.rebakery ?? '정보 없음';
  const Bphoto = location.state?.bphoto ?? 'main_photo';
  const Baddr = location.state.baddr;
  const Bhp = location.state.bhp;
  const [Redate, SetRedate] = useState("");
  const [Retime, SetRetime] = useState("");
  const [Remember, SetRemember] = useState("");
  const [buttonStates, setButtonStates] = useState({1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true});
  const buttonRefs = useRef([]);
  const [jsondata, setJsondata] = useState('');

  const handleDataChange = (newDate) => {SetRedate(moment(newDate).format('yyyyMMDD'));};
  const handleClick = (time) => {SetRetime(time);};
  
  useEffect(() => {
    const fetchData = async () => {
      if (Retime && Redate) {
        let now = new Date();
        let year = now.getFullYear();
        let month = String(now.getMonth() + 1).padStart(2, '0');
        let day = String(now.getDate()).padStart(2, '0');
        let today = `${year}${month}${day}`;
        if (today >= Redate) {
          alert('예약은 신청일 기준 다음 날 부터 가능합니다.');
          SetRemember("");
          setButtonStates({1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true});
          return;
        }
        try {
          alert(`예약 날짜: ${formattedDate}\n예약 시간: ${Retime}`);
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

  useEffect(() => {
    axios.get('http://localhost:8083/BreadTour/api/reserv')
      .then(response => setJsondata(response.data))
      .catch(error => console.log(error))
  }, []);

  const handlerMem = (mem) => {SetRemember(mem);}; 

  const saveReserv = async (e) => {
    e.preventDefault();
    let now = new Date();
    let Subdate = now.toLocaleString();    
    console.log(jsondata.mname);
    console.log(jsondata.mid);
    console.log(Rebakery);
    console.log(Redate);
    console.log(Retime);
    console.log(Remember);
    console.log(Subdate);
    if (!Redate) {alert('날짜를 다시 입력해주세요.'); return;}
    if (!Retime) {alert('원하시는 시간을 입력해주세요.'); return;}
    if (!Remember) {alert('인원 수를 입력해주세요.'); return;}
    let bodys = {
      mname: jsondata.mname,
      mid: jsondata.mid,
      rebakery: Rebakery,
      redate: Redate,
      retime: Retime,
      remember: Remember,
      subdate: Subdate, 
    };
   
    await axios.post("http://localhost:5001/write", bodys)
    .then((res) => {
      alert('등록되었습니다.');
      setModalOpen(false);
    });

    try {
      await axios.post('http://localhost:5001/api/send-email', {
        to: jsondata.mid,
        subject: `${jsondata.mname}님, BreadTour 에서 보낸 메시지 입니다.`,
        message: `                  가게명:                    ${Rebakery}
                  예약 날짜:                ${formattedDate}
                  예약 시간:                ${Retime}
                  인원:                       ${Remember}
                  --------------------------------------------------------------------------            
                  전화번호:                 ${Bhp}
                  주소:                       ${Baddr}
                  --------------------------------------------------------------------------
                  ${Subdate}
                  `,
      })
      .then((res) => {
        alert('해당 이메일에서 확인 가능합니다.');
        navigate('/main');
      });     
    } catch (error) {
      console.error('Error sending email:', error);
      alert('에러 :');
      navigate('/main');
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    SetRedate("");
    SetRetime("");
    SetRemember("");
    setButtonStates({1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true});
  };

  const times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const members = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const formatDate = (dateStr) => {return dateStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');};
  const formattedDate = formatDate(Redate);
  return (
    <>
      <div className="container">
        <div className="box">
          <div className="calendar">
            <DatePick onDataChange={handleDataChange}/>
          </div>
          <div className="grid-container">
            {times.map((time) => (
              <Button
                key={time}
                size="lg"
                onClick={() => handleClick(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          <div className="grid-containerm">
            {members.map((mem) => (
              <Button
                key={mem}
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
        <div className="box">
          <div className="insertimage">
            <img src={`http://localhost:5001${Bphoto}`} alt="photo_main"/>
          </div>
          <br/>
          <div className="retable">  
            <table>
              <tr><td>가게이름:&nbsp;</td>
              <td><input type="text" value={Rebakery} readOnly></input></td></tr>
              <tr><td>예약날짜:</td>
              <td><input type="text" value={formattedDate} readOnly></input></td></tr>          
              <tr><td>예약시간:</td>
              <td><input type="text"value={Retime} readOnly></input></td></tr>
              <tr><td>인원수 :</td>
              <td><input type="text" value={`${Remember}(인)`} readOnly></input></td></tr>		  
            </table>
          </div>
          <div className='btn9'>
            <Button variant="warning" size="lg" onClick={handleReset}> 처음부터 </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="warning" size="lg" onClick={() => setModalOpen(true)}> 예약하기 </Button>
          </div>
        </div>
      </div>

      
      {
        modalOpen &&
        <div className='modal-container' ref={modalBackground} onClick={e => {
          if (e.target === modalBackground.current) {
            setModalOpen(false);
          }
        }}>
          <div className='modal-content'>
            <h5><strong>예약 확인서</strong></h5>
            -------------------------------------------------------------------
            <table>
              <tr><th>가게명</th><td>{Rebakery}</td></tr>
              <tr><th>예약 날짜</th><td>{formattedDate}</td></tr>
              <tr><th>예약 시간</th><td>{Retime}</td></tr>
              <tr><th>인원</th><td>{Remember}</td></tr>
              <tr><td colSpan={2}>-------------------------------------------------------------------</td></tr>
              <tr><th>전화번호</th><td>{Bhp}</td></tr>
              <tr><th>가게 주소</th><td>{Baddr}</td></tr>
            </table>
            -------------------------------------------------------------------
            <span>수정사항이 있거나 취소하실려면 바깥 영역을 클릭하세요.</span>
            -------------------------------------------------------------------         
            <button className='modal-close-btn' onClick={saveReserv}>
              예약 확정
            </button>           
          </div>
        </div>
      }
    </>
  );
}

export default ReservInsert;
