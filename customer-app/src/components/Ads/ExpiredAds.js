import React from "react";
import axios from "axios";

const server = "localhost:5000";

class ExpiredAds extends React.Component {
  state = {
    orders: []
  };

  componentDidMount() {
    let token = localStorage.getItem("jwt");
    axios
      .get(`http://${server}/api/v1/orders/show?q=-1`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          orders: response.data
        });
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  render() {
    const orders = this.state.orders.map(order => (
      <>
        <p>{order.order_id}</p>
        <p>{order.start_time}</p>
        {order.images.map(img => (
          <img src={img} />
        ))}
      </>
    ));
    return (
      <>
        <div className={"px-4"}>
          <h2 className={"pt-3 m-0"}>Expired ADs</h2>
          <span
            className={"underline mb-2"}
            style={{
              backgroundColor: "#ffbf00",
              width: "200px",
              height: "10px",
              display: "inline-block"
            }}
          />
          {orders}
          {/* ----------- */}
          {/* images: ["https://s3.amazonaws.com/meistagram/tech.jpeg"]
order_id: 146
start_time: "Wed, 29 May 2019 12:15:00 GMT" */}
        </div>
      </>
    );
  }
}
export default ExpiredAds;
