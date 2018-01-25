import React from "react";
import ModalInCell from "./ModalInCell";
class MeetBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      clicked: !this.state.clicked
    });
  }
  render() {
    let colorMeet;
    this.state.clicked === false ? (colorMeet = "") : (colorMeet = "#99A9B9");
    const HOUR = 1000 * 60 * 60;
    let leftInPr;
    let widthInPr;
    if(document.documentElement.clientWidth > 850){
     leftInPr =//считаем  значение left для встречи в процентах, исходя из времени начала встречи
      (this.props.start.getHours() +
        this.props.start.getMinutes() / 60 +
        this.props.start.getSeconds() / (60 * 60) -
        7.5) *
      6.4;
    widthInPr =//считаеи значение width для встречи в процентах, исходя из разности начала и конца встречи
      (this.props.end.getTime() - this.props.start.getTime()) / HOUR * 6.4;
    }
    else{
      leftInPr =//считаем  значение left для встречи в процентах, исходя из времени начала встречи
      (this.props.start.getHours() +
        this.props.start.getMinutes() / 60 +
        this.props.start.getSeconds() / (60 * 60) -
        7.2) *
      6.25;
     widthInPr =//считаеи значение width для встречи в процентах, исходя из разности начала и конца встречи
      (this.props.end.getTime() - this.props.start.getTime()) / HOUR * 6.3;
    }
    let meetBlockStyle = {
      left: `${leftInPr}%`,
      width: `${widthInPr}%`,
      background: colorMeet
    };

    return (
      <div
        style={meetBlockStyle}
        onClick={this.handleClick}
        onMouseOver={this.handleOver}
        className="meet-dark-block"
      >
        <ModalInCell //тултип для стречи
          roomId={this.props.roomId}
          idEvent={this.props.idEvent}
          nameRoom={this.props.nameRoom}
          start={this.props.start}
          end={this.props.end}
          title={this.props.title}
          logInFirst={this.props.logInFirst}
          FirstIcon={this.props.FirstIcon}
          countOfUsers={this.props.countOfUsers}
          displayN={this.state.clicked === false ? false : true}
        />
      </div>
    );
  }
}
export default MeetBlock;
