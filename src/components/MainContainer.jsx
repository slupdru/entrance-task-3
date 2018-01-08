import React from 'react';
import Floors from './Floors';
function MainContainer(props){
    return (
      <div className="main-container">
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
    );
}
export default MainContainer;