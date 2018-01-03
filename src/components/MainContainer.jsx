import React from 'react';
import FloorRow from './FloorRow';
import Floor from './Floor';

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
          <Floor roomCount = {7} rooms = {[
            {
              key: 1,
              roomTitle:"Ржавый Фред",
              completed : true,
              roomSubtitile : 10
            },
            { key: 2,
              roomTitle:"Прачечная",
              completed : false,
              roomSubtitile :10
            },
            { 
              key: 3,
              roomTitle:"Жёлтый дом",
              completed :false,
              roomSubtitile :10
            },
            {
              key: 4,
              roomTitle:"Оранжевый тюльпан",
              completed : true,
              roomSubtitile :10
            }
          ]}/>

          <Floor roomCount = {6} rooms = {[
            {
              key: 5,
              roomTitle:"Джокер",
              completed : false,
              roomSubtitile : 6
            },
            { 
              key: 6,
              roomTitle:"Мариванна",
              completed : false,
              roomSubtitile :6
            },
            { 
              key: 7,
              roomTitle:"Тонкий Боб",
              completed :false,
              roomSubtitile :6
            },
            {
              key: 8,
              roomTitle:"Чёрная вдова",
              completed : false,
              roomSubtitile :6
            },
            {
              key: 9,
              roomTitle:"Белорусский ликёр",
              completed : false,
              roomSubtitile :6
            }
          ]}/>
    </div>
    );
}
export default MainContainer;