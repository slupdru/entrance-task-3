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
        <Timebar changeDateT={this.props.changeDateM} dateNow={this.props.dateNow}/>
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
          <Floors />
        </div>
      </main>
    );
  }
}
export default MainContainer;
