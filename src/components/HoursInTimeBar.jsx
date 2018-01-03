import React from 'react';
function HoursInTimeBar(props){
    let massOfHours = [];
    for (let i = 0; i< 16; i++){
        if ((i+8) > props.hoursIsOver) {
            if (i === 0){
            massOfHours.push( <span key={i} className="time-container_hours">8:00</span>)
            }
            else massOfHours.push( <span key={i} className="time-container_hours">{i+8}</span>)
        }
        else{
            if (i === 0){
                massOfHours.push( <span key={i} className="time-container_hours time-container_hours_passed">8:00</span>)
                }
            else{
            massOfHours.push(<span key={i} className="time-container_hours time-container_hours_passed">{i+8}</span>);
            }
        }

    }
    return(   
    <div className="timebar_time-container">
        { 
            massOfHours.map(hour => hour)}
    </div>
    )
}
export default HoursInTimeBar;