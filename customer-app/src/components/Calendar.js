import React, { Component } from "react";
import axios from "axios";
import Timeslots from "Timeslots.js";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slotsTaken: [],
      dateChosen: false
    };
  }

  displayCalendar = () => {};

  getTakenSlots = e => {
    // Get the date that has been chosen e.target.value
    // Make a call to the database with the date
    // Server should return all the time slots in an array
    // Get all the time slots that are taken, setState
    //
  };

  render() {
    // Date field on click should display calendar
    // After a date has been chosen, a call should be made to check availabilities
    // Time field should render and appear with timings disabled
    const { slotsTaken, dateChosen } = this.state;
    return dateChosen ? (
      <form action="">
        <select name="time-slot" id="time-slot">
          <Timeslots slotsTaken={slotsTaken} />
        </select>
      </form>
    ) : (
      // Show the calendar
      <form action="" method="post" />
    );
  }
}

export default Calendar;
