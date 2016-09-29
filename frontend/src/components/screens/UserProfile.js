import React, { Component, PropTypes } from 'react';
import { ScreenContent } from '@components/layout';

export default class UserProfile extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    render() {
        const { user } = this.props;

        return (
            <ScreenContent>

                <h1>{user.name}</h1>
                <p>E-mail: {user.email}</p>

            </ScreenContent>
        );
    }
}
