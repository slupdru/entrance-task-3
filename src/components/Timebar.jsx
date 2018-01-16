import React from "react";
import "../assets/arrow.svg";
import "../assets/arrow2.svg";
import DateNow from "./DateNow";
import HoursInTimeBar from "./HoursInTimeBar";
import Calendar from "./Calendar";
const minute = 1000 * 60;

class Timebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked:false
    };
    this.handleClickDate = this.handleClickDate.bind(this);
  }

  handleClickDate(event) {
    this.setState({
      clicked: !this.state.clicked
    });
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
            <Calendar displayB={this.state.clicked} />
            {console.log(this.state.clicked)}
            <div onClick={()=>this.props.changeDateT('arrow','left')} className="timebar_arrow-container">
              <img
                className="timebar_img_left"
                src="assets/arrow2.svg"
                alt=""
              />
            </div>
            <DateNow
              blue={this.state.clicked}
              clickDate={this.handleClickDate}
              dateProps={dateMy}
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
