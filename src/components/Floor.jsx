import React from 'react';
import FloorRow from './FloorRow';
function Floor(props){

    return(
        <div className="floor">
            <div className="floor_row floor_row-first">
                <div className="floor_name floor_name-first">{`${props.floorCount} ЭТАЖ`}</div>
                <div className="floor_row floor_row-tablet floor_row-first"></div>
            </div>
                {props.rooms.map(room => <FloorRow idFloorRow ={room.key}
                //  OnClickMeetFR={()=> props.OnClickMeetFS(props.idFloor)}
                  key = {room.key} id={room.key} roomTitle={`${room.roomTitle}`} completed = {room.completed} events={room.events} roomSubtitile ={`${room.roomSubtitile}` }/>)}
            </div>
    )
}
export default Floor;