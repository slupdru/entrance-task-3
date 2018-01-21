//Компонент страниц добавления и редактирования новой встречи, получилось немного страшно, по неопытности реализовывал интуитивно 
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
import DatePickerMY from "./DatePickerMY";
import AutoCompleteMY from "./AutoCompleteMY";


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
      modalDisplay: false,//показать модальное окно
      selectUserLoad: true,//передали данные о добавленных пользователях в state на странице редактирования
      yourRoomSwow: false,//показать "редактирование встречи" или "ваша комната"
      loadEditMeet: true,//передали остальные данные в state на странице редактирования
      eventSelectedId: -1,//id выбранного события
      eventSelected: {},//выюранное событие
      themeInput: "",//value выбора темы обсуждения
      themeValid: false,//правильность ввода темы
      dateValid: true,// правильность выбора даты
      startInput: "",// value выбора начала встречи
      startValid: false,//правильность ввода времени начала
      endInput: "",//value времени окончания события
      endValid: false,//правильность ввода окончания события
      usersInNewMeet: [],//участники встречи
      showError: false,//показать ошибки
      roomSelectedId: -1,//id выбранной комнаты 
      roomSelectedfloor: -1,//этаж выбранной комнаты
      indexRoom: -1,//index в массиве, выбранной комнаты
      _month: new Date().getMonth(),//текущий месяц
      _dayNow: new Date().getDate(),//текущий день
      _year: new Date().getFullYear(),//текущий год
      dateNow:-1
    };
    this._getMembUsers = this._getMembUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRecomendation = this.getRecomendation.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.sortR = this.sortR.bind(this);
    this.startEndValidation = this.startEndValidation.bind(this);
    this._showError = this._showError.bind(this);
    this.handleRoomClick = this.handleRoomClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.setDate = this.setDate.bind(this);
    this.handleCloseClickMemb = this.handleCloseClickMemb.bind(this);
    this.handleClickDel = this.handleClickDel.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }
  handleClickDel() {//нажатие кнопки "удалить встречу"
    this.setState({
      modalDisplay: !this.state.modalDisplay
    });
  }
  componentWillMount() {
    if (window.location.hash != "" && window.location.pathname === "/NewMeet") {//парсим хэш при создании новой встречи
      let pos1 = window.location.hash.indexOf("|", 0);
      let pos2 = window.location.hash.indexOf("|", pos1 + 1);
      let pos3 = window.location.hash.indexOf("|", pos2 + 2);
      let id = window.location.hash.slice(1, pos1);
      let mob = window.location.hash.slice(pos1 + 1, pos2);
      let left = window.location.hash.slice(pos2 + 1, pos3);
       let dateSlice = window.location.hash.slice(pos3 + 1);
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
      let dateNOW = new Date(Date.parse(decodeURI(dateSlice)));
      let dayNow = dateNOW.getDate();
      let month = dateNOW.getMonth();
      let year = dateNOW.getFullYear();
      console.log(dayNow, month, year);
      this.setState({
        roomSelectedId: id,
        indexRoom: 0,
        startInput: `${hourStart}:${minutes}`,
        endInput: `${hourEnd}:${minutes}`,
        endValid: true,
        startValid: true,
        _dayNow: dayNow,
        _month: month,
        _year:year,
        dateNow:dateNOW
      });
    }



    if (
      window.location.hash != "" &&//парсим хэш при редактировании встречи
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
        }
      );
    }

    
  }
  handleChangeDate(mom){
    if (this.state.loadEditMeet === false) {
      let title = eventS.title;
      this.setState(
        {
          selectUserLoad:true,
          loadEditMeet: true,
          themeInput: title,
          startInput: timeStart,
          endInput: timeEnd,
          themeValid: true,
          startValid: true,
          endValid: true,
          yourRoomSwow: false,
          usersInNewMeet: eventS.users
        }
      ), ()=>this.setState({
        _month:mom.month(),
        _dayNow:mom.date(),
        _year:mom.year()
      }, ()=>console.log(this.state._dayNow));
    }
    else{
    this.setState({
      _month:mom.month(),
      _dayNow:mom.date(),
      _year:mom.year()
    }, ()=>console.log(this.state._dayNow))
  }
  }
  handleCloseClick() {//отменить выбор комнаты
    this.setState({
      roomSelectedId: -1,
      yourRoomSwow: false
    });
  }
  handleRoomClick(id, index) {//выбор комнаты
    this.setState({
      roomSelectedId: id,
      indexRoom: 0
    });
  }

  _showError() {//показать ошибки ввода
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
  handleCloseClickMemb(id) {//удалить пользователя
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
  _handleKeyPress(event) {//добавление пользователя по нажатию enter
    if (event.key === "Enter") {
      this.getUsers();
      this.setState({
        membInput: ""
      });
    }
  }

  startEndValidation(time) {//проверка правильности ввода значений начала встречи и конца
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

  handleChange(event) {//изменение значения inputов
    let inpVal = event.target.value;
    let id = event.target.id;
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

      case "dateInput":
      {
        this.setState(
          {
            dateInput: inpVal
          },
          ()=>{
            let hours = this.state.dateInput.slice(0, 2);
            let minutes = this.state.dateInput.slice(3, 5);
          }
        )
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
    }
  }

  _getMembUsers(value){
    for (let i = 0; i < this.props.data.users.length; i++) {
      if (value === this.props.data.users[i].login) {
        this.setState({
          usersInNewMeet: [
            ...this.state.usersInNewMeet,
            this.props.data.users[i]
          ]
        }, console.log(this.state.usersInNewMeet));
      }
    }
  }
  sortR(a, b) {//сортировка переговорок по количеству пройденных этажей
    let sumA = 0;
    let sumB = 0;
    for (let i = 0; i < this.state.usersInNewMeet.length; i++) {
      sumA += Math.abs(a.floor - this.state.usersInNewMeet[i].homeFloor);
      sumB += Math.abs(b.floor - this.state.usersInNewMeet[i].homeFloor);
    }
    if (sumA > sumB) return 1;
    if (sumA < sumB) return -1;
  }
  setDate() {//получение даты из строки
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

  getRecomendation(rooms, nonval) {//рекомендованные встречи
    let [start, end] = this.setDate();
    let capacityprop = this.state.usersInNewMeet.length;
    if (nonval === false) {
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].capacity < capacityprop) {
          rooms.splice(i, 1);
        }
        for (let j = 0; j < this.props.data.events.length; j++) {
          if ((rooms[i]!==undefined)&&
            ((Date.parse(this.props.data.events[j].dateStart) <=
              start.getTime() &&
              Date.parse(this.props.data.events[j].dateEnd) >=
                start.getTime() &&
              this.props.data.events[j].room.id === rooms[i].id) ||
            (end.getTime() >= Date.parse(this.props.data.events[j].dateStart) &&
              Date.parse(this.props.data.events[j].dateEnd) >= end.getTime() 
              &&
              this.props.data.events[j].room.id === rooms[i].id)
          )) {
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
    let value = 'тест';
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
            console.log(eventS);
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
          minutesEnd = `0${minutesEnd}`;
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
              window.location.pathname === "/NewMeet"
                ? `main-new-meet`
                : `main-new-meet main-edit-meet`
            }
          >
            <div className="main_background">
              <div className="nmeet-container">
                <div className="title-line">
                  {window.location.pathname === "/NewMeet"
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
                      className="date"
                      // {
                      //   this.state.dateValid === true ||
                      //   (this.state.dateInput === "" &&
                      //     this.state.showError === false)
                      //     ? `date`
                      //     : `date input_valid_err`
                      // }
                    >
                      <div className="theme_title">Дата</div>
                      {/* <input
                        className="date_input"
                        id="dateInput"
                        value={this.state.dateInput}
                        onChange={this.handleChange}
                        type="text"
                      /> */}
                      <DatePickerMY dateNow={this.state.dateNow} dateStart={eventS!==undefined?eventS.dateStart:undefined}  changeDate={this.handleChangeDate}/>
                      {/* <div className="input_error">
                        Формат даты (dd.mm.yyyy)
                      </div> */}
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
                    <div
                      className={
                        (this.state.usersInNewMeet.length === 0 && this.state.showError === true)
                          ? `members_input-block input_valid_err`
                          : `members_input-block `
                      }
                    >
                      <div className="theme_title">Участники</div>


                    <AutoCompleteMY addUser={this._getMembUsers} list={this.props.data.users}/>

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
            {console.log(this.state.themeInput)}
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
