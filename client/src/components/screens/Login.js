import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import linkedState from '@src/utils/LinkedState';
import formValidation from '@src/utils/formValidation';
import { ScreenContent } from '@src/components/layout';
import { Input } from '@src/components/ui/inputs';

@linkedState(['email', 'password'])
export default class Login extends Component {
    static propTypes = {
        linkState: PropTypes.func.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        onLoginClick: PropTypes.func.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
    };

    state = {
        formErrors: {},
    };

    handleLoginClick = (e) => {
        e.preventDefault();

        const { email, password, onLoginClick } = this.props;

        const formData = { email, password };

        return formValidation({ loginCredentials: formData })
                .then(() => onLoginClick(formData))
                .catch((formErrors) => this.setState({ formErrors }));
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            this.handleLoginClick(e);
        }
    }

    render() {
        const { isAuthenticating, linkState } = this.props;
        const { formErrors } = this.state;

        return (
            <ScreenContent>

                <div style={{ width: 350, margin: '0 auto' }}>

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
                        onClick={this.handleLoginClick}
                        disabled={isAuthenticating}
                        bsStyle="primary"
                    >
                        Log In
                    </Button>

                </div>

            </ScreenContent>
        );
    }
}
