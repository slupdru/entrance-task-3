import React from 'react';
import '../assets/arrow.svg';
import '../assets/arrow2.svg';
import DateNow from './DateNow';
import HoursInTimeBar from './HoursInTimeBar'
const minute = 1000 * 60;

class Timebar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            date: new Date()
        };
        this.tick = this.tick.bind(this);
    }

    componentDidMount(){
        this.interval = setInterval(this.tick, minute);
    }
    
    tick(){
        console.log(this.state);
        let NewDate = new Date(this.state.date.getTime() + minute);
        this.setState(
            {
                date: NewDate
            }
        )
    }
    render(){ 
        let dateMy = this.state.date;
        let hours = dateMy.getHours();
        return(
            <div className="timebar">
                <div className="timebar_main-container">
                    <div className="timebar_date-container">
                        <div className="timebar_arrow-container">
                            <img className="timebar_img_left" src="assets/arrow2.svg" alt=""/>
                        </div>
                        <DateNow dateProps={dateMy}/>
                        <div className="timebar_arrow-container">
                            <img className="timebar_img_right" src="assets/arrow.svg" alt=""/>
                        </div>
                    </div>
                    <div className="timebar_time">
                        <HoursInTimeBar hoursIsOver={hours} />
                    </div>
                </div>
            </div>
            )
    }
}
export default Timebar;
