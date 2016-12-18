import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getAuth } from '@src/ducks/auth';

export default UserAuthWrapper({
    authSelector: getAuth,
    predicate: (auth) => auth.user === null,
    authenticatingSelector: (auth) => auth.isAuthenticating,
    failureRedirectPath: '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsAnonymous',
    allowRedirectBack: false,
});
