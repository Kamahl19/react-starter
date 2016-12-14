import React, { PropTypes } from 'react';
import { ScreenContent } from '@src/components/layout';

const UserProfile = ({ user }) => (
    <ScreenContent>

        <h1>{user.name}</h1>
        <p>E-mail: {user.email}</p>

    </ScreenContent>
);

UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserProfile;
