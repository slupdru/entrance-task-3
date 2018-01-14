import React from "react";
import "../assets/emoji2.png";
class ModalNewMeet extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  render() {
    if (window.location.hash !== "" && window.location.pathname === "/") {
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
      let pos1 = window.location.hash.indexOf("|", 0);
      let pos2 = window.location.hash.indexOf("|", pos1 + 1);
      let pos3 = window.location.hash.indexOf("|", pos2 + 1);
      let pos4 = window.location.hash.indexOf("|", pos3 + 1);
      let month = datemass[window.location.hash.slice(1, pos1)];
      let date = window.location.hash.slice(pos1 + 1, pos2);
      let startStr = window.location.hash.slice(pos2 + 1, pos3);
      let startEnd = window.location.hash.slice(pos3 + 1, pos4);
      let themeInp = window.location.hash.slice(pos4 + 1);
      return (
        <div className="modal-new-meet">
          <div className="modal-new-meet_panel">
            <div className="modal-new-meet_container">
              <img
                className="modal-new-meet_icon"
                src="../assets/emoji2.png"
                alt=""
              />
              <div className="modal-new-meet_title">Встреча создана!</div>
              <div className="modal-new-meet_subtitle">{`${date} ${month}, ${startStr} — ${startEnd}`}</div>
              <div className="modal-new-meet_floor">{`${decodeURI(
                themeInp
              )}`}</div>
              <a className="modal-new-meet_button" href="/">
                Хорошо
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
export default ModalNewMeet;
