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
      selectedTime: null
    };
  }

  checkAndSetTime = selectedDate => {
    const { today } = this.state;

    let minutes = new Date().getMinutes();
    let min = minutes - (minutes % 15);
    let hour = new Date().getHours();

    // If today is selected, set the timing accordingly
    if (selectedDate.getMonth() - today.getMonth() === 0) {
      if (selectedDate.getDate() - today.getDate() === 0) {
        selectedDate.setHours(hour);
        selectedDate.setMinutes(min);
      } else {
        selectedDate.setHours(0, 0, 0, 0);
      }
    } else {
      selectedDate.setHours(0, 0, 0, 0);
    }
    return selectedDate;
  };

  selectDate = e => {
    console.log(e);
    const { today } = this.state;
    // Returns a date object
    let selectedDate = new Date(e);
    let d = selectedDate.getDate();
    // = currentmonth - 1
    let m = selectedDate.getMonth();
    let y = selectedDate.getFullYear();

    // Pass in the date
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
    console.log(this.checkAndSetTime(selectedDate));
    this.setState({
      selectedTime: null,
      selectedDate: this.checkAndSetTime(selectedDate)
    });
  };

  handleChange = e => {
    console.log("handleChange", e);
    console.log("state", this.state);
    this.props.handleDate(e);
    this.checkAndSetTime(new Date(e));
    this.setState({
      selectedTime: true,
      selectedDate: e
    });
  };

  render() {
    // Date field on click should display calendar
    // After a date has been chosen, a call should be made to check availabilities
    // Time field should render and appear with timings disabled
    const { slotsTaken, today, selectedDate, selectedTime } = this.state;

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
          className="w-200px text-center"
        />

        {selectedDate !== null && (
          <DatePicker
            selected={selectedTime && selectedDate}
            onChange={this.handleChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            minTime={selectedDate}
            maxTime={maxTime}
            excludeTimes={slotsTaken}
            timeCaption="Time"
            placeholderText={"Select a time"}
            className="w-120px text-center"
          />
        )}
      </>
    );
  }
}

export default Calendar;
