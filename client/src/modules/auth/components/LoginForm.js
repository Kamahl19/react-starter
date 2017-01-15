import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import linkedState from '@src/utils/LinkedState';
import { Input } from '@src/components/inputs';

import './auth.scss';

@linkedState(['email', 'password'])
export default class LoginForm extends Component {
    static propTypes = {
        linkState: PropTypes.func.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
        formErrors: PropTypes.object.isRequired,
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, password, onSubmit } = this.props;

        onSubmit({ email, password });
    }

    renderForgotPassword() {
        return (
            <Link to="auth/forgotten-password">
                Forgot password?
            </Link>
        );
    }

    render() {
        const { isAuthenticating, linkState, formErrors } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Log In</h3>

                <Input
                    {...linkState('email')}
                    label="E-mail"
                    placeholder="E-mail"
                    name="email"
                    error={formErrors.email}
                    autoFocus
                />

                <Input
                    {...linkState('password')}
                    type="password"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    error={formErrors.password}
                    rightLabel={this.renderForgotPassword()}
                />

                <Button
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={isAuthenticating}
                    bsStyle="primary"
                >
                    Log In
                </Button>

            </form>
        );
    }
}
