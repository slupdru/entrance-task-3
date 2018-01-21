import React from "react";
import DateNow from "./DateNow";
import Calendar from "./Calendar";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController} from 'react-dates';
import moment from 'moment';
let momentMy = new moment();
momentMy.locale('ru');
class CalendarSelector extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      date:momentMy,
      focused:false
    };
  }
  render(){
  return (
    <div className="timebar_date-container timebar_date-container-mobile">
      <div className="timebar_mobile-container">
        <div onClick={()=>this.props.changeDateC('arrow','left')} className="timebar_arrow-container">
          <img className="timebar_img_left" src="assets/arrow2.svg" alt="" />
        </div>
        <DateNow //компонент показывает текущую дату
          blue={this.state.focused}
          clickDate={this.props.ClickDate}
          dateProps={this.props.date}
        />
        < SingleDatePicker
              date={this.state.date}
              numberOfMonths={1}
              orientation="vertical" 
              verticalHeight={380}
              daySize={47}
              isOutsideRange={()=>{}}
              onDateChange={date =>
                { 
                this.setState({ date });
                this.props.changeDateCalendarC(date);
              }
            } 
              focused={this.state.focused} 
              onFocusChange={({ focused }) => this.setState({ focused })} 
              noBorder={true}
            />
        <div onClick={()=>this.props.changeDateC('arrow','right')} className="timebar_arrow-container">
          <img className="timebar_img_right" src="assets/arrow.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
}
export default CalendarSelector;
