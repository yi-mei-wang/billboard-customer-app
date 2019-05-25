import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

const server = "localhost:5000";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      slotsTaken: [],
      selectedDate: null,
      selectedTime: null,
      minTime: new Date().setHours(0, 0, 0, 0)
    };
  }

  setMinTime = selectedDate => {
    const { today } = this.state;

    let minutes = new Date().getMinutes();
    let min = minutes - (minutes % 15);
    let hour = new Date().getHours();

    // Default minTime is midnight
    selectedDate.setHours(0, 0, 0, 0);
    // If today is selected, set the timing accordingly
    if (selectedDate.getMonth() - today.getMonth() === 0) {
      if (selectedDate.getDate() - today.getDate() === 0) {
        selectedDate.setHours(hour);
        selectedDate.setMinutes(min);
      }
    }
    // Set minTime
    this.setState({
      minTime: selectedDate
    });
    this.props.handleDate(selectedDate);
  };

  selectDate = e => {
    // Query and set taken slots
    let selectedDate = new Date(e);
    this.setState({
      selectedDate,
      selectedTime: null
    });

    let d = selectedDate.getDate();
    let m = selectedDate.getMonth() + 1;
    let y = selectedDate.getFullYear();
    axios
      .get(`http://${server}/api/v1/timeslots/show?d=${d}&m=${m}&y=${y}`)

      .then(result => {
        console.log("axios");
        let slotsTaken = result.data.slotsTaken.map(slot => {
          return new Date(slot);
        });
        console.log("slotsTaken", slotsTaken);
        this.setState({
          slotsTaken: [...slotsTaken]
        });
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });

    // Set the minTime for the time picker
    this.setMinTime(selectedDate);
    // First display null in the time picker
  };

  handleChange = e => {
    this.props.handleDate(e);
    this.setState({
      selectedTime: true,
      selectedDate: e
    });
  };

  render() {
    // Date field on click should display calendar
    // After a date has been chosen, a call should be made to check availabilities
    // Time field should render and appear with timings disabled
    const {
      slotsTaken,
      today,
      selectedDate,
      selectedTime,
      minTime
    } = this.state;

    let maxTime = new Date();
    maxTime.setHours(23);
    maxTime.setMinutes(45);

    return (
      <>
        <DatePicker
          selected={selectedDate}
          onSelect={this.selectDate} // only when day is clicked
          dateFormat="MMMM d, yyyy"
          minDate={today}
          placeholderText={"Select a date"}
          className="w-200px text-center datepicker-input"
        />

        {selectedDate !== null && (
          <DatePicker
            selected={selectedDate}
            onChange={this.handleChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            minTime={minTime}
            maxTime={maxTime}
            excludeTimes={slotsTaken}
            timeCaption="Time"
            placeholderText={"Select a time"}
            className="w-120px text-center datepicker-input"
          />
        )}
      </>
    );
  }
}

export default Calendar;
