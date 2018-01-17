import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const MUTATION_CHANGE_MEET = gql`
  mutation createMeet(
    $title: String!
    $dateStart: Date!
    $dateEnd: Date!
    $usersIds: [ID]
    $roomId: ID!
    $eventDelId: ID!
  ) {
    removeEvent(id: $eventDelId) {
      id
    }
    createEvent(
      input: { title: $title, dateStart: $dateStart, dateEnd: $dateEnd }
      usersIds: $usersIds
      roomId: $roomId
    ) {
      id
    }
  }
`;

class FooterInEdit extends React.Component {//футер для страницы редактирования встречи 
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    if (this.props._showErrorFun() === true) {
      let massOfUsers = [];
      for (let i = 0; i < this.props.usersInNewMeet.length; i++) {
        massOfUsers.push(this.props.usersInNewMeet[i].id);
      }
      this.props
        .mutate({
          variables: {
            eventDelId: this.props.eventId,
            title: this.props.themeInput,
            dateStart: this.props.start,
            dateEnd: this.props.end,
            usersIds: massOfUsers,
            roomId: this.props.roomSelectedId
          }
        })
        .then(({ data }) => {
          console.log("got data", data);
          location.href = "/";
        })
        .catch(error => {
          console.log("there was an error sending the query", error);
        });
    } else {
      location.href = "/";
    }
  }

  render() {
    return (
      <footer className="footer-new-meet footer-edit">
        <div className="buttons-container">
          <a href="/" className="buttons-container_cancel">
            Отмена
          </a>
          <a onClick={this.props.clickDel} className="buttons-container_delete">
            Удалить встречу
          </a>
          <a onClick={this.onClick} className="buttons-container_save">
            Сохранить
          </a>
        </div>
      </footer>
    );
  }
}
const FooterInEditWithMut = graphql(MUTATION_CHANGE_MEET)(FooterInEdit);
export default FooterInEditWithMut;
