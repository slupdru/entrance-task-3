import React from "react";
import DateNow from "./DateNow";
import Calendar from "./Calendar";
function CalendarSelector(props) {
  return (
    <div className="timebar_date-container timebar_date-container-mobile">
      <div className="timebar_mobile-container">
        <Calendar displayB={props.clicked} />
        <div onClick={()=>props.changeDateC('arrow','left')} className="timebar_arrow-container">
          <img className="timebar_img_left" src="assets/arrow2.svg" alt="" />
        </div>
        <DateNow //компонент показывает текущую дату
          blue={props.clicked}
          clickDate={props.ClickDate}
          dateProps={props.date}
        />
        <div onClick={()=>props.changeDateC('arrow','right')} className="timebar_arrow-container">
          <img className="timebar_img_right" src="assets/arrow.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
export default CalendarSelector;
