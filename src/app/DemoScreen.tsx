import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AUTH_ROUTER_PATHS } from 'features/auth/constants';
import IsLoggedIn from 'features/auth/guards/IsLoggedIn';
import { selectProfile } from 'common/services/user';
import { AppState } from './store';

/**
 * Throw-away component
 * This is just for demo purposes
 */

const mapStateToProps = (state: AppState) => ({
  profile: selectProfile(state),
});

type Props = ReturnType<typeof mapStateToProps>;

const DemoScreen = IsLoggedIn(({ profile }: Props) => (
  <div>
    ID: {profile!.id}
    <br />
    Email: {profile!.email}
    <br />
    <Link to={AUTH_ROUTER_PATHS.logout}>Logout</Link>
  </div>
));

export default connect(mapStateToProps)(DemoScreen);
