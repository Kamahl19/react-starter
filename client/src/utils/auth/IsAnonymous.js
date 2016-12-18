import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getIsLoggedIn, getIsAuthenticating } from '@src/ducks/auth';

export default UserAuthWrapper({
    authSelector: (state) => state,
    predicate: (state) => !getIsLoggedIn(state),
    authenticatingSelector: getIsAuthenticating,
    failureRedirectPath: '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsAnonymous',
    allowRedirectBack: false,
});
