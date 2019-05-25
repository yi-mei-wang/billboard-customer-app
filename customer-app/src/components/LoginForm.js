import React from 'react';
import { Button, Form, FormGroup, Input, Col, FormText } from 'reactstrap';
import { Link } from "react-router-dom";
import Axios from 'axios';
import logo from './images/logo.png'




class LoginModal extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        usernameText: '',
        passwordText: '',
        resultMes: ""

    }

    handleUsernameChange = event => {
        this.setState({ usernameText: event.target.value })
    }

    handlePasswordChange = event => {
        this.setState({ passwordText: event.target.value })
    }

    handleLogin = () => {
        Axios({
            method: 'POST',
            url: 'localhost:5000/api/v1/login',
            data: {
                username: this.state.usernameText,
                password: this.state.confirmPasswordText
            }
        })
            .then(response => {
                this.setState({
                    resultMes: response.data.message
                })
                console.log(this.state.resultMes)
                console.log('this is the response: ', response.data.message)
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <img src={logo} class="logo"></img>

                </div>
                <Form>
                    <FormGroup row>
                        <Col sm={12}>
                            <Input type="text" name="username" id="username" placeholder="username" value={this.state.usernameText} onChange={this.handleUsernameChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Input type="password" name="password" id="password" placeholder="Your Password" value={this.state.passwordText} onChange={this.handlePasswordChange} />
                        </Col>
                    </FormGroup>
                </Form>
                <FormText className="text-center">
                    New member?
                        <Link onClick={(e) => (
                        this.props.handleToggle(e)
                    )}> Sign Up Now</Link>
                </FormText>
                <br />
                <div className="text-center">
                    <Button color="primary" className={(this.state.usernameText != '' && this.state.passwordText != '' ? "" : "disabled")} onClick={() => {
                        this.handleLogin()
                        console.log("Username: " + this.state.usernameText + "\n" +
                            "Password: " + this.state.passwordText + "\n")
                    }}>Login</Button>{' '}
                </div>
            </div >
        );
    }
}

export default LoginModal;
