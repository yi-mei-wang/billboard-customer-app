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
      .then(results => {
        console.log(results);
      })
      .catch(errors => {
        console.log(errors);
      });
  }
  render() {
    return <h1>Expired ADs</h1>;
  }
}
export default ExpiredAds;
