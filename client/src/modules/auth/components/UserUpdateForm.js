import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import linkedState from '@src/utils/LinkedState';
import { Input } from '@src/components/inputs';

@linkedState(['name', 'password', 'repeatPassword'])
export default class UserUpdateForm extends Component {
    static propTypes = {
        linkState: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        repeatPassword: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        formErrors: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { linkSetState, user } = this.props;

        linkSetState({ name: user.name });
    }

    handleSubmit = (e) => {
        const { name, password, repeatPassword, onSubmit } = this.props;

        onSubmit({ name, password, repeatPassword });
    }

    render() {
        const { linkState, formErrors } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Update Profile</h3>

                <Input
                    {...linkState('name')}
                    label="Name"
                    placeholder="Name"
                    name="name"
                    error={formErrors.name}
                    autoFocus
                />

                <Input
                    {...linkState('password')}
                    type="password"
                    label="New Password"
                    placeholder="New Password"
                    name="password"
                    error={formErrors.password}
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
