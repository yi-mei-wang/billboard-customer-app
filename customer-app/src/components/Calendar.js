import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

const server = "localhost:5000";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      today: new Date(),
      slotsTaken: []
    };
  }
  handleClick = e => {
    console.log(e);
    this.setState({
      selectedDate: new Date()
    });
  };

  handleSelect = e => {
    console.log("handleSelect");

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
  };

  handleChange = e => {
    console.log("handleChange");
    this.props.handleDate(e);
    this.setState({
      selectedDate: e
    });
  };

  render() {
    // Date field on click should display calendar
    // After a date has been chosen, a call should be made to check availabilities
    // Time field should render and appear with timings disabled
    const { slotsTaken, today, selectedDate } = this.state;
    let minutes = today.getMinutes();
    let m = minutes - (minutes % 15);

    let maxTime = new Date();
    maxTime.setHours(23);
    maxTime.setMinutes(45);

    let midnight = new Date();
    midnight.setHours(0, 0, 0, 0);

    return (
      <>
        {/* Have two displays instead to make validation of data easier */}
        <DatePicker
          selected={selectedDate}
          onClick={this.handleClick}
          onSelect={this.handleSelect} //when day is clicked
          onChange={this.handleChange}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="HH:mm"
          showTimeSelect
          timeIntervals={15}
          minDate={new Date()}
          minTime={
            // If selectedDate is null, midnight; if not, check month
            selectedDate === null
              ? midnight
              : // Not the same month, show all time slots; same month, check date
              selectedDate.getMonth() - today.getMonth() !== 0
              ? midnight
              : // Not the same day, show all time slots; same day, disable passed time slots
              selectedDate.getDate() - today.getDate() !== 0
              ? midnight
              : today.setMinutes(m)
          }
          maxTime={maxTime}
          excludeTimes={slotsTaken}
          placeholderText={"Select a date"}
          timeCaption="Time"
          className="w-200px text-center"
        />
      </>
    );
  }
}

export default Calendar;
