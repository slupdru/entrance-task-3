import React from 'react';
import MeetBlock from './MeetBlock';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// const QWERY_EVENT =  gql`query QWERY_EVENT($id:ID!){
//     event(id:$id) {
//       id
//       title
//       dateEnd
//       dateStart
//       users {
//         id
//       }
//       room {
//         id
//       }
//     }
//   } `;

class FloorRow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            leftA:0,
            mob:false
        }
    this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleMouseOver(event){
        if (document.documentElement.clientWidth>850){
            if (!event.target.classList.contains('meet-dark-block')){
            
            let newVal = event.pageX-260-document.documentElement.clientWidth/70;
                if (newVal>0){
                    this.setState({
                        leftA:newVal,
                        mob:false
                    })
                }
            }
            else{
                this.setState({
                    leftA:-1000
                })
            }
        }
        else{
            if (!event.target.classList.contains('meet-dark-block')){
            let widthMain = document.getElementsByTagName('main')[0].scrollLeft;
            let newVal = event.clientX-210+widthMain;
                if (newVal>0){
                    this.setState({
                        leftA:newVal,
                        mob:true
                    })
                }
            }
            else{
                this.setState({
                    leftA:-1000
                })
            }
        }
    }
    render(){
    let mob = 0;
    let width;
    let hash;
    if (this.state.mob===false){
        width = document.getElementById('main_cont').clientWidth-260;
        hash = `/NewMeet#${this.props.id}|${mob}|${this.state.leftA/width*100}`
    }
    else{
        mob = 1;
        hash = `/NewMeet#${this.props.id}|${mob}|${this.state.leftA}`
    }
    
    if (this.props.events[0] === undefined){
    return(
        <div className={`floor_row ${this.props.completed===true ? 'floor_row_completed': ''}`}>
        <div className="room">
            <div className="room_title">{this.props.roomTitle}</div>
            <div className="room_subtitile">{`до ${this.props.roomSubtitile} человек`}</div>
        </div>
        <div onMouseMove={this.handleMouseOver} className="floor_row floor_row-tablet">
                  <div className="floor_mobile-title">{this.props.roomTitle}</div>
                  <div className="table-container-hour">
                    <a style={{left:`${this.state.leftA}px`}} href={hash} onClick={this.onClickButt} className="floor_button floor_button_button-line1"><span>+</span></a>
                  </div>
              </div>
      </div>
    )}
    else{
        return(
            <div className={`floor_row ${this.props.completed===true ? 'floor_row_completed': ''}`}>
            <div className="room">
                <div className="room_title">{this.props.roomTitle}</div>
                <div className="room_subtitile">{`до ${this.props.roomSubtitile} человек`}</div>
            </div>
            <div  onMouseMove={this.handleMouseOver}  className="floor_row floor_row-tablet">
                <div className="floor_mobile-title">{this.props.roomTitle}</div>
                <div className="table-container-hour">
                {this.props.events.map(event=>
                <MeetBlock 
                key={event.id}
                title={event.title}
                idEvent = {event.id}
                logInFirst={event.users[0].login}
                FirstIcon={event.users[0].avatarUrl}
                countOfUsers={event.users.length}
                start={new Date(Date.parse(event.dateStart))} nameRoom={this.props.roomTitle} end={new Date(Date.parse(event.dateEnd))}/>
                )}
                <a style={{left:`${this.state.leftA}px`}} href={hash} className="floor_button floor_button_button-line1"><span>+</span></a>
                </div>
            </div>
                  </div>
        )}

    }
}
// const FloorRowWithData = graphql(QWERY_EVENT, {
//     options: (props) => ({
//       variables: {
//         id: props.id
//       },
//   }),
// })(FloorRow);

export default FloorRow;