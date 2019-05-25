import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Calendar from "./Calendar.js";
import Uploader from "./Uploader.js";

const Button = styled.button`
  background-color: white;
  color: palevioletred;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: null,
      imgs: null
    };
  }

  handleDate = chosenDate => {
    this.setState({
      chosenDate
    });
  };

  handleImgs = imgs => {
    this.setState({
      imgs
    });
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.files);
    // axios
    //   .post(`http://${server}/api/v1/orders/create`, {
    //     timeSlot: timeSlot
    //   })
    //   .then(response => {
    //     console.log(response);
    //   });

    function uploadFile(files) {
      var formData = new FormData();

      files.map((file, index) => {
        formData.append(`file${index}`, file);
      });

      fetch("https://path/to/api", {
        // content-type header should not be specified!
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(success => {
          // Do something with the successful response
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    const { chosenDate, imgs } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={"mx-auto"}>
          <div className="d-flex flex-wrap">
            <div
              style={{ height: "400px", width: "20vw" }}
              className={"my-3 p-2 mx-auto text-center"}
            >
              <Calendar handleDate={this.handleDate} />
            </div>

            <div style={{ width: "70vw" }} className={"my-3 p-2"}>
              <Uploader handleImgs={this.handleImgs} chosenDate={chosenDate} />
            </div>
          </div>

          <div
            className={
              chosenDate === null || imgs === null ? "d-none" : "d-block"
            }
          >
            <Button type={"submit"}>Submit</Button>
          </div>
        </form>
      </>
    );
  }
}

export default OrderForm;
