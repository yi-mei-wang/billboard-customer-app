import React, { components } from 'react';
import LoginForm from '../components/LoginForm';
import LoadSpinner from '../components/LoadSpinner'


class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isLoading } = this.props
        let Container = isLoading ? <LoadSpinner /> : <LoginForm users={this.props.users} />
        return (
            <div className="">
                <div>
                    {Container}
                </div>

            </div>
        )
    }
}

export default Login;

