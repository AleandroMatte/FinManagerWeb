import React, { useState } from 'react';
import './datepick.css';

const Datepicker = (props) => {
  const [date, setDate] = useState();
  const handleDateChange = (e) => {
    setDate(e.target.value);
    props.onDateChange(e.target.value);
  };

  return (
    <div className="Datepicker" >
      <h1>{props.label}</h1>
      <input type="date" onChange={handleDateChange} defaultValue={props.default? props.default:null} ></input>
    </div>
  );
};

export default Datepicker;
