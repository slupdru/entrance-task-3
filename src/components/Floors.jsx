import React from "react";
import Floor from "./Floor";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const QWERY_ROOMS = gql`
  query {
    rooms {
      id
      title
      capacity
      floor
    }
    events {
      id
      title
      dateEnd
      dateStart
      users {
        id
        login
        avatarUrl
      }
      room {
        id
      }
    }
  }
`;

class Floors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    if (!this.props.data.loading) {//Получаем данные о переговорках и событиях с сервера, наполяем переговорки событиями, распределяем данные по этажам
      let floorsMass = [];
      for (let i = 0; i < this.props.data.rooms.length; i++) {
        if (floorsMass[this.props.data.rooms[i].floor] === undefined) {
          floorsMass[this.props.data.rooms[i].floor] = [
            {
              key: this.props.data.rooms[i].id,
              roomTitle: this.props.data.rooms[i].title,
              completed: false,
              roomSubtitile: this.props.data.rooms[i].capacity,
              events: []
            }
          ];
        } else {
          floorsMass[this.props.data.rooms[i].floor].push({
            key: this.props.data.rooms[i].id,
            roomTitle: this.props.data.rooms[i].title,
            completed: false,
            roomSubtitile: this.props.data.rooms[i].capacity,
            events: []
          });
        }
      }

      for (let j = 0; j < this.props.data.events.length; j++) {
        for (let k = 0; k < floorsMass.length; k++) {
          if (floorsMass[k] !== undefined) {
            for (let l = 0; l < floorsMass[k].length; l++) {
              if ((this.props.data.events[j].room.id === floorsMass[k][l].key)&&(new Date(Date.parse(this.props.data.events[j].dateStart)).getDate()===this.props.dateNow.getDate())&&(new Date(Date.parse(this.props.data.events[j].dateStart)).getYear()===this.props.dateNow.getYear())) {
                floorsMass[k][l].events.push(this.props.data.events[j]);
              }
            }
          }
        }
      }
      return (
        <div>
          {floorsMass.map((floor, index) =>
            <Floor
              idFloor={index}
              key={index}
              floorCount={index}
              rooms={floor}
              dateNow={this.props.dateNow}
            />
          )}
        </div>
      );
    } else return <div className="load_container"><div className="load"><hr/><hr/><hr/><hr/></div></div>;
  }
}

export default graphql(QWERY_ROOMS)(Floors);
