import React from "react";
import "../assets/edit.svg";
function ModalInCell(props) {
  let dayNow = props.start.getDate();
  let month = props.start.getMonth();
  
  let timeMeet = `${props.start.getHours()}:${props.start.getMinutes() < 10
    ? `0${props.start.getMinutes()}`
    : `${props.start.getMinutes()}`} — ${props.end.getHours()}:${props.end.getMinutes() <
  10
    ? `0${props.end.getMinutes()}`
    : `${props.end.getMinutes()}`}`;
  let datemass = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ];
  month = datemass[month];
  let meetBlockStyle;
  props.displayN === false
    ? (meetBlockStyle = { display: "none" })
    : (meetBlockStyle = { display: "block" });
  return (
    <div style={meetBlockStyle} className="modal-in-cell">
      <div className="modal-in-cell_closeicon">
        <a
          href={`/EditMeet#${props.idEvent}|${props.roomId}`}
          className="link"
          src="edit-meet.html"
        >
          <img className="link" src="assets/edit.svg" alt="" />
        </a>
      </div>
      <div className="modal-in-cell_container">
        <div className="modal-in-cell_title">
          {props.title}
        </div>
        <div className="modal-in-cell_subtitle">{`${dayNow} ${month},  ${timeMeet}  ·  ${props.nameRoom}`}</div>
        <div className="modal-in-cell_users">
          <img src={props.FirstIcon} className="modal-in-cell_ava" alt="" />
          <span>
            {props.logInFirst}
          </span>
          <span>{`и ${props.countOfUsers - 1} участников`}</span>
        </div>
      </div>
    </div>
  );
}
export default ModalInCell;
