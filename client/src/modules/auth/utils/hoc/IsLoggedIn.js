import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getAuth } from '../../ducks/authDucks';

export default UserAuthWrapper({
    authSelector: getAuth,
    predicate: (auth) => auth.user !== null,
    authenticatingSelector: (auth) => auth.isAuthenticating,
    failureRedirectPath: '/auth/login',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsLoggedIn',
});
