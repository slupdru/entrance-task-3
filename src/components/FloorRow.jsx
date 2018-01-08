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

function FloorRow(props){
    console.log(props.events);
    if (props.events[0] === undefined){
    return(
        <div className={`floor_row ${props.completed===true ? 'floor_row_completed': ''}`}>
        <div className="room">
            <div className="room_title">{props.roomTitle}</div>
            <div className="room_subtitile">{`до ${props.roomSubtitile} человек`}</div>
        </div>
        <div className="floor_row floor_row-tablet">
                  <div className="floor_mobile-title">{props.roomTitle}</div>
                  <div className="table-container-hour">
                    <a href="new-meet.html" className="floor_button floor_button_button-line1"><span>+</span></a>
                  </div>
              </div>
      </div>
    )}
    else{
        return(
            <div className={`floor_row ${props.completed===true ? 'floor_row_completed': ''}`}>
            <div className="room">
                <div className="room_title">{props.roomTitle}</div>
                <div className="room_subtitile">{`до ${props.roomSubtitile} человек`}</div>
            </div>
            <div className="floor_row floor_row-tablet">
                      <div className="floor_mobile-title">{props.roomTitle}</div>
                      <div className="table-container-hour">
                      {props.events.map(event=>
                      <MeetBlock 
                        key={event.id}
                        title={event.title}
                        idEvent = {event.id}
                        logInFirst={event.users[0].login}
                        FirstIcon={event.users[0].avatarUrl}
                        countOfUsers={event.users.length}
                    //    onClickMeetR={()=> props.OnClickMeetFR(props.idFloorRow)}
                        start={new Date(Date.parse(event.dateStart))} nameRoom={props.roomTitle} end={new Date(Date.parse(event.dateEnd))}/>
                      )}
                        <a href="new-meet.html" className="floor_button floor_button_button-line1"><span>+</span></a>
                      </div>
                  </div>
                  </div>
        )}

}

// const FloorRowWithData = graphql(QWERY_EVENT, {
//     options: (props) => ({
//       variables: {
//         id: props.id
//       },
//   }),
// })(FloorRow);

export default FloorRow;