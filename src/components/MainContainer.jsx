import React from 'react';
import Floors from './Floors';
import Timebar from './Timebar';
function MainContainer(props){
    return (
      <main>
      <Timebar/>
      <div className="main-container" id='main_cont'>
      <div className="linear-back">
      <div className="linear-back_container">
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        <div className="linear-back_line"></div>
        </div>
      </div>
      <div className="white-background"></div>
      <Floors/>
    </div>
    </main>
    );
}
export default MainContainer;