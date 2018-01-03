import React from 'react';
import PropTypes from 'prop-types';
function DateNow(props) {
    let dayNow = props.dateProps.getDate();
    let month = props.dateProps.getMonth();
    switch (month) {
        case 0:
            month = "января"
        break;
        case 1:
            month = "февраля"
        break;
        case 2:
            month = "марта"
        break;
        case 3:
            month = "апреля"
        break;
        case 4:
            month = "мая"
        break;
        case 5:
            month = "июня"
        break;
        case 6:
            month = "июля"
        break;
        case 7:
            month = "августа"
        break;
        case 8:
            month = "сентября"
        break;
        case 9:
            month = "октября"
        break;
        case 10:
            month = "ноября"
        break;
        case 11:
            month = "декабря"
        break;                                                                                
        }
        if (dayNow === new Date().getDate()){
            return <a className="timebar_date">{`${dayNow} ${month.substring(0,3)} · Сегодня`}</a>
        }
        else{
            return <a className="timebar_date">{ `${dayNow} ${month}`}</a>
        }
    }
DateNow.propTypes = {
    dateProps: PropTypes.instanceOf(Date)
};
export default DateNow;