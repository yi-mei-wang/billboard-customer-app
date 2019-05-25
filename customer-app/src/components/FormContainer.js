import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';



class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginForm: true
        };

    }

    handleToggle = (e) => {
        e.preventDefault()
        this.setState(({
            isLoginForm: !this.state.isLoginForm
        }));
    }

    render() {
        const { isLoginForm } = this.state
        let Container = isLoginForm ? <LoginForm handleToggle={this.handleToggle} users={this.props} /> : <SignUpForm handleToggle={this.handleToggle} users={this.props} />

        return (
            <div class="formDis">
                {Container}
            </div>
        );
    }
}

export default FormContainer;