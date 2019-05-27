import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Calendar from "./Calendar.js";
import Uploader from "./Uploader.js";

const server = "localhost:5000";

const Button = styled.button`
  background-color: white;
  color: palevioletred;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 160px;
  height: 90px;
  padding: 4px;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: null,
      imgs: null,
      isLoading: false,
      failedImgs: []
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
    const { imgs, chosenDate, failedImgs } = this.state;
    let imgCopy = [...imgs];
    let failedCopy = [...failedImgs];
    let formData = new FormData();
    imgs.map(file => {
      formData.append(`file`, file);
    });
    formData.append("chosenDate", chosenDate.getTime());

    axios
      .post(`http://${server}/api/v1/orders/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        let errors = response.data.errors;
        console.log(errors);
        for (let i = 0; i < Object.keys(errors).length; i++) {
          console.log(errors[i]);
          console.log(errors[i].length);
          // If the index of the error has a length, image with the corresponding index has failed
          if (errors[i].length) {
            failedCopy.push(imgCopy[i]);
          }
        }
        // Display that image
        this.setState({
          failedImgs: failedCopy
        });
        console.log(failedCopy);
      });
  };

  render() {
    const { chosenDate, imgs, failedImgs } = this.state;
    const failedNails = failedImgs.map(file => (
      <div>
        <Thumb key={file.name}>
          <ThumbInner>
            <Img src={file.preview} alt="User uploads" />
          </ThumbInner>
        </Thumb>
      </div>
    ));
    return (
      <div className={"px-3"}>
        <h2 className={"py-3"}>New ADs</h2>
        <form onSubmit={this.handleSubmit} className={"mx-auto"}>
          <h4>1. Select a time and date</h4>
          <div className="row p-3 mx-auto">
            <div className={"col-12 col-md-3 my-3 p-2 mx-auto text-center"}>
              <Calendar handleDate={this.handleDate} />
            </div>
          </div>
          <h4>2. Choose your campaign pictures</h4>

          <div className={"col-12 col-md-9 my-3 p-2 mx-auto"}>
            <Uploader handleImgs={this.handleImgs} chosenDate={chosenDate} />
          </div>

          <div
            className={
              chosenDate === null || imgs === null ? "d-none" : "d-block"
            }
          >
            <Button type="submit">Submit</Button>
          </div>
        </form>
        <div>
          <h4>3. Order summary</h4>
        </div>
        <div className={!failedImgs.length && "d-none"}>
          <h4>4. Failed images</h4>
          {/* Images that did not pass moderation */}
          <ThumbsContainer>{failedNails}</ThumbsContainer>
        </div>
      </div>
    );
  }
}

export default OrderForm;
