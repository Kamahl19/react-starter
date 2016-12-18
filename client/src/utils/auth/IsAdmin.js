import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getUserIsAdmin, getIsAuthenticating } from '@src/ducks/auth';

export default UserAuthWrapper({
    authSelector: (state) => state,
    predicate: getUserIsAdmin,
    authenticatingSelector: getIsAuthenticating,
    failureRedirectPath: '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsAdmin',
    allowRedirectBack: false,
});
