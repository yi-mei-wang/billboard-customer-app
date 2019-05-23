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
      selectedDate: null,
      slotsTaken: []
    };
  }

  displayCalendar = () => {};

  handleSelect = e => {
    console.log(e);
    // Pass in the date
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/images/?userId=${
          this.props.userId
        }`
      )
      .then(result => {
        this.setState({ slotsTaken: result.slots });
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });

    this.setState({
      selectedDate: e,
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
    console.log(e);
    this.setState({
      selectedDate: e
      // Get the selected timeslot,
      // send it to db
    });
  };

  render() {
    // Date field on click should display calendar
    // After a date has been chosen, a call should be made to check availabilities
    // Time field should render and appear with timings disabled
    const { slotsTaken, today } = this.state;
    return (
      <>
        <DatePicker
          selected={this.state.selectedDate}
          onSelect={this.handleSelect} //when day is clicked
          onChange={this.handleChange}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="HH:mm"
          showTimeSelect
          timeIntervals={15}
          minDate={new Date()}
          excludeTimes={slotsTaken}
          placeholderText={"Select a date"}
          timeCaption="Time"
        />
      </>
    );
  }
}

export default Calendar;
