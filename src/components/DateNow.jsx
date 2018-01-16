import React from "react";
import PropTypes from "prop-types";
function DateNow(props) {
  let yearNow = props.dateProps.getYear();
  let dayNow = props.dateProps.getDate();
  let monthNum = props.dateProps.getMonth();

  let datemass = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ];
  let month = datemass[monthNum];
  console.log(month);
  if ((dayNow === new Date().getDate())&&(yearNow === new Date().getYear())&&(monthNum === new Date().getMonth())) {
    return (
      <a
        style={props.blue === true ? { color: "rgb(0, 112, 224)" } : {}}
        onClick={props.clickDate}
        className="timebar_date"
      >{`${dayNow} ${month.substring(0, 3)} · Сегодня`}</a>
    );
  } else {
    return (
      <a
        style={props.blue === true ? { color: "rgb(0, 112, 224)" } : {}}
        onClick={props.clickDate}
        className="timebar_date"
      >{`${dayNow} ${month}`}</a>
    );
  }
}
DateNow.propTypes = {
  dateProps: PropTypes.instanceOf(Date)
};
export default DateNow;
