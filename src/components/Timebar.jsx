import React from "react";
import "../assets/arrow.svg";
import "../assets/arrow2.svg";
import DateNow from "./DateNow";
import HoursInTimeBar from "./HoursInTimeBar";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController} from 'react-dates';
import moment from 'moment';

const minute = 1000 * 60;
let momentMy = new moment();
momentMy.locale('ru');
class Timebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:momentMy,
      focused:false
    };
  }

  render() {
    let dateMy = this.props.dateNow;
    let hours = dateMy.getHours();
    let minutes = dateMy.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return (
      <div className="timebar">
        <div className="timebar_main-container">
          <div className="timebar_date-container">
            <div onClick={()=>this.props.changeDateT('arrow','left')} className="timebar_arrow-container">
              <img
                className="timebar_img_left"
                src="assets/arrow2.svg"
                alt=""
              />
            </div>
            <DateNow
              blue={this.state.focused}
              clickDate={this.handleClickDate}
              dateProps={dateMy}
            />
            < SingleDatePicker
              date={this.state.date} 
              numberOfMonths={3}
              isOutsideRange={()=>{}}
              onDateChange={date =>
                { 
                this.setState({ date });
                this.props.changeDateCalendarT(date);
              }
            } 
              focused={this.state.focused} 
              onFocusChange={({ focused }) => this.setState({ focused })}
              noBorder={true}
            />
            <div onClick={()=>this.props.changeDateT('arrow','right')} className="timebar_arrow-container">
              <img
                className="timebar_img_right"
                src="assets/arrow.svg"
                alt=""
              />
            </div>
          </div>
          <div className="timebar_time">
            <HoursInTimeBar minutes={minutes} hoursIsOver={hours} />
          </div>
        </div>
      </div>
    );
  }
}
export default Timebar;
