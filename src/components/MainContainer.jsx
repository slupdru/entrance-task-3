import React from "react";
import Floors from "./Floors";
import Timebar from "./Timebar";
class MainContainer extends React.Component {
  componentWillMount() {}
  render() {
    return (
      <main>
        <Timebar />
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
