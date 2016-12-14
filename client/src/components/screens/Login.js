import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import linkedState from '@src/utils/LinkedState';
import { ScreenContent } from '@src/components/layout';
import { Input } from '@src/components/ui';

import './auth.scss';

@linkedState(['email', 'password'])
export default class Login extends Component {
    static propTypes = {
        linkState: PropTypes.func.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
        formErrors: PropTypes.object.isRequired,
    };

    handleSubmit = (e) => {
        const { email, password, onSubmit } = this.props;

        onSubmit({ email, password });
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }

    render() {
        const { isAuthenticating, linkState, formErrors } = this.props;

        return (
            <ScreenContent>

                <form className="auth-form">

                    <h3>Log In</h3>

                    <Input
                        {...linkState('email')}
                        placeholder="E-mail"
                        name="email"
                        error={formErrors.email}
                        onKeyPress={this.handleEnter}
                        autoFocus
                    />

                    <Input
                        {...linkState('password')}
                        type="password"
                        placeholder="Password"
                        name="password"
                        error={formErrors.password}
                        onKeyPress={this.handleEnter}
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

            </ScreenContent>
        );
    }
}
