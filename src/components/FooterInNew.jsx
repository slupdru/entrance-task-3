import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const MUTATION_CREATE_MEET = gql`
  mutation createMeet(
    $title: String!
    $dateStart: Date!
    $dateEnd: Date!
    $usersIds: [ID]
    $roomId: ID!
  ) {
    createEvent(
      input: { title: $title, dateStart: $dateStart, dateEnd: $dateEnd }
      usersIds: $usersIds
      roomId: $roomId
    ) {
      id
    }
  }
`;

class FooterInNew extends React.Component {//футер для страницы новой встречи
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
            title: this.props.themeInput,
            dateStart: this.props.start,
            dateEnd: this.props.end,
            usersIds: massOfUsers,
            roomId: this.props.roomSelectedId
          }
        })
        .then(({ data }) => {
          console.log("got data", data);

          location.href = `/#${this.props.start.getMonth()}|${this.props.start.getDate()}|${this
            .props.startStr}|${this.props.endStr}|${this.props.themeInput}`;
        })
        .catch(error => {
          console.log("there was an error sending the query", error);
        });
    } else {
      console.log("ERROR");
    }
  }

  render() {
    return (
      <footer
        className={
          this.props.roomSelectedId !== -1
            ? "footer-new-meet"
            : "footer-new-meet footer-new-meet_ms-line"
        }
      >
        <div
          className={
            this.props.roomSelectedId !== -1
              ? "message-line"
              : "message-line message-line_visible"
          }
        >
          <div className="message-line_message">Выберите переговорку</div>
        </div>
        <div className="buttons-container">
          <a href="/" className="buttons-container_cancel">
            Отмена
          </a>
          <a onClick={this.onClick} className="header_button-foo">
            Создать встречу
          </a>
        </div>
      </footer>
    );
  }
}
const FooterInNewWithMut = graphql(MUTATION_CREATE_MEET)(FooterInNew);
export default FooterInNewWithMut;
