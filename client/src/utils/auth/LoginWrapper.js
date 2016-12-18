import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getIsLoggedIn, getIsAuthenticating } from '@src/ducks/auth';

export default UserAuthWrapper({
    authSelector: (state) => state,
    predicate: (state) => !getIsLoggedIn(state),
    authenticatingSelector: getIsAuthenticating,
    failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'LoginWrapper',
    allowRedirectBack: false,
});
