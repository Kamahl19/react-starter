import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import formValidation from '@utils/formValidation';
import linkedState from '@utils/LinkedState';
import { ScreenContent } from '@components/layout';
import { Input } from '@components/ui/inputs';

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

        const { email, password } = this.props;

        // TODO - move to middleware
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
                        autoFocus
                    />

                    <Input
                        {...linkState('password')}
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

            </ScreenContent>
        );
    }
}
