import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUser } from '../ducks';
import { UserProfile } from '../components';

const mapStateToProps = state => ({
  user: selectUser(state),
});

const UserProfileContainer = ({ user }) => {
  if (!user) {
    return <div />;
  }

  return <UserProfile user={user} />;
};

UserProfileContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(UserProfileContainer);
