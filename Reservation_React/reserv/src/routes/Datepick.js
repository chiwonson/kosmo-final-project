import React, { useState } from 'react';
import moment from "moment";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일을 적용합니다.
import { enUS } from 'date-fns/locale';
import './Datepick.css';

function DatePick({onDataChange}) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = newDate => {
    setDate(newDate);
    onDataChange(newDate);
  };
  
  moment.locale('en-gb');
  
  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        locale={enUS}
        formatDay={(locale, date) => moment(date).format("DD")}
      />  
    </div>
  );
}

export default DatePick;