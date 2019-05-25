import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormText
} from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

class SignUpModal extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    resultMes: ""
  };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleConfirmPasswordChange = event => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleSignUp = () => {
    const { username, email, password } = this.state;
    Axios({
      method: "POST",
      url: "http://localhost:5000/api/v1/users/create",
      data: {
        username,
        email,
        password
      }
    })
      .then(response => {
        console.log(response);
        localStorage.setItem("jwt", response.data.auth_token);
        localStorage.setItem("id", response.data.user.id);
      })
      .catch((error, response) => {
        console.log("hel", response);
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <Form>
          <FormGroup row>
            <Label for="username" sm={2}>
              Username
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="text"
                id="username"
                placeholder="Your Preferred Username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Your email address"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>
              Password
            </Label>
            <Col sm={10}>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Your Preferred Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>
              Confirm Password
            </Label>
            <Col sm={10}>
              <Input
                type="password"
                name="password"
                id="confirm-password"
                placeholder="Confirm Your Preferred Password"
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPasswordChange}
              />
              {this.state.password === this.state.confirmPassword ? (
                <br />
              ) : (
                <FormText color="danger">Passwords does not match</FormText>
              )}
            </Col>
          </FormGroup>
        </Form>
        <FormText className="text-center">
          Already a member?
          <Link onClick={e => this.props.handleToggle(e)}> Log In Here</Link>
        </FormText>
        <br />
        <div className="text-center">
          <Button
            color="primary"
            className={
              this.state.username !== "" &&
              this.state.email !== "" &&
              this.state.password !== "" &&
              this.state.confirmPassword !== ""
                ? ""
                : "disabled"
            }
            onClick={() => {
              this.handleSignUp();
              console.log(
                "Username: " +
                  this.state.username +
                  "\n" +
                  "Email: " +
                  this.state.email +
                  "\n" +
                  "Password: " +
                  this.state.password +
                  "\n" +
                  "Confirm Password: " +
                  this.state.confirmPassword
              );
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
}

export default SignUpModal;
