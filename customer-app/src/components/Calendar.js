import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Button } from "reactstrap";

const server = "localhost:5000";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      selectedDate: new Date(),
      slotsTaken: []
    };
  }

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
        <form onSubmit={this.handleSubmit}>
          <DatePicker
            selected={selectedDate}
            onSelect={this.handleSelect} //when day is clicked
            onChange={this.handleChange}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="HH:mm"
            showTimeSelect
            timeIntervals={15}
            minDate={today}
            minTime={
              selectedDate.getMonth() - today.getMonth() !== 0
                ? midnight
                : selectedDate.getDate() - today.getDate() === 0
                ? today.setMinutes(m)
                : midnight
            }
            maxTime={maxTime}
            excludeTimes={slotsTaken}
            placeholderText={"Select a date"}
            timeCaption="Time"
            className="w-200px text-center"
          />
          <Button type="submit" className="btn-primary btn">
            {" "}
            Submit{" "}
          </Button>
        </form>
      </>
    );
  }
}

export default Calendar;
