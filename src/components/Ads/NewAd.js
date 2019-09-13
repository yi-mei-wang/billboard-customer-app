import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../Calendar";
import Uploader from "../Uploader";
import LoadSpinner from "../LoadSpinner";
import { DOMAIN_URL } from "../../constants";
import { Underline } from "../atoms"; 

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
      imgs: [],
      isLoading: false,
      failedImgs: [],
      Loaded: 0,
      order_id: ""
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

  handleDlt = id => {
    const imgCopy = this.state.imgs;
    const failedCopy = this.state.failedImgs;
    this.setState({
      imgs: imgCopy.filter(file => file.name !== id), //remove using this
      failedImgs: failedCopy.filter(file => file.name !== id), //remove using this
      Loaded: 0
    });
  };

  handleProceed = () => {
    const { order_id } = this.state;
    axios({
      method: "POST",
      url: `${DOMAIN_URL}/api/v1/orders/verify`,
      data: {
        order_id
      }
    })
      .then(response => {
        console.log(response);
        const status = response.data.status;
        if (status === "ok") {
          this.props.history.push({
            pathname: "/mes",
            state: { response: "Success" }
          });
        } else {
          this.props.history.push({
            pathname: "/mes",
            state: { response: "Fail" }
          });
        }
      })
      .catch((error, response) => {
        console.log(response);
        console.log(error);
      });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.pageEnd.scrollIntoView({ behavior: "smooth" });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      failedImgs: [],
      isLoading: true,
      Loaded: 0
    });
    const { imgs, chosenDate, failedImgs } = this.state;
    let imgCopy = [...imgs];
    let failedCopy = [];
    failedCopy = [...failedImgs];
    let formData = new FormData();
    imgs.map(file => {
      formData.append(`file`, file);
    });
    formData.append("chosenDate", chosenDate.getTime());
    formData.append("auth_token", localStorage.getItem("jwt"));

    axios
      .post(`${DOMAIN_URL}/api/v1/orders/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        let order_id_2 = response.data.order_id;

        let errors = response.data.errors;

        for (let i = 0; i < Object.keys(errors).length; i++) {
          // If the index of the error has a length, image with the corresponding index has failed
          if (errors[i].length) {
            failedCopy.push(imgCopy[i]);
          }
        }
        // Display that image
        this.setState({
          failedImgs: failedCopy,
          isLoading: false,
          Loaded: 1,
          order_id: order_id_2
        });
      });
  };

  render() {
    const { chosenDate, imgs, failedImgs, isLoading, Loaded } = this.state;
    const failedNails = failedImgs.map(file => (
      <div>
        <Thumb key={file.name}>
          <ThumbInner>
            <Img src={file.preview} alt="User uploads" />
          </ThumbInner>
        </Thumb>
      </div>
    ));
    const successNails = imgs.map(file => (
      <div>
        <Thumb key={file.name}>
          <ThumbInner>
            <Img src={file.preview} alt="User uploads" />
          </ThumbInner>
        </Thumb>
      </div>
    ));

    return (
      <div className={"px-4 mb-5"}>
        <h2 className={"pt-4 m-0"}>New ADs</h2>
<Underline/>
        <form onSubmit={this.handleSubmit} className={"mx-auto"}>
          <h4>1. Select a date and time</h4>
          <div className="row p-3 mx-auto">
            <div className={"col-12 col-md-3 my-3 p-2 mx-auto text-center"}>
              <Calendar handleDate={this.handleDate} />
            </div>
          </div>
          <h4>2. Choose your campaign pictures</h4>

          <div className={"col-12 col-md-9 my-3 p-2 mx-auto"}>
            <Uploader
              handleImgs={this.handleImgs}
              handleDlt={this.handleDlt}
              chosenDate={chosenDate}
            />
          </div>
          <div className="d-flex">
            <Button
              type="submit"
              disabled={chosenDate === null || imgs === null ? true : false}
            >
              Next
            </Button>
            {isLoading ? (
              <LoadSpinner style={{ height: "70px", width: "80px" }} />
            ) : null}
          </div>
        </form>

        {failedImgs.length === 0 ? (
          <div
            className={Loaded === 1 ? "" : "d-none"}
            style={{ marginBottom: "100px" }}
          >
            <h4>3. Summary</h4>
            <small className={"m-3"}>
              Please confirm that the following details are correct before
              clicking on the 'Proceed' button. Should there be any changes
              required, please scroll up and make the changes and then click on
              the 'Next' button once again.
            </small>
            <br />
            <div className={"m-2"}>
              Selected date : <Moment format="YYYY/MM/DD">{chosenDate}</Moment>
              <br />
              Selected time slot: <Moment format="HH:mm">{chosenDate}</Moment>
            </div>
            <ThumbsContainer>{successNails}</ThumbsContainer>
            <Button type="submit" onClick={this.handleProceed}>
              Proceed
            </Button>
          </div>
        ) : (
            <div
              className={!failedImgs.length && "d-none"}
              style={{ marginBottom: "100px" }}
            >
              <h4>3. Summary - Failed images</h4>
              <small className={"m-3"}>
                We do not allow advertising of alcohol, weapons,
                tobacco-containing products, NSFW content on our platform.
            </small>
              <p className={"m-2"}>These images will not be uploaded:</p>
              {/* Images that did not pass moderation */}
              <ThumbsContainer>{failedNails}</ThumbsContainer>
              <small>
                Please make necessary changes and then click on the Next button
                again.
            </small>
            </div>
          )}
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.pageEnd = el;
          }}
        />
      </div>
    );
  }
}

export default NewAd;
