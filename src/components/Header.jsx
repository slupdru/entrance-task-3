import React from 'react';
import '../assets/logo.svg';
import {Route} from 'react-router-dom'
import ButtonInHeader from './ButtonInHeader';
function Header(props){
    return (
        <header>
                <div className="header_container">
                <img className="header_logo" src="assets/logo.svg" alt=""/>
                <Route exact path='/'component={ButtonInHeader}/>
                </div>
            </header>
    );
}

export default Header; 