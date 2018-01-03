import React from 'react';
function FloorRow(props){
    return(
        <div className={`floor_row ${props.completed===true ? 'floor_row_completed': ''}`}>
        <div className="room">
            <div className="room_title">{props.roomTitle}</div>
            <div className="room_subtitile">{`до ${props.roomSubtitile} человек`}</div>
        </div>
        <div className="floor_row floor_row-tablet">
                  <div className="floor_mobile-title">{props.roomTitle}</div>
                  <div className="table-hour_1-block dark"></div>
              </div>
      </div>
    )
}
export default FloorRow;