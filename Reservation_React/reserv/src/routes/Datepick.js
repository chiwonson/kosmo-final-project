import React, { useState } from 'react';
import moment from "moment";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일을 적용합니다.
import { enUS } from 'date-fns/locale';
import './Datepick.css';

function DatePick({onDataChange}) {
  // 현재 날짜 상태를 관리합니다.
  const [date, setDate] = useState(new Date());

  // 날짜가 변경될 때 호출되는 함수입니다.
  const handleDateChange = newDate => {
    setDate(newDate);
    onDataChange(newDate);
  };

  moment.locale('en-gb');
  return (
    <div>
      <h1>날짜 선택기</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
        locale={enUS}
        formatDay={(locale, date) => moment(date).format("DD")}
      />
      <p>선택된 날짜: {date.toDateString()}</p>
      {moment(date).format('yyyyMMDD')}<br />
      {moment(date).format("YYYY년 MM월 DD일")} 
    </div>
  );
}

export default DatePick;