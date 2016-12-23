import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getAuth } from '../ducks/authDucks';

export default UserAuthWrapper({
    authSelector: getAuth,
    predicate: (auth) => auth.user === null,
    authenticatingSelector: (auth) => auth.isAuthenticating,
    failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'LoginWrapper',
    allowRedirectBack: false,
});
