import React from 'react';
function FooterInEdit(){
    return(
    <footer className="footer-new-meet footer-edit">
        <div className="buttons-container">
            <a href="index.html" className="buttons-container_cancel">Отмена</a>
            <a className="buttons-container_delete">Удалить встречу</a>
            <a href="index.html" className="buttons-container_save">Сохранить</a>
        </div>
    </footer>
    )
}
export default FooterInEdit;