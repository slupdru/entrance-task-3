import React from 'react';
import '../assets/close.svg';
import '../styles/new-meet.scss'
import '../styles/new-meet-mobile.scss'
import { Switch, Route } from 'react-router-dom'
import DelButtonInEdit from './DelButtonInEdit'
import FooterInNew from './FooterInNew'
import FooterInEdit from './FooterInEdit'
import SelectRoomBlock from './SelectRoomBlock';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { queue } from 'async';


const QWERY_All =  gql`query{
    users{
        id
        login
        homeFloor
        avatarUrl
      }
      events{
        id
        title
        dateStart
        dateEnd
        users {
          id
        }
        room {
          id
        }
      }
      rooms{
        id
        title
        capacity
        floor
      }
  }`;


class NewMeet extends React.Component{
    constructor(props){
        super(props);
    this.state ={
        themeInput:'',
        dateInput:' 7 января, 2018',
        dateValid:false,
        startInput:'',
        startValid:false,
        endInput:'',
        endValid:false,
        membInput:'',
        usersInNewMeet:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.getRecomendation = this.getRecomendation.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this._handleKeyPress=this._handleKeyPress.bind(this);
    this.sortR=this.sortR.bind(this);
    this.startEndValidation=this.startEndValidation.bind(this);
}
    componentWillMount(){
    let dayNow = new Date().getDate();
    let month = new Date().getMonth();
    if (String.valueOf(month).length===1){
        month = `${0}${month+1}`
    }
    else {
        month = month+1;
    }
    if (String.valueOf(dayNow).length===1){
        dayNow = `${0}${dayNow}`
    }
        let fullDate = `${dayNow}. ${month}. 2018`
        this.setState({
            dateInput:fullDate
        })
    }
    _handleKeyPress(event){
        if (event.key === 'Enter') {
            this.getUsers();
            this.setState({
                membInput:''
            })
        }
    }
    startEndValidation(time){
        let hours = time.slice(0,2);
        let minutes = time.slice(3,5);
        if ((hours !=='')&&(minutes !=='')){
            hours = Number(hours);
            minutes = Number(minutes);
            if (((hours===8) && ((29<minutes)&&(minutes<60))) || (((8<hours)&&(hours<=22))&&((0<=minutes)&&(minutes<=59)))){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }

    }

    handleChange(event){
        let inpVal = event.target.value;
        let id = event.target.id;
        switch(id){
            case 'themeInput':{
                this.setState({
                    themeInput:inpVal
                });
            }
            break;
            case 'startInput':{
                this.setState({
                    startInput:inpVal
                }, ()=>{
                    if (this.startEndValidation(this.state.startInput)){
                        this.setState({
                            startValid:true
                        })
                    }
                    else{
                        this.setState({
                            startValid:false
                        })
                    }
                    this.setState({
                        endInput:''
                    })
                });
               
                
            }
            break;
            case 'endInput':{
                this.setState({
                    endInput:inpVal
                }, ()=>{
                    if (this.startEndValidation(this.state.endInput)){
                        let start = Number(this.state.startInput.slice(0,2))*60 + Number(this.state.startInput.slice(3,5));
                        let end = Number(this.state.endInput.slice(0,2))*60 + Number(this.state.endInput.slice(3,5));
                        if (end>start){
                            this.setState({
                                endValid:true
                            })
                        }
                    }
                    else{
                        this.setState({
                            endValid:false
                        })
                    }
                });
            }
            break;
            case 'membInput':{
                this.setState({
                    membInput:inpVal
                });
            }
            break;
        }
    }
    getUsers(){
        for (let i = 0; i < this.props.data.users.length; i++){
            if (this.state.membInput===this.props.data.users[i].login){
                this.setState({
                    usersInNewMeet:[...this.state.usersInNewMeet, this.props.data.users[i]]
                })
            }
            console.log(this.state.membInput, this.state.usersInNewMeet, this.props.data.users[i].login);
        }   

    }
    sortR(a,b){
    let sumA = 0;
    let sumB = 0;
    for (let i = 0; i < this.state.usersInNewMeet.length; i++){
        sumA+= Math.abs(a.floor - this.state.usersInNewMeet[i].homeFloor);
        sumB+=Math.abs(b.floor - this.state.usersInNewMeet[i].homeFloor);
    }
    if (sumA > sumB) return 1;
    if (sumA < sumB) return -1;
}
    getRecomendation(){
        let start = new Date(new Date().getTime() + 1000*60*60*10);
        let end = new Date(start.getTime() + 1000*60*60*3);
        let rooms = this.props.data.rooms.slice(0,this.props.data.rooms.length);
        let capacityprop = 5;


        for (let i = 0; i < rooms.length; i++){
            if (rooms[i].capacity < capacityprop){
                rooms.splice(i,1);
            }
            for (let j = 0; j < this.props.data.events; j++){
                if (( start.getTime() <= Date.parse(this.props.data.events[j].dateEnd) <= end.getTime()) || ( start.getTime() <= Date.parse(this.props.data.events[j].dateEnd) <= end.getTime())){
                    rooms.splice(j,1);
                }
            }
        }
        rooms.sort(this.sortR)
        rooms.start=`${start.getHours()}:${start.getMinutes()}`;
        rooms.end=`${end.getHours()}:${end.getMinutes()}`;
       return(
        rooms
       )
       
    }
    render(){
        if (!this.props.data.loading){
        let rooms = this.getRecomendation();

    return(
<div className="body-new-meet">
    <main className={this.props.location.pathname===`/NewMeet`? `main-new-meet`: `main-new-meet main-edit-meet`}>
        <div className="main_background">
        <div className="nmeet-container">
            <div className="title-line">
                {this.props.location.pathname===`/NewMeet`?<div className="title-line_title">Новая встреча</div>:<div className="title-line_title">Редактирование встречи</div>}
                <a className="title-line_exit-button"><img src="assets/close.svg" alt=""/></a>
            </div>
            <div className="theme-line">
                <div className="theme">
                    <div className="theme_title">Тема</div>
                    <input className="theme_input input_valid_err" id="themeInput" value={this.state.themeInput} onChange={this.handleChange} placeholder="О чём будете говорить?" type="text"/>
                </div>
                <div className="time">
                    <div className="date">
                        <div className="theme_title">Дата</div>
                        <input className="date_input" id="dateInput" value={this.state.dateInput} onChange={this.handleChange} type="text"/>
                    </div>
                    <div className="start-end">
                        <div className="start-block">
                            <div className="theme_title">Начало</div>
                            <input className="start-block_input" id="startInput" value={this.state.startInput} onChange={this.handleChange} type="text"/>
                        </div>
                        <div className="start-end_separator"><span>-</span></div>
                        <div className="end-block">
                            <div className="theme_title">Конец</div>
                            <input className="start-block_input" id="endInput"  onChange={this.handleChange} value={this.state.endInput} type="text"/>
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
                    
                    <div className="members_input-block">
                        <div className="theme_title">Участники</div>
                        <input id="members_input" id="membInput" onKeyPress={this._handleKeyPress} value={this.state.membInput} onChange={this.handleChange} className="members_input awesomplete"  type="text"/>
                    </div>
                    <div className="members_show">

                    </div>
                </div>
                </div>
                <div className="members-line_line"></div>
                <div className="nmeet-container">
                <div className="select-room">
                    <div className="theme_title" onClick={this.getRecomendation}>Рекомендованные переговорки</div>
                    {rooms.map((room)=><SelectRoomBlock key={room.id} id={room.id} title ={room.title} floor={room.floor} end={rooms.end} start={rooms.start}/>)}
                </div>
            </div>
        </div>
    </div>
    <Route path='/EditMeet' component={ DelButtonInEdit}/>
    </main>
    <Switch>
        <Route path='/NewMeet' component={FooterInNew}/>
        <Route path='/EditMeet' component={FooterInEdit}/>
    </Switch>
</div>
    )
}
else{
    return(<div>Loading...</div>)
}
}
}

export default graphql(QWERY_All)(NewMeet);