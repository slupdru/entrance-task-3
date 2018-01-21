import React from "react";
import "../assets/logo.svg";
import { Route } from "react-router-dom";
import ButtonInHeader from "./ButtonInHeader";
import CalendarSelector from "./CalendarSelector";
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dateMy = this.props.dateNow;
    return (
      <header>
        <div className="header_container">
          <img className="header_logo" src="assets/logo.svg" alt="" />
          <Route exact path="/" component={ButtonInHeader} />
        </div>
        <Route
          exact
          path="/"
          render={() =>
            <CalendarSelector
              changeDateCalendarC={this.props.changeDateCalendarM}
              changeDateC={this.props.changeDateM}
              date={dateMy}
            />}
        />
      </header>
    );
  }
}

export default Header;
