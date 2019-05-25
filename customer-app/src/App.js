import React from 'react';
import './App.css';
import Axios from 'axios';
import FormContainer from './components/FormContainer';
import { Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";
import OrderForm from "./components/OrderForm.js";



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      currentuser: "",
      isLoading: true,
      message: ""
    }
  }

  componentDidMount() {
    Axios('localhost:5000/api/v1/users')
      .then(data => {
        this.setState({
          users: data.data,
          isLoading: false
        })
      }
      )
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { isLoading, users } = this.state
    return (
      <>
        {/* <Navbar users={users} /> */}

        <Switch>

          <Route exact path="/" component={props => <FormContainer {...props} isLoading={isLoading} users={users} />} />


        </Switch>


      </>
    )//end of return
  }//end of render
}

export default App;
