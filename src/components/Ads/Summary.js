import React from "react";
import axios from "axios";
import styled from "styled-components";
import Moment from "react-moment";
import { DOMAIN_URL } from "../../constants";
import { Underline } from "../atoms"; 

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
  justify-content: center;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 200px;
  height: 120px;
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

class Summary extends React.Component {
  state = {
    orders: [],
    images: []
  };

  componentDidMount() {
    let token = localStorage.getItem("jwt");
    axios
      .get(`${DOMAIN_URL}/api/v1/orders/show?q=0&id=${this.props.orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          orders: response.data[0],
          images: response.data[0].images
        });
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  render() {
    const { orders, images } = this.state;
    const Imgs = images.map((img, index) => (
      <Thumb key={index}>
        <ThumbInner>
          <Img src={img} alt="User uploads" />
        </ThumbInner>
      </Thumb>
    ));

    return (
      <div className={"px-4"}>
        <h2 className={"pt-4 m-0"}>Order {orders.order_id}</h2>
<Underline/>

        <p>
          Selected date :{" "}
          <Moment format="YYYY/MM/DD">{orders.start_time}</Moment>
          <br />
          Selected time slot:{" "}
          <Moment format="HH:mm">{orders.start_time}</Moment>
        </p>
        {Imgs}
      </div>
    );
  }
}

export default Summary;
