// Libraries
import React from "react";
import Axios from "axios";
import { Route, Switch, Link } from "react-router-dom";
// User components
import FormContainer from "./components/FormContainer";
import OrderForm from "./components/OrderForm.js";
// Stylesheets
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentuser: null,
      isLoading: true
    };
  }

  // Upon logging in, set currentUser in state
  setUser = currentUser => {
    if (currentUser) {
      this.setState({
        currentUser
      });
    }
  };

  // Upon loggin out, remove currentUser from state
  removeUser = () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        {/* <Navbar users={users} /> */}

        <Switch>
          {/* Log in/sign up page */}
          <Route
            exact
            path="/"
            component={props => (
              <FormContainer
                {...props}
                // Why?
                isLoading={isLoading}
                setUser={this.setUser}
              />
            )}
          />
          {/* Order form */}
          <Route
            path="/campaigns/new"
            component={props => <OrderForm {...props} />}
          />
        </Switch>
        <Link to="/campaigns/new">New campaign</Link>
      </>
    ); //end of return
  } //end of render
}

export default App;
