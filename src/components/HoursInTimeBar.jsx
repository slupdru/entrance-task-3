import React from "react";
function HoursInTimeBar(props) { //определяем сколько часов уже прошло, делаем их серыми 
  let massOfHours = [];
  let left = (props.hoursIsOver - 7.8 + props.minutes / 60) * 6.4;
  if (left<0){left=0};
  for (let i = 0; i < 16; i++) {
    if (i + 8 > props.hoursIsOver) {
      if (i === 0) {
        massOfHours.push(
          <span key={i} className="time-container_hours">
            8:00
          </span>
        );
      } else
        massOfHours.push(
          <span key={i} className="time-container_hours">
            {i + 8}
          </span>
        );
    } else {
      if (i === 0) {
        massOfHours.push(
          <span
            key={i}
            className="time-container_hours time-container_hours_passed"
          >
            8:00
          </span>
        );
      } else {
        massOfHours.push(
          <span
            key={i}
            className="time-container_hours time-container_hours_passed"
          >
            {i + 8}
          </span>
        );
      }
    }
  }
  return (
    <div className="timebar_time-container">
      <div className="time-now" style={{ left: `${left}%` }}>
        <div className="time-now_ellips">
          <div className="time-now-container">{`${props.hoursIsOver}:${props.minutes}`}</div>
        </div>
        <div className="time-now_line" />
      </div>
      {massOfHours.map(hour => hour)}
    </div>
  );
}
export default HoursInTimeBar;
