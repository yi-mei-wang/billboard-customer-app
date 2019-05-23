import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "moment-timezone";

const server = "localhost:5000";

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
    // Returns a date object
    let chosenDate = new Date(e);
    let d = chosenDate.getDate();
    // = currentmonth - 1
    let m = chosenDate.getMonth();
    let y = chosenDate.getFullYear();

    // Pass in the date
    axios
      .get(`http://${server}/api/v1/timeslots/show?d=${d}&m=${m}&y=${y}`)

      .then(result => {
        let slotsTaken = result.data.slotsTaken.map(slot => {
          return new Date(slot);
        });
        console.log(slotsTaken);
        this.setState({
          slotsTaken: [...slotsTaken]
        });
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });

    console.log(this.state);
  };
  handleChange = e => {
    this.setState({
      selectedDate: e
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.selectedDate);
    let timeSlot = new Date(this.state.selectedDate);
    console.log(timeSlot);
    axios
      .post(`http://${server}/api/v1/orders/create`, {
        timeSlot: timeSlot,
        test: "test"
      })
      .then(response => {
        console.log(response);
      });
  };

  render() {
    // Date field on click should display calendar
    // After a date has been chosen, a call should be made to check availabilities
    // Time field should render and appear with timings disabled
    const { slotsTaken } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
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
            className="w-200px text-center"
          />
          <button type="submit" />
        </form>
      </>
    );
  }
}

export default Calendar;
