import React from "react";
import { Col, Button, Form, FormGroup, FormText, Input } from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { DOMAIN_URL } from "../constants";

const server = "https://billboard-automated-server-1.herokuapp.com";

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
      url: `${server}/api/v1/users/create`,
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
        this.props.setUser(response.data.user);
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
            {/* <Label for="username" sm={2}>
              Username
            </Label> */}
            <Col sm={12}>
              <Input
                className="form-control"
                type="text"
                name="text"
                id="username"
                placeholder="Your preferred username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            {/* <Label for="email" sm={2}>
              Email
            </Label> */}
            <Col sm={12}>
              <Input
                className="form-control"
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
            {/* <Label for="password" sm={2}>
              Password
            </Label> */}
            <Col sm={12}>
              <Input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Your preferred password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            {/* <Label for="password" sm={2}>
              Confirm Password
            </Label> */}
            <Col sm={12}>
              <Input
                className="form-control"
                type="password"
                name="password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPasswordChange}
              />
              {this.state.password === this.state.confirmPassword ? (
                <br />
              ) : (
                  <FormText color="danger">Passwords do not match</FormText>
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
            disabled={Boolean(
              this.state.username === "" ||
              this.state.email === "" ||
              this.state.password === "" ||
              this.state.confirmPassword === ""
            )}
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
