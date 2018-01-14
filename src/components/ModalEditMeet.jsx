import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import "../assets/emoji1.png";
const MUTATION_DELETE_MEET = gql`
  mutation createMeet($eventDelId: ID!) {
    removeEvent(id: $eventDelId) {
      id
    }
  }
`;
class ModalEditMeet extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props
      .mutate({
        variables: {
          eventDelId: this.props.eventId
        }
      })
      .then(({ data }) => {
        console.log("got data", data);
        location.href = "/";
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  }

  render() {
    return (
      <div
        className="modal-new-meet modal-delete"
        style={
          this.props.display === true
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        <div className="modal-new-meet_panel">
          <div className="modal-new-meet_container">
            <img className="modal-new-meet_icon" src="../assets/emoji1.png" />
            <div className="modal-new-meet_title">Встреча будет</div>
            <div className="modal-new-meet_title">удалена безвозвратно</div>
            <a
              onClick={this.props.clickDel}
              className="buttons-container_cancel"
            >
              Отмена
            </a>
            <a onClick={this.onClick} className="buttons-container_cancel">
              Удалить
            </a>
          </div>
        </div>
      </div>
    );
  }
}
const ModalEditMeetWithMut = graphql(MUTATION_DELETE_MEET)(ModalEditMeet);
export default ModalEditMeetWithMut;
