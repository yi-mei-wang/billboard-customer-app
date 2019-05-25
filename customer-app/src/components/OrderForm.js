import React, { Component } from "react";
import Calendar from "./Calendar.js";
import Uploader from "./Uploader.js";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: null,
      imgs: []
    };
  }

  handleDate = chosenDate => {
    console.log(chosenDate);
    this.setState({
      chosenDate
    });
    console.log(this.state);
  };

  handleImgs = imgs => {
    this.setState({
      imgs
    });
  };
  render() {
    return (
      <>
        <form action="">
          <div style={{ width: "80vw" }} className={"m-2"}>
            <Uploader handleImgs={this.handleImgs} />
          </div>
          <div style={{ height: "400px" }} className={"m-2"}>
            <Calendar handleDate={this.handleDate} />
          </div>
        </form>
      </>
    );
  }
}

export default OrderForm;
