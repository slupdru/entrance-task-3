import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
 
class DatePickerMY extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    },()=>this.props.changeDate(this.state.startDate));
  }
 
  render() {
    return <DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}
    locale="ru-gb"
    dateFormat="DD MMMM, YYYY"
/>

  }
}
export default DatePickerMY;