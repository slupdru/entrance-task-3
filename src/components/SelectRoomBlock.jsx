import React from 'react';
import '../assets/close.svg';


class SelectRoomBlock extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selected:false
        }
    }
    render(){
        return(
            <div className="select-room_roomblock">
                <div className="select-room_container">
                <span className="select-room_time">{`${this.props.start}—${this.props.end}`}</span>
                    <span className="select-room_room">{`${this.props.title} · ${this.props.floor} этаж`}</span>
                </div>
                <img className = "selct-room_icon"  src="assets/close.svg" alt=""/>
            </div>
        )
    }
}
export default SelectRoomBlock;