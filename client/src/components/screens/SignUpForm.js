import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import linkedState from '@src/utils/LinkedState';
import { Input } from '@src/components/ui';

import './auth.scss';

@linkedState(['name', 'email', 'password', 'repeatPassword'])
export default class SignUpForm extends Component {
    static propTypes = {
        linkState: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        repeatPassword: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
        formErrors: PropTypes.object.isRequired,
    };

    handleSubmit = (e) => {
        const { name, email, password, repeatPassword, onSubmit } = this.props;

        onSubmit({ name, email, password, repeatPassword });
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }

    render() {
        const { isAuthenticating, linkState, formErrors } = this.props;

        return (
            <form className="auth-form">

                <h3>Sign Up</h3>

                <Input
                    {...linkState('name')}
                    placeholder="Name"
                    name="name"
                    error={formErrors.name}
                    onKeyPress={this.handleEnter}
                    autoFocus
                />

                <Input
                    {...linkState('email')}
                    placeholder="E-mail"
                    name="email"
                    error={formErrors.email}
                    onKeyPress={this.handleEnter}
                />

                <Input
                    {...linkState('password')}
                    type="password"
                    placeholder="Password"
                    name="password"
                    error={formErrors.password}
                    onKeyPress={this.handleEnter}
                />

                <Input
                    {...linkState('repeatPassword')}
                    type="password"
                    placeholder="Repeat Password"
                    name="repeatPassword"
                    error={formErrors.repeatPassword}
                    onKeyPress={this.handleEnter}
                />

                <Button
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={isAuthenticating}
                    bsStyle="primary"
                >
                    Sign Up
                </Button>

            </form>
        );
    }
}
