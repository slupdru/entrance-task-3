import React, { Component } from "react";
import "./styles/styles.scss";
import "./styles/style-mobile.scss";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import NewMeet from "./components/NewMeet";
import ModalNewMeet from "./components/ModalNewMeet";
const minute = 1000 * 60;

class App extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    dateNow: new Date()
  }
  this.handleChandeDate = this.handleChandeDate.bind(this);
  this.tick = this.tick.bind(this);
  this.handleChangeDateInCalendar= this.handleChangeDateInCalendar.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, minute);
  }

  tick() {
    let NewDate = new Date(this.state.dateNow.getTime() + minute);
    this.setState({
      dateNow: NewDate
    },()=>console.log(this.state.dateNow) );
  }

  handleChandeDate(type, side){
    if (type === 'arrow'){
      const DAY = 1000*60*60*24;
      side==='right'?
      this.setState({
        dateNow:new Date(this.state.dateNow.getTime()+DAY)
      },()=>console.log(this.state.dateNow))
      :
      this.setState({
        dateNow:new Date(this.state.dateNow.getTime()-DAY)
      },()=>console.log(this.state.dateNow))
    }
  }
  handleChangeDateInCalendar(dateCalParm){
    let newDate = this.state.dateNow;
    newDate.setDate(dateCalParm.date());
    newDate.setMonth(dateCalParm.month());
    newDate.setFullYear(dateCalParm.year());
    this.setState({
      dateNow:newDate
    }, ()=>{console.log(this.state.dateNow)})
  }
  render(){
  return (
    <div>
      <ModalNewMeet />
      <Header changeDateCalendarM={this.handleChangeDateInCalendar} changeDateM={this.handleChandeDate} dateNow={this.state.dateNow}/>
      <Switch>
        <Route exact path="/" render={()=><MainContainer changeDateCalendarM={this.handleChangeDateInCalendar} changeDateM={this.handleChandeDate} dateNow={this.state.dateNow}/>} />
        <Route path="/NewMeet" render={()=><NewMeet/>} /> 
        <Route path="/EditMeet" component={NewMeet} />
      </Switch>
    </div>
  )
}
}
export default App;
