import React from "react";
import "../assets/close.svg";
class MembersShow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="members-show_show-block">
        <img
          className=""
          className="membres-show_icon"
          src={this.props.avatarUrl}
        />
        <div className="members-show_name">
          {this.props.login}
        </div>
        <a
          onClick={() => this.props.closeClick(this.props.id)}
          className="members-show_close-icon"
        >
          <img src="assets/close.svg" />
        </a>
      </div>
    );
  }
}
export default MembersShow;
