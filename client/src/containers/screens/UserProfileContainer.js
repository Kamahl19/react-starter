import React, { Component, PropTypes } from 'react';
import { UserContainer } from '@src/containers/screens';
import { UserProfile } from '@src/components/screens';

@UserContainer
export default class UserProfileContainer extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    render() {
        const { user } = this.props;

        return (
            <UserProfile user={user} />
        );
    }
}
