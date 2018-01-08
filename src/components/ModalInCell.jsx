import React from 'react';
import '../assets/edit.svg';
function ModalInCell(props){

    let dayNow = props.start.getDate();
    let month = props.start.getMonth();
    let timeMeet = `${props.start.getHours()}:${props.start.getMinutes()}—${props.end.getHours()}:${props.end.getMinutes()}`
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

    let meetBlockStyle;
    props.displayN===false? meetBlockStyle = {display: 'none'} : meetBlockStyle = {display: 'block'};
    return(
        <div style={meetBlockStyle} className="modal-in-cell">
            <div className="modal-in-cell_closeicon">
                <a className = "link" src="edit-meet.html"><img className = "link" src="assets/edit.svg" alt=""/></a>
            </div>
            <div className="modal-in-cell_container">
                <div className="modal-in-cell_title">{props.title}</div>
                <div className="modal-in-cell_subtitle">{`${dayNow} ${month},  ${timeMeet}  ·  ${props.nameRoom}`}</div>
                <div className="modal-in-cell_users"><img src={props.FirstIcon} className='modal-in-cell_ava' alt=""/><span>{props.logInFirst}</span><span>{`и ${props.countOfUsers} участников`}</span></div>
            </div>
        </div>
    )
}
export default ModalInCell;