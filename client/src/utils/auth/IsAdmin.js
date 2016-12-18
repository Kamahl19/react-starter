import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getAuth } from '@src/ducks/auth';

export default UserAuthWrapper({
    authSelector: getAuth,
    predicate: (auth) => auth.user && auth.user.isAdmin,
    authenticatingSelector: (auth) => auth.isAuthenticating,
    failureRedirectPath: '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsAdmin',
    allowRedirectBack: false,
});
