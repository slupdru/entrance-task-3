import React from "react";
import MeetBlock from "./MeetBlock";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

let main;
class FloorRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftA: 0,
      mob: false,
      hovered: false,
      scrollLeft: 0
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleOutHover = this.handleOutHover.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    main = document.getElementsByTagName("main")[0];
    main.addEventListener("scroll", this.handleScroll);
  }
  handleScroll(event) {// изменяем скрол для названий переговорок на мобилных устройствах
    let scrollLeft = main.scrollLeft;
    this.setState({
      scrollLeft: scrollLeft
    });
  }
  handleOutHover(event) {// подсвечиваем названия переговорок по наведении на строку 
    this.setState({
      hovered: false
    });
  }
  handleHover(event) {
    this.setState({
      hovered: true
    });
  }

  handleMouseMove(event) {//изменяем положение синей кнопки по движению мыши
    if (document.documentElement.clientWidth > 850) {
      if (!event.target.classList.contains("meet-dark-block")) {
        let newVal =
          event.pageX - 260 - document.documentElement.clientWidth / 70;
        if (newVal > 0) {
          this.setState({
            leftA: newVal,
            mob: false
          });
        }
      } else {
        this.setState({
          leftA: -1000
        });
      }
    } else {
      if (!event.target.classList.contains("meet-dark-block")) {
        let widthMain = document.getElementsByTagName("main")[0].scrollLeft;
        let newVal = event.clientX - 210 + widthMain;
        if (newVal > 0) {
          this.setState({
            leftA: newVal,
            mob: true
          });
        }
      } else {
        this.setState({
          leftA: -1000
        });
      }
    }
  }
  render() {
    let mob = 0;
    let width;
    let hash;
    if (this.state.mob === false) {
      width = document.getElementById("main_cont").clientWidth - 260;
      hash = `/NewMeet#${this.props.id}|${mob}|${this.state.leftA /
        width *
        100}`;
    } else {
      mob = 1;
      hash = `/NewMeet#${this.props.id}|${mob}|${this.state.leftA}`;
    }

    if (this.props.events[0] === undefined) {
      return (
        <div
          className={`floor_row ${this.props.completed === true
            ? "floor_row_completed"
            : ""}`}
        >
          <div className="room">
            <div
              className="room_title"
              style={
                this.state.hovered === true
                  ? { color: "#0070E0", fontWeight: "700" }
                  : {}
              }
            >
              {this.props.roomTitle}
            </div>
            <div className="room_subtitile">{`до ${this.props
              .roomSubtitile} человек`}</div>
          </div>
          <div
            onMouseMove={this.handleMouseMove}
            className="floor_row floor_row-tablet"
          >
            <div
              className="floor_mobile-title"
              style={
                this.state.scrollLeft > 160
                  ? this.state.hovered === true
                    ? {
                        color: "#0070E0",
                        fontWeight: "700",
                        display: "block",
                        left: `${this.state.scrollLeft - 160}px`
                      }
                    : {
                        display: "block",
                        left: `${this.state.scrollLeft - 160}px`
                      }
                  : {}
              }
            >
              {this.props.roomTitle}
            </div>
            <div className="table-container-hour">
              <a
                onMouseOver={this.handleHover}
                onMouseOut={this.handleOutHover}
                style={{ left: `${this.state.leftA}px` }}
                href={hash}
                onClick={this.onClickButt}
                className="floor_button floor_button_button-line1"
              >
                <span>+</span>
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`floor_row ${this.props.completed === true
            ? "floor_row_completed"
            : ""}`}
        >
          <div className="room">
            <div
              className="room_title"
              style={
                this.state.hovered === true
                  ? { color: "#0070E0", fontWeight: "700" }
                  : {}
              }
            >
              {this.props.roomTitle}
            </div>
            <div className="room_subtitile">{`до ${this.props
              .roomSubtitile} человек`}</div>
          </div>
          <div
            onMouseMove={this.handleMouseMove}
            className="floor_row floor_row-tablet"
          >
            <div
              className="floor_mobile-title"
              style={
                this.state.scrollLeft > 160
                  ? this.state.hovered === true
                    ? {
                        color: "#0070E0",
                        fontWeight: "700",
                        display: "block",
                        left: `${this.state.scrollLeft - 160}px`
                      }
                    : {
                        display: "block",
                        left: `${this.state.scrollLeft - 160}px`
                      }
                  : {}
              }
            >
              {this.props.roomTitle}
            </div>
            <div className="table-container-hour">
              <a
                onMouseOver={this.handleHover}
                onMouseOut={this.handleOutHover}
                style={{ left: `${this.state.leftA}px` }}
                href={hash}
                className="floor_button floor_button_button-line1"
              >
                <span>+</span>
              </a>
              {this.props.events.map(event =>
                <MeetBlock
                  roomId={this.props.id}
                  key={event.id}
                  title={event.title}
                  idEvent={event.id}
                  logInFirst={event.users[0].login}
                  FirstIcon={event.users[0].avatarUrl}
                  countOfUsers={event.users.length}
                  start={new Date(Date.parse(event.dateStart))}
                  nameRoom={this.props.roomTitle}
                  end={new Date(Date.parse(event.dateEnd))}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default FloorRow;
