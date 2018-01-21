import React from "react";
import Floors from "./Floors";
import Timebar from "./Timebar";
class MainContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <main>
        <Timebar changeDateCalendarT={this.props.changeDateCalendarM} changeDateT={this.props.changeDateM} dateNow={this.props.dateNow}/>
        {/* Сетка с временными интрвалами */}
        <div className="main-container" id="main_cont">
          <div className="linear-back">
            <div className="linear-back_container">
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
              <div className="linear-back_line" />
            </div>
          </div>
          <div className="white-background" />
          <Floors dateNow={this.props.dateNow} />
        </div>
      </main>
    );
  }
}
export default MainContainer;
