import React from "react";
import { Button, Form, FormGroup, Input, Col, FormText } from "reactstrap";
// import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./images/logo.png";

class LoginModal extends React.Component {
  state = {
    username: "",
    password: "",
    resultMes: ""
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
      url: "http://localhost:5000/api/v1/login",
      data: {
        username,
        password
      }
    })
      .then(response => {
        console.log(response);
        this.setState({
          resultMes: response.data.message
        });
        if (response.status === 200) {
          localStorage.setItem("jwt", response.data.auth_token);
          localStorage.setItem("id", response.data.user.id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="text-center">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <Form>
          <FormGroup row>
            <Col sm={12}>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </Col>
          </FormGroup>
        </Form>
        <FormText className="text-center">
          New member?
          <p onClick={e => this.props.handleToggle(e)}> Sign Up Now</p>
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
              console.log(
                "Username: " +
                  this.state.username +
                  "\n" +
                  "Password: " +
                  this.state.password +
                  "\n"
              );
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
