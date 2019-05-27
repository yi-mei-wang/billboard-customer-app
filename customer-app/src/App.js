// Libraries
import React from "react";
import Axios from "axios";
import { Route, Switch } from "react-router-dom";
// User components
import FormContainer from "./components/FormContainer";
import OrderForm from "./components/OrderForm.js";
// Stylesheets
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentuser: "",
      isLoading: true,
      message: ""
    };
  }

  componentDidMount() {
    // Why??
    Axios("http://localhost:5000/api/v1/users")
      .then(data => {
        this.setState({
          users: data.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { isLoading, users } = this.state;
    return (
      <>
        {/* <Navbar users={users} /> */}

        <Switch>
          <Route
            exact
            path="/"
            component={props => (
              <FormContainer {...props} isLoading={isLoading} users={users} />
            )}
          />
          {/* <Calendar /> */}
        </Switch>
      </>
    ); //end of return
  } //end of render
}

export default App;
