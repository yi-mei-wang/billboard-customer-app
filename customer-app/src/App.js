// Libraries
import React from "react";
import { Route, Switch } from "react-router-dom";
// Pages
import Bottom from "./components/Bottom";
import FormContainer from "./pages/FormContainer";
import Homepage from "./pages/Homepage";
import SideBar from "./components/SideBar";

// Stylesheets
import "./stylesheets/App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: localStorage.getItem("jwt")
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
    const { currentUser } = this.state;
    return (
      <>
        <SideBar />
        <Switch>
          {/* Log in/sign up page */}
          <Route
            exact
            path="/login"
            component={props => (
              <FormContainer
                {...props}
                currentUser={currentUser}
                setUser={this.setUser}
              />
            )}
          />
          {/* Homepage*/}
          <Route
            exact
            path="/:status?"
            component={props => (
              <Homepage
                {...props}
                currentUser={currentUser}
                removeUser={this.removeUser}
              />
            )}
          />
        </Switch>
        {/* <Link to="/campaigns/new">New campaign</Link> */}
      </>
    ); //end of return
  } //end of render
}

export default App;
