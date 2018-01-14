import React from "react";
import "../assets/close.svg";

class SelectRoomBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let selectedRoomStyle = {
      background: "rgb(0, 125, 255)",
      color: "rgb(255, 255, 255)"
    };
    return (
      <div
        onClick={
          this.props.RoomClick !== null
            ? () => this.props.RoomClick(this.props.id, this.props.indexRoom)
            : () => {}
        }
        style={this.props.selectId === -1 ? {} : selectedRoomStyle}
        className="select-room_roomblock"
      >
        <div className="select-room_container">
          <span className="select-room_time">{`${this.props.start} — ${this
            .props.end}`}</span>
          <span className="select-room_room">{`${this.props.title} · ${this
            .props.floor} этаж`}</span>
        </div>
        <img
          onClick={() => this.props.closeClick()}
          style={this.props.selectId === -1 ? {} : { display: "block" }}
          className="selct-room_icon"
          src="assets/close.svg"
          alt=""
        />
      </div>
    );
  }
}
export default SelectRoomBlock;
