import React from "react";
import FloorRow from "./FloorRow";
function Floor(props) {
  return (
    <div className="floor">
      <div className="floor_row floor_row-first">
        <div className="floor_name floor_name-first">{`${props.floorCount} ЭТАЖ`}</div>
        <div className="floor_row floor_row-tablet floor_row-first" />
      </div>
      {props.rooms.map(room =>
        <FloorRow //строка с переговоркой
          idFloorRow={room.key}
          key={room.key}
          id={room.key}
          roomTitle={`${room.roomTitle}`}
          completed={room.completed}
          events={room.events}
          roomSubtitile={`${room.roomSubtitile}`}
          dateNow={props.dateNow}
        />
      )}
    </div>
  );
}
export default Floor;
