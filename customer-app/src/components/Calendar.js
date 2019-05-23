import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "moment-timezone";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      slotsTaken: []
    };
  }

  displayCalendar = () => {};

  handleSelect = e => {
    this.setState({
      slotsTaken: [
        new Date("Thu May 23 2019 13:30:00 GMT+0800 (Malaysia Time)")
      ]
    });
    console.log(this.state);
    // Get the date that has been chosen e.target.value
    // Make a call to the database with the date
    // Server should return all the time slots in an array
    // Get all the time slots that are taken, setState
    //
  };

  handleChange = e => {
    // console.log(e);
    // Get the selected timeslot,
    // send it to db
  };

  render() {
    // Date field on click should display calendar
    // After a date has been chosen, a call should be made to check availabilities
    // Time field should render and appear with timings disabled
    const { slotsTaken } = this.state;
    return (
      <>
        <DatePicker
          selected={this.state.today}
          dateFormat="MMMM d, yyyy"
          onSelect={this.handleSelect} //when day is clicked
        />
        <DatePicker
          selected={this.state.today}
          onChange={this.handleChange}
          timeIntervals={15}
          dateFormat="h:mm aa"
          showTimeSelect
          showTimeSelectOnly
          timeCaption="Time"
          excludeTimes={slotsTaken}
        />
      </>
    );
  }
}

export default Calendar;
