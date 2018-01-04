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
                  <div className="table-container-hour">
                    <div className="table-hour_1-block dark"></div>
                    <a href="new-meet.html" className="floor_button floor_button_button-line1"><span>+</span></a>
                  </div>
              </div>
      </div>
    )
}
export default FloorRow;