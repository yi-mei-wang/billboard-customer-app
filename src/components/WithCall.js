import React from "react";
import axios from "axios";
import { DOMAIN_URL } from "../constants";

// Higher-order component that takes in a wrapped component (whatever that means), which then returns a function that takes in userId as an argument to make an API call. This HOC will then return a new component that has the data from the API call, which in this case are the user's images

const WithCall = WrappedComponent =>
  class extends React.Component {
    state = {
      orders: []
    };

    componentDidMount() {
      let token = localStorage.getItem("jwt");
      axios
        .get(`${DOMAIN_URL}/api/v1/orders/show?q=1`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          this.setState({
            orders: response.data
          });
        })
        .catch(errors => {
          console.log(errors);
        });
    }

    render() {
      return <WrappedComponent orders={this.state.orders} {...this.props} />;
    }
  };

export default WithCall;
