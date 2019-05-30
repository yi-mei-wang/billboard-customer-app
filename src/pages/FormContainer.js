import React from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Redirect } from "react-router-dom";


class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginForm: true
    };
  }

  handleToggle = e => {
    e.preventDefault();
    this.setState({
      isLoginForm: !this.state.isLoginForm
    });
  };

  render() {
    const { currentUser } = this.props;
    if (currentUser) return <Redirect to='/' />;
    const { isLoginForm } = this.state;
    let Container = isLoginForm ? (
      <LoginForm
        handleToggle={this.handleToggle}
        setUser={this.props.setUser}
      />
    ) : (
        <SignUpForm
          handleToggle={this.handleToggle}
          setUser={this.props.setUser}
        />
      );

    return <div className="formDis">{Container}</div>;
  }
}

export default FormContainer;
