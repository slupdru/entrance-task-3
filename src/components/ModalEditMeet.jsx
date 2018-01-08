import React from 'react';
function ModalEditMeet(props){
    return(
        <div className="modal-new-meet modal-delete">
        <div className="modal-new-meet_panel">
            <div className="modal-new-meet_container">
                <img className="modal-new-meet_icon" src="assets/emoji1.svg" alt=""/>
                <div className="modal-new-meet_title">Встреча будет</div>
                <div className="modal-new-meet_title">удалена безвозвратно</div>
                <a className="buttons-container_cancel">Отмена</a>
                <a className="buttons-container_cancel">Удалить</a>
            </div>
        </div>
      </div>
    )
}
export default ModalEditMeet;