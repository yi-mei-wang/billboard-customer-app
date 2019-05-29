import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Calendar from "../Calendar.js";
import Uploader from "../Uploader.js";

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

class NewAd extends Component {
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
    formData.append("auth_token", localStorage.getItem("jwt"));

    axios
      .post(`http://${server}/api/v1/orders/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
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
      <div className={"px-4"}>
        <h2 className={"pt-3 m-0"}>New ADs</h2>
        <span
          class="underline mb-2"
          style={{
            backgroundColor: "#ffbf00",
            width: "200px",
            height: "10px",
            display: "inline-block"
          }}
        />
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

          <Button
            type="submit"
            disabled={chosenDate === null || imgs === null ? true : false}
          >
            Submit
          </Button>
        </form>

        <div className={!failedImgs.length && "d-none"}>
          <h4>3. Failed images</h4>
          <small>
            We do not allow advertising of alcohol, weapons, tobacco-containing
            products, NSFW content on our platform.
          </small>
          <p>These images will not be uploaded:</p>
          {/* Images that did not pass moderation */}
          <ThumbsContainer>{failedNails}</ThumbsContainer>
        </div>
      </div>
    );
  }
}

export default NewAd;
