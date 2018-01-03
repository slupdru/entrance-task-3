import React from 'react';
import '../assets/logo.svg';
function Header(props){
    return (
        <header>
                <div className="header_container">
                <img className="header_logo" src="assets/logo.svg" alt=""/>
                <a href="new-meet.html" className="header_button">Создать встречу</a>
                </div>
            </header>
    );
}

export default Header; 