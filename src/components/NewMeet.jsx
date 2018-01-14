import React from "react";
import "../assets/close.svg";
import "../styles/new-meet.scss";
import "../styles/new-meet-mobile.scss";
import { Switch, Route } from "react-router-dom";
import DelButtonInEdit from "./DelButtonInEdit";
import FooterInNew from "./FooterInNew";
import ModalEditMeet from "./ModalEditMeet";
import FooterInEdit from "./FooterInEdit";
import SelectRoomBlock from "./SelectRoomBlock";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { queue } from "async";
import MembersShow from "./MembersShow";

let timeEnd, timeStart;
let eventS;
const QWERY_All = gql`
  query {
    users {
      id
      login
      homeFloor
      avatarUrl
    }
    events {
      id
      title
      dateStart
      dateEnd
      users {
        id
        login
        homeFloor
        avatarUrl
      }
      room {
        id
      }
    }
    rooms {
      id
      title
      capacity
      floor
    }
  }
`;

class NewMeet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDisplay: false,
      selectUserLoad: true,
      yourRoomSwow: false,
      loadEditMeet: true,
      eventSelectedId: -1,
      eventSelected: {},
      themeInput: "",
      themeValid: false,
      dateInput: "",
      dateValid: true,
      startInput: "",
      startValid: false,
      endInput: "",
      endValid: false,
      membInput: "",
      usersInNewMeet: [],
      showError: false,
      roomSelectedId: -1,
      roomSelectedfloor: -1,
      indexRoom: -1,
      _month: 0,
      _dayNow: 0,
      _year: 2018
    };
    this.handleChange = this.handleChange.bind(this);
    this.getRecomendation = this.getRecomendation.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.sortR = this.sortR.bind(this);
    this.startEndValidation = this.startEndValidation.bind(this);
    this._showError = this._showError.bind(this);
    this.handleRoomClick = this.handleRoomClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.setDate = this.setDate.bind(this);
    this.handleSendChangeClick = this.handleSendChangeClick.bind(this);
    this.handleCloseClickMemb = this.handleCloseClickMemb.bind(this);
    this.handleClickDel = this.handleClickDel.bind(this);
  }
  handleClickDel() {
    this.setState({
      modalDisplay: !this.state.modalDisplay
    });
  }
  componentWillMount() {
    let dayNow = new Date().getDate();
    let month = new Date().getMonth();
    this.setState({
      _dayNow: dayNow,
      _month: month
    });
    if (month < 10) {
      month = `${0}${month + 1}`;
    } else {
      month = month + 1;
    }
    if (dayNow < 10) {
      dayNow = `${0}${dayNow}`;
    }
    let fullDate = `${dayNow}. ${month}. 2018`;
    this.setState({
      dateInput: fullDate
    });
    if (window.location.hash != "" && window.location.pathname === "/NewMeet") {
      let pos1 = window.location.hash.indexOf("|", 0);
      let pos2 = window.location.hash.indexOf("|", pos1 + 1);
      let id = window.location.hash.slice(1, pos1);
      let mob = window.location.hash.slice(pos1 + 1, pos2);
      let left = window.location.hash.slice(pos2 + 1);
      let hourStart;
      let hourEnd;
      let minutes;
      if (mob === "0") {
        left = left / 6.450204524325996 + 7.5;
        if (Math.floor(left) < 10) {
          hourStart = `0${Math.floor(left)}`;
        } else {
          hourStart = `${Math.floor(left)}`;
        }
        if (Math.floor(left + 1) < 10) {
          hourEnd = `0${Math.floor(left) + 1}`;
        } else {
          hourEnd = `${Math.floor(left) + 1}`;
        }
      } else {
        left = left / 67.2 + 7.2;
        if (Math.floor(left) < 10) {
          hourStart = `0${Math.floor(left)}`;
        } else {
          hourStart = `${Math.floor(left)}`;
        }
        if (Math.floor(left + 1) < 10) {
          hourEnd = `0${Math.floor(left) + 1}`;
        } else {
          hourEnd = `${Math.floor(left) + 1}`;
        }
      }
      minutes = Math.floor(left % 1 * 60);

      if (Number(hourStart) * 60 + Number(minutes) <= 7 * 60 + 30) {
        hourStart = "07";
        minutes = "30";
        hourEnd = "08";
      }
      if (Number(hourEnd) * 60 + Number(minutes) >= 23 * 60) {
        hourEnd = "23";
        minutes = "0";
        hourStart = "22";
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      this.setState({
        roomSelectedId: id,
        indexRoom: 0,
        startInput: `${hourStart}:${minutes}`,
        endInput: `${hourEnd}:${minutes}`,
        endValid: true,
        startValid: true
      });
    }
    if (
      window.location.hash != "" &&
      window.location.pathname === "/EditMeet"
    ) {
      let pos = window.location.hash.indexOf("|", 0);
      this.setState(
        {
          eventSelectedId: window.location.hash.slice(1, pos),
          loadEditMeet: false,
          roomSelectedId: window.location.hash.slice(pos + 1),
          indexRoom: 0,
          yourRoomSwow: true,
          selectUserLoad: false
        },
        () => {
          console.log(
            this.state.eventSelectedId,
            this.state.roomSelectedId,
            this.state.indexRoom
          );
        }
      );
    }

    window.addEventListener("load", this.handleLoad);
  }
  handleSendChangeClick() {
    if (this.state.loadEditMeet === false) {
      let title = eventS.title;
      this.setState(
        {
          loadEditMeet: true,
          themeInput: title,
          startInput: timeStart,
          endInput: timeEnd,
          themeValid: true,
          startValid: true,
          endValid: true,
          yourRoomSwow: false,
          usersInNewMeet: eventS.users
        },
        () => console.log(this.state)
      );
    }
  }
  handleCloseClick() {
    this.setState({
      roomSelectedId: -1,
      yourRoomSwow: false
    });
  }
  handleRoomClick(id, index) {
    this.setState({
      roomSelectedId: id,
      indexRoom: 0
    });
  }

  _showError() {
    if (
      this.state.dateValid === false ||
      this.state.endValid === false ||
      this.state.startValid === false ||
      this.state.themeValid === false ||
      this.state.usersInNewMeet.length === 0 ||
      this.state.roomSelectedId === -1
    ) {
      this.setState({
        showError: true
      });
      return false;
    } else {
      this.setState({
        showError: false
      });
      return true;
    }
  }
  handleCloseClickMemb(id) {
    if (this.state.selectUserLoad === false) {
      let users = eventS.users;
      let title = eventS.title;
      this.setState(
        {
          loadEditMeet: true,
          themeInput: title,
          startInput: timeStart,
          endInput: timeEnd,
          themeValid: true,
          startValid: true,
          endValid: true,
          selectUserLoad: true,
          usersInNewMeet: users
        },
        () => {
          let members = this.state.usersInNewMeet.filter(
            user => user.id !== id
          );
          if (members.length === 0) {
            this.setState({
              roomSelectedId: -1
            });
          }
          this.setState({
            usersInNewMeet: members
          });
        }
      );
    } else {
      let members = this.state.usersInNewMeet.filter(user => user.id !== id);
      if (members.length === 0) {
        this.setState({
          roomSelectedId: -1
        });
      }
      this.setState({
        usersInNewMeet: members
      });
    }
  }
  _handleKeyPress(event) {
    if (event.key === "Enter") {
      this.getUsers();
      this.setState({
        membInput: ""
      });
    }
  }

  startEndValidation(time) {
    let hours = time.slice(0, 2);
    let minutes = time.slice(3, 5);
    let min5 = minutes[1];
    if (
      hours !== "" &&
      minutes !== "" &&
      time[5] === undefined &&
      time[2] === ":"
    ) {
      hours = Number(hours);
      minutes = Number(minutes);
      if (
        ((hours === 7 && (29 < minutes && minutes < 60)) ||
          (7 < hours && hours <= 22 && (0 <= minutes && minutes <= 59))) &&
        min5 != undefined
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  handleChange(event) {
    let inpVal = event.target.value;
    let id = event.target.id;
    if (this.state.loadEditMeet === false) {
      let title = eventS.title;
      this.setState({
        loadEditMeet: true,
        themeInput: title,
        startInput: timeStart,
        endInput: timeEnd,
        themeValid: true,
        startValid: true,
        endValid: true,
        usersInNewMeet: eventS.users
      });
    }
    switch (id) {
      case "themeInput":
        {
          this.setState(
            {
              themeInput: inpVal
            },
            () => {
              if (this.state.themeInput === "") {
                this.setState({
                  themeValid: false
                });
              } else {
                this.setState({
                  themeValid: true
                });
              }
            }
          );
        }
        break;
      case "startInput":
        {
          if (this.state.yourRoomSwow === true) {
            this.setState({
              yourRoomSwow: false
            });
          }
          this.setState(
            {
              startInput: inpVal
            },
            () => {
              if (this.startEndValidation(this.state.startInput)) {
                this.setState({
                  startValid: true,
                  roomSelectedId: -1
                });
              } else {
                this.setState({
                  startValid: false,
                  roomSelectedId: -1
                });
              }
              this.setState({
                endInput: "",
                endValid: false,
                roomSelectedId: -1
              });
            }
          );
        }
        break;
      case "endInput":
        {
          this.setState(
            {
              endInput: inpVal
            },
            () => {
              if (this.startEndValidation(this.state.endInput)) {
                let start =
                  Number(this.state.startInput.slice(0, 2)) * 60 +
                  Number(this.state.startInput.slice(3, 5));
                let end =
                  Number(this.state.endInput.slice(0, 2)) * 60 +
                  Number(this.state.endInput.slice(3, 5));
                if (end > start) {
                  this.setState({
                    endValid: true,
                    roomSelectedId: -1
                  });
                }
              } else {
                this.setState({
                  endValid: false,
                  roomSelectedId: -1
                });
              }
            }
          );
        }
        break;
      case "membInput":
        {
          if (this.state.selectUserLoad === false) {
            console.log(eventS);
            let users = eventS.users;
            console.log(users);
            this.setState(
              {
                selectUserLoad: true,
                usersInNewMeet: users
              },
              () => console.log(this.state.usersInNewMeet)
            );
          }
          this.setState({
            membInput: inpVal
          });
        }
        break;
    }
  }

  getUsers() {
    for (let i = 0; i < this.props.data.users.length; i++) {
      if (this.state.membInput === this.props.data.users[i].login) {
        this.setState({
          usersInNewMeet: [
            ...this.state.usersInNewMeet,
            this.props.data.users[i]
          ]
        });
      }
      console.log(
        this.state.membInput,
        this.state.usersInNewMeet,
        this.props.data.users[i].login
      );
    }
  }
  sortR(a, b) {
    let sumA = 0;
    let sumB = 0;
    for (let i = 0; i < this.state.usersInNewMeet.length; i++) {
      sumA += Math.abs(a.floor - this.state.usersInNewMeet[i].homeFloor);
      sumB += Math.abs(b.floor - this.state.usersInNewMeet[i].homeFloor);
    }
    if (sumA > sumB) return 1;
    if (sumA < sumB) return -1;
  }
  setDate() {
    let start = new Date();
    let end = new Date();
    let hourStart = Number(this.state.startInput.slice(0, 2));
    let minutesStart = Number(this.state.startInput.slice(3, 5));
    let hourEnd = Number(this.state.endInput.slice(0, 2));
    let minutesEnd = Number(this.state.endInput.slice(3, 5));
    start.setFullYear(this.state._year);
    start.setMonth(this.state._month);
    start.setDate(this.state._dayNow);
    end.setFullYear(this.state._year);
    end.setMonth(this.state._month);
    end.setDate(this.state._dayNow);
    start.setHours(hourStart);
    start.setMinutes(minutesStart);
    end.setHours(hourEnd);
    end.setMinutes(minutesEnd);
    return [start, end];
  }

  getRecomendation(rooms, nonval) {
    let [start, end] = this.setDate();
    let capacityprop = this.state.usersInNewMeet.length;
    if (nonval === false) {
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].capacity < capacityprop) {
          rooms.splice(i, 1);
        }
        for (let j = 0; j < this.props.data.events.length; j++) {
          if (
            (Date.parse(this.props.data.events[j].dateStart) <=
              start.getTime() &&
              Date.parse(this.props.data.events[j].dateEnd) >=
                start.getTime() &&
              this.props.data.events[j].room.id === rooms[i].id) ||
            (end.getTime() >= Date.parse(this.props.data.events[j].dateStart) &&
              Date.parse(this.props.data.events[j].dateEnd) >= end.getTime() &&
              this.props.data.events[j].room.id === rooms[i].id)
          ) {
            rooms.splice(i, 1);
          }
        }
      }
      rooms.sort(this.sortR);
    }
    rooms.start = `${this.state.startInput}`;
    rooms.end = `${this.state.endInput}`;
    return rooms;
  }

  render() {
    let start, end;
    let path = window.location.pathname;
    let rooms = [];

    if (!this.props.data.loading) {
      if (
        this.state.dateValid === true &&
        this.state.endValid === true &&
        this.state.startValid &&
        this.state.themeInput != "" &&
        this.state.usersInNewMeet.length != 0 &&
        this.state.roomSelectedId === -1
      ) {
        rooms = this.getRecomendation(
          this.props.data.rooms.slice(0, this.props.data.rooms.length),
          false
        );
        [start, end] = this.setDate();
      } else {
        if (window.location.pathname === "/NewMeet") {
          if (this.state.roomSelectedId !== -1) {
            for (let i = 0; i < this.props.data.rooms.length; i++) {
              if (this.props.data.rooms[i].id === this.state.roomSelectedId) {
                rooms = this.getRecomendation(
                  this.props.data.rooms.slice(i, i + 1),
                  false
                );
                console.log(rooms);
              }
            }
            [start, end] = this.setDate();
          }
        }
      }

      if (
        window.location.pathname === "/EditMeet" &&
        window.location.hash != ""
      ) {
        for (let i = 0; i < this.props.data.events.length; i++) {
          if (this.props.data.events[i].id === this.state.eventSelectedId) {
            eventS = this.props.data.events[i];
          }
        }
        if (this.state.roomSelectedId !== -1) {
          for (let i = 0; i < this.props.data.rooms.length; i++) {
            if (this.props.data.rooms[i].id === this.state.roomSelectedId) {
              rooms = this.getRecomendation(
                this.props.data.rooms.slice(i, i + 1),
                true
              );
            }
          }
          [start, end] = this.setDate();
        }

        let hoursStart = new Date(Date.parse(eventS.dateStart)).getHours();
        let minutesStart = new Date(Date.parse(eventS.dateStart)).getMinutes();
        if (hoursStart < 10) {
          hoursStart = `0${hoursStart}`;
        }
        if (minutesStart < 10) {
          minutesStart = `0${minutesStart}`;
        }

        let hoursEnd = new Date(Date.parse(eventS.dateEnd)).getHours();
        let minutesEnd = new Date(Date.parse(eventS.dateEnd)).getMinutes();
        if (hoursEnd < 10) {
          hoursEnd = `0${hoursEnd}`;
        }
        if (minutesEnd < 10) {
          minutesEnd = `0${minutesStart}`;
        }
        timeStart = `${hoursStart}:${minutesStart}`;
        timeEnd = `${hoursEnd}:${minutesEnd}`;

        if (this.state.startInput === "" && this.state.endInput === "") {
          rooms.start = timeStart;
          rooms.end = timeEnd;
        }
      }

      return (
        <div className="body-new-meet">
          <ModalEditMeet
            clickDel={this.handleClickDel}
            display={this.state.modalDisplay}
            eventId={this.state.eventSelectedId}
          />
          <main
            className={
              this.props.location.pathname === `/NewMeet`
                ? `main-new-meet`
                : `main-new-meet main-edit-meet`
            }
          >
            <div className="main_background">
              <div className="nmeet-container">
                <div className="title-line">
                  {this.props.location.pathname === `/NewMeet`
                    ? <div className="title-line_title">Новая встреча</div>
                    : <div className="title-line_title">
                        Редактирование встречи
                      </div>}
                  <a href="/" className="title-line_exit-button">
                    <img src="assets/close.svg" alt="" />
                  </a>
                </div>
                <div className="theme-line ">
                  <div
                    className={
                      this.state.themeValid === true ||
                      (this.state.themeInput === "" &&
                        this.state.showError === false)
                        ? `theme`
                        : `theme input_valid_err`
                    }
                  >
                    <div className="theme_title">Тема</div>
                    <input
                      className="theme_input"
                      id="themeInput"
                      value={
                        this.state.loadEditMeet === true
                          ? this.state.themeInput
                          : eventS.title
                      }
                      onChange={this.handleChange}
                      placeholder="О чём будете говорить?"
                      type="text"
                    />
                    <div className="input_error">
                      Поле не должно быть пустым
                    </div>
                  </div>
                  <div className="time">
                    <div
                      className={
                        this.state.dateValid === true ||
                        (this.state.dateInput === "" &&
                          this.state.showError === false)
                          ? `date`
                          : `date input_valid_err`
                      }
                    >
                      <div className="theme_title">Дата</div>
                      <input
                        className="date_input"
                        id="dateInput"
                        value={this.state.dateInput}
                        onChange={this.handleChange}
                        type="text"
                      />
                      <div className="input_error">
                        Формат даты (dd.mm.yyyy)
                      </div>
                    </div>
                    <div className="start-end">
                      <div
                        className={
                          this.state.startValid === true ||
                          (this.state.startInput === "" &&
                            this.state.showError === false)
                            ? `start-block`
                            : `start-block input_valid_err`
                        }
                      >
                        <div className="theme_title">Начало</div>
                        <input
                          className="start-block_input"
                          id="startInput"
                          value={
                            this.state.loadEditMeet === true
                              ? this.state.startInput
                              : timeStart
                          }
                          onChange={this.handleChange}
                          type="text"
                        />
                        <div className="input_error">
                          Формат времени (hh:mm)
                        </div>
                      </div>
                      <div className="start-end_separator">
                        <span>-</span>
                      </div>
                      <div
                        className={
                          this.state.endValid === true ||
                          (this.state.endInput === "" &&
                            this.state.showError === false)
                            ? `end-block`
                            : `end-block input_valid_err`
                        }
                      >
                        <div className="theme_title">Конец</div>
                        <input
                          className="start-block_input"
                          id="endInput"
                          onChange={this.handleChange}
                          value={
                            this.state.loadEditMeet === true
                              ? this.state.endInput
                              : timeEnd
                          }
                          type="text"
                        />
                        <div className="input_error">
                          Формат времени (hh:mm)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nmeet-container">
              <div className="members-line">
                <div className="nmeet-container">
                  <div className="members">
                    {console.log(this.state.usersInNewMeet)}
                    <div
                      className={
                        this.state.usersInNewMeet.length !== 0 ||
                        (this.state.membInput === "" &&
                          this.state.showError === false)
                          ? `members_input-block`
                          : `members_input-block input_valid_err`
                      }
                    >
                      <div className="theme_title">Участники</div>
                      <input
                        id="membInput"
                        onKeyPress={this._handleKeyPress}
                        value={this.state.membInput}
                        onChange={this.handleChange}
                        className="members_input awesomplete"
                        type="text"
                      />
                      <div className="input_error">
                        Cписок не должен быть пуст
                      </div>
                    </div>
                    <div className="members-show">
                      {this.state.selectUserLoad === true
                        ? this.state.usersInNewMeet.map((user, index) =>
                            <MembersShow
                              avatarUrl={user.avatarUrl}
                              closeClick={this.handleCloseClickMemb}
                              login={user.login}
                              id={user.id}
                              key={user.id}
                            />
                          )
                        : eventS.users.map((user, index) =>
                            <MembersShow
                              avatarUrl={user.avatarUrl}
                              closeClick={this.handleCloseClickMemb}
                              login={user.login}
                              id={user.id}
                              key={user.id}
                            />
                          )}
                    </div>
                  </div>
                </div>
                <div className="members-line_line" />
                <div className="nmeet-container">
                  <div className="select-room">
                    <div className="theme_title" onClick={this._showError}>
                      {this.state.yourRoomSwow === false
                        ? "Рекомендованные переговорки"
                        : "Ваша переговорка"}
                    </div>
                    {console.log(this.state.indexRoom, rooms)}
                    {this.state.roomSelectedId === -1
                      ? rooms.map((room, index) =>
                          <SelectRoomBlock
                            closeClick={this.handleCloseClick}
                            indexRoom={index}
                            selectId={this.state.roomSelectedId}
                            key={room.id}
                            id={room.id}
                            RoomClick={this.handleRoomClick}
                            title={room.title}
                            floor={room.floor}
                            end={rooms.end}
                            start={rooms.start}
                          />
                        )
                      : rooms.length !== 0
                        ? <SelectRoomBlock
                            closeClick={this.handleCloseClick}
                            selectId={this.state.roomSelectedId}
                            key={rooms[this.state.indexRoom].id}
                            id={rooms[this.state.indexRoom].id}
                            RoomClick={null}
                            title={rooms[this.state.indexRoom].title}
                            floor={rooms[this.state.indexRoom].floor}
                            end={rooms.end}
                            start={rooms.start}
                          />
                        : <div>В это время выбранная переговорка занята(</div>}
                  </div>
                </div>
              </div>
            </div>
            <Route
              path="/EditMeet"
              render={() => <DelButtonInEdit clickDel={this.handleClickDel} />}
            />
          </main>
          <Switch>
            <Route
              path="/NewMeet"
              render={() =>
                <FooterInNew
                  roomSelectedId={this.state.roomSelectedId}
                  _showErrorFun={this._showError}
                  themeInput={this.state.themeInput}
                  start={start}
                  end={end}
                  usersInNewMeet={this.state.usersInNewMeet}
                  startStr={rooms.start}
                  endStr={rooms.end}
                />}
            />
            <Route
              path="/EditMeet"
              render={() =>
                <FooterInEdit
                  clickDel={this.handleClickDel}
                  roomSelectedId={this.state.roomSelectedId}
                  _showErrorFun={this._showError}
                  themeInput={this.state.themeInput}
                  start={start}
                  end={end}
                  usersInNewMeet={this.state.usersInNewMeet}
                  eventId={this.state.eventSelectedId}
                  sendChangeClick={this.handleSendChangeClick}
                  startStr={rooms.start}
                  endStr={rooms.end}
                />}
            />
          </Switch>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default graphql(QWERY_All)(NewMeet);
