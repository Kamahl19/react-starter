import React, { PropTypes } from 'react';

const UserProfile = ({ user }) => (
  <div>
    <h1>{user.profile.name}</h1>
    <p>E-mail: {user.email}</p>
  </div>
);

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfile;
