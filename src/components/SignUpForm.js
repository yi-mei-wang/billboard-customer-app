import React from "react";
import {
  Col,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { DOMAIN_URL } from "../constants";

class SignUpModal extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    resultMes: "",
    invalidEmail: false,
    invalidUsername: false
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
      url: `${DOMAIN_URL}/api/v1/users/create`,
      data: {
        username,
        email,
        password
      }
    })
      .then(response => {
        console.log(response);
        switch (response.data.status) {
          case 201:
            localStorage.setItem("jwt", response.data.auth_token);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("username", response.data.user.username);
            this.props.setUser(response.data.user.id);
            this.props.history.push("/");
            break;
          case 4091:
            console.log("Username taken");
            this.setState({
              invalidUsername: true
            });
            break;
          case 4092:
            console.log("Email taken");
            this.setState({
              invalidEmail: true
            });
            break;
        }
      })
      .catch((error, response) => {
        console.log(response);
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
                invalid={this.state.invalidUsername}
              />
              <FormFeedback>Oh noes! That name is already taken.</FormFeedback>
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
                invalid={this.state.invalidEmail}
              />
              <FormFeedback>
                Oh noes! There is already an account registered to this email.
              </FormFeedback>
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
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUpModal);
