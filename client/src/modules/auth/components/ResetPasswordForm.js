import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import linkedState from '@src/utils/LinkedState';
import { Input } from '@src/components/inputs';

@linkedState(['password', 'repeatPassword'])
export default class ResetPasswordForm extends Component {
    static propTypes = {
        linkState: PropTypes.func.isRequired,
        password: PropTypes.string.isRequired,
        repeatPassword: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        formErrors: PropTypes.object.isRequired,
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { password, repeatPassword, onSubmit } = this.props;

        onSubmit({ password, repeatPassword });
    }

    render() {
        const { linkState, formErrors } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Reset Password</h3>

                <Input
                    {...linkState('password')}
                    type="password"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    error={formErrors.password}
                    autoFocus
                />

                <Input
                    {...linkState('repeatPassword')}
                    type="password"
                    label="Repeat Password"
                    placeholder="Repeat Password"
                    name="repeatPassword"
                    error={formErrors.repeatPassword}
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
