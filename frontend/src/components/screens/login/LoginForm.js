import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import formValidation from '@utils/formValidation';
import { Input } from '@components/ui/inputs';

export default class LoginForm extends Component {
    static propTypes = {
        onLoginClick: PropTypes.func.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
    };

    state = {
        formErrors: {},
        email: '',
        password: '',
    };

    // TODO - create HOC / decorator which will receive parameters (state names) and will return props and handle method to child component
    linkState = (prop) => ({
        value: this.state[prop],
        onChange: (e) => this.setState({ [prop]: e.target.value }),
    });

    handleLoginClick = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        formValidation({ loginCredentials: { email, password } })
        .then((formErrors) => {
            this.setState({ formErrors });

            if (formErrors.hasErrors) {
                return;
            }

            this.props.onLoginClick({ email, password });
        });
    }

    render() {
        const { isAuthenticating } = this.props;
        const { formErrors } = this.state;

        return (
            <div style={{ width: 350, margin: '0 auto' }}>

                <h3>Log In</h3>

                <Input
                    {...this.linkState('email')}
                    placeholder="E-mail"
                    name="email"
                    error={formErrors.email}
                    autoFocus
                />

                <Input
                    {...this.linkState('password')}
                    placeholder="Password"
                    name="password"
                    error={formErrors.password}
                    type="password"
                />

                <Button
                    type="submit"
                    onClick={this.handleLoginClick}
                    disabled={isAuthenticating}
                    bsStyle="primary"
                >
                    Log In
                </Button>

            </div>
        );
    }
}
