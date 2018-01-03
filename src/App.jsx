import React from 'react';
import ReactDOM  from 'react-dom';
import './styles/styles.scss'
import Header from './components/Header'
import Timebar from './components/Timebar';
import MainContainer from './components/MainContainer';
function App(){
    return(
        <main>
            <Header/>
            <Timebar/>
            <MainContainer/>
        </main>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));