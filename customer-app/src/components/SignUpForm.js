import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormText } from 'reactstrap';
import { Link } from "react-router-dom";
import Axios from 'axios';



class SignUpModal extends React.Component {
    constructor(props) {
        super(props);

    }
    state = {
        usernameText: '',
        emailText: '',
        passwordText: '',
        confirmPasswordText: '',
        resultMes: ''

    }

    handleUsernameChange = event => {
        this.setState({ usernameText: event.target.value })
    }

    handleEmailChange = event => {
        this.setState({ emailText: event.target.value })
    }

    handlePasswordChange = event => {
        this.setState({ passwordText: event.target.value })
    }

    handleConfirmPasswordChange = event => {
        this.setState({ confirmPasswordText: event.target.value })
    }

    handleSignUp = () => {
        Axios({
            method: 'POST',
            url: 'localhost:5000/api/v1/users/create',
            data: {
                username: this.state.usernameText,
                email: this.state.emailText,
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
                <h2>Sign Up</h2>
                <Form>
                    <FormGroup row>
                        <Label for="username" sm={2}>Username</Label>
                        <Col sm={10}>
                            <Input type="text" name="text" id="username" placeholder="Your Preferred Username" value={this.state.usernameText} onChange={this.handleUsernameChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="email" placeholder="Your email address" value={this.state.emailText} onChange={this.handleEmailChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="password" placeholder="Your Preferred Password" value={this.state.passwordText} onChange={this.handlePasswordChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Confirm Password</Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="password" placeholder="Confirm Your Preferred Password" value={this.state.confirmPasswordText} onChange={this.handleConfirmPasswordChange} />
                            {this.state.passwordText === this.state.confirmPasswordText
                                ? <br />
                                : <FormText color="danger">
                                    Passwords does not match
                                </FormText>}
                        </Col>
                    </FormGroup>
                </Form>
                <FormText className="text-center">Already a member?
                        <Link onClick={(e) => (
                        this.props.handleToggle(e)
                    )}> Log In Here</Link>
                </FormText>
                <br />
                <div className="text-center">
                    <Button color="primary" className={(this.state.usernameText != '' && this.state.emailText != '' && this.state.passwordText != '' && this.state.confirmPasswordText != '' ? "" : "disabled")} onClick={() => {
                        this.handleSignUp()
                        console.log("Username: " + this.state.usernameText + "\n" +
                            "Email: " + this.state.emailText + "\n" +
                            "Password: " + this.state.passwordText + "\n" +
                            "Confirm Password: " + this.state.confirmPasswordText)
                    }}>Sign Up</Button>
                </div>
            </div>
        );
    }
}

export default SignUpModal;