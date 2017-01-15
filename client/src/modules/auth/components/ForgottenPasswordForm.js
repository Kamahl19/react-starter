import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import linkedState from '@src/utils/LinkedState';
import { Input } from '@src/components/inputs';

import './auth.scss';

@linkedState(['email'])
export default class ForgottenPasswordForm extends Component {
    static propTypes = {
        linkState: PropTypes.func.isRequired,
        email: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        formErrors: PropTypes.object.isRequired,
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, onSubmit } = this.props;

        onSubmit({ email });
    }

    render() {
        const { linkState, formErrors } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Forgotten Password</h3>

                <p>Enter your E-mail and we will send you a password reset link.</p>

                <Input
                    {...linkState('email')}
                    label="E-mail"
                    placeholder="E-mail"
                    name="email"
                    error={formErrors.email}
                    autoFocus
                />

                <Button
                    type="submit"
                    onClick={this.handleSubmit}
                    bsStyle="primary"
                >
                    Submit
                </Button>

            </form>
        );
    }
}
