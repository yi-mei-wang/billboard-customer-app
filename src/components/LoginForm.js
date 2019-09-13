import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  FormText,
  FormFeedback
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./images/logo.png";
import { DOMAIN_URL } from "../constants";

class LoginModal extends React.Component {
  state = {
    username: "",
    password: "",
    resultMes: "",
    invalidUser: false,
    invalidPassword: false
  };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    axios({
      method: "POST",
      url: `${DOMAIN_URL}/api/v1/login`,
      data: {
        username,
        password
      }
    })
      .then(response => {
        console.log(response);
        switch (response.data.status) {
          case 401:
            console.log("Wrong password");
            this.setState({
              invalidPassword: true
            });
            break;
          case 408:
            console.log("User not found");
            this.setState({
              invalidUser: true
            });
            break;
          case 201:
            localStorage.setItem("jwt", response.data.auth_token);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("username", response.data.user.username);
            this.props.setUser(response.data.user);
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="text-center my-3">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <Form>
          <FormGroup row>
            <Col sm={12}>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                invalid={this.state.invalidUser}
              />
              <FormFeedback>Oh noes! User not found.</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                invalid={this.state.invalidPassword}
              />
              <FormFeedback>Oh noes! The password is wrong.</FormFeedback>
            </Col>
          </FormGroup>
        </Form>
        <FormText className="text-center">
          New member?
          <Link onClick={e => this.props.handleToggle(e)}> Sign Up Now</Link>
        </FormText>
        <br />
        <div className="text-center">
          <Button
            color="primary"
            className={
              this.state.username !== "" && this.state.password !== ""
                ? ""
                : "disabled"
            }
            onClick={() => {
              this.handleLogin();
            }}
          >
            Login
          </Button>{" "}
        </div>
      </div>
    );
  }
}

export default LoginModal;
