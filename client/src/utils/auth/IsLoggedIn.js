import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getIsLoggedIn, getIsAuthenticating } from '@src/ducks/auth';

export default UserAuthWrapper({
    authSelector: (state) => state,
    predicate: getIsLoggedIn,
    authenticatingSelector: getIsAuthenticating,
    failureRedirectPath: '/login',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsLoggedIn',
});
