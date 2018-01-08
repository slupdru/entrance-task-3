import React from 'react';
function EditMeet(props){
    return(
        <body className="body-new-meet">
    <main className="main-new-meet">
        <div className="main_background">
        <div className="nmeet-container">
            <div className="title-line">
                <div className="title-line_title">Редактирование встречи</div>
                <a className="title-line_exit-button"><img src="assets/close.svg" alt=""/></a>
            </div>
            <div className="theme-line">
                <div className="theme">
                    <div className="theme_title">Тема</div>
                    <div className="theme_input-con">
                        <input className="theme_input" value="Тестовое задание ШРИ" type="text"/>
                        <img className="theme_close-icon" src="assets/close.svg" alt=""/>
                    </div>
                </div>
                <div className="time">
                    <div className="date">
                        <div className="theme_title">Дата</div>
                        <input className="date_input" value="14 декабря, 2017" type="text"/>
                    </div>
                    <div className="start-end">
                        <div className="start-block">
                            <div className="theme_title">Начало</div>
                            <input className="start-block_input" value="16:00" type="text"/>
                        </div>
                        <div className="start-end_separator"><span>-</span></div>
                        <div className="end-block">
                            <div className="theme_title">Конец</div>
                            <input className="start-block_input" value="16:30" type="text"/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
            <div className="nmeet-container">
            <div className="members-line">
                <div className="nmeet-container">
                <div className="members">
                    
                    <div className="members_input-block">
                        <div className="theme_title">Участники</div>
                        <input className="members_input" placeholder="Например, Тор Одинович" type="text"/>
                    </div>
                    <div className="members_show">

                    </div>
                </div>
                </div>
                <div className="members-line_line"></div>
                <div className="nmeet-container">
                <div className="select-room">
                    <div className="theme_title">Рекомендованные переговорки</div>
                    <div className="select-room_roomblock" id="room1">
                        <div className="select-room_container" >
                            <span className="select-room_time">16:00—16:30</span>
                            <span className="select-room_room">Готем · 4 этаж</span>
                        </div>
                        <img className = "selct-room_icon"  src="assets/close.svg" alt=""/>
                    </div>
                    <div className="select-room_roomblock" id="room2">
                        <div className="select-room_container">
                            <span className="select-room_time">16:00—16:30</span>
                            <span className="select-room_room">Поле непаханное · 4 этаж</span>
                        </div>
                        <img className = "selct-room_icon"  src="assets/close.svg" alt=""/>
                    </div>
                    <div className="select-room_roomblock" id="room3">
                        <div className="select-room_container">
                            <span className="select-room_time">16:00—16:30</span>
                            <span className="select-room_room">Тёмная башня · 4 этаж</span>
                        </div>
                        <img className = "selct-room_icon"  src="assets/close.svg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="members-line_line"></div>
    <div className="delete-line">
    <div className="nmeet-container nmeet-container_delete">
        <a className="delete_button" >Удалить встречу</a>
    </div>
    </div>
    <div className="members-line_line"></div>
    </main>
    <footer className="footer-new-meet">
        <div className="message-line">
            <div className="message-line_message">Выберите переговорку</div>
        </div>
        <div className="buttons-container">
            <a href="index.html" className="buttons-container_cancel">Отмена</a>
            <a className="buttons-container_delete">Удалить встречу</a>
            <a href="index.html" className="buttons-container_save">Сохранить</a>
        </div>
    </footer>
</body>
    );
}
export default EditMeet;