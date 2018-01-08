import React, { Component } from 'react';
import './styles/styles.scss'
import './styles/style-mobile.scss'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Timebar from './components/Timebar';
import MainContainer from './components/MainContainer';
import NewMeet from './components/NewMeet'

  
function App(){
    return(
        <main>
            <Header/>
            <Route exact path='/' component ={Timebar}/>
            <Switch>
                <Route exact path='/' component={MainContainer}/>
                <Route path='/NewMeet' component={NewMeet}/>
                <Route path='/EditMeet' component={NewMeet}/>
            </Switch>
        </main>
    );
}
export default App;