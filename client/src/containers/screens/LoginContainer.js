import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import { loginUser } from '@src/actions/user';
import { Login } from '@src/components/screens';

const mapStateToProps = (state, ownProps) => ({
    isAuthenticating: state.user.isAuthenticating,
    isLoggedIn: state.user.isLoggedIn,
    redirect: ownProps.location.query.redirect || '/',
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loginUser }, dispatch),
    dispatch,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginContainer extends Component {
    static propTypes = {
        isAuthenticating: PropTypes.bool.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        actions: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        redirect: PropTypes.string.isRequired,
    };

    componentWillMount() {
        const { isLoggedIn, dispatch, redirect } = this.props;

        if (isLoggedIn) {
            dispatch(replace(redirect));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isLoggedIn, dispatch, redirect } = nextProps;
        const { isLoggedIn: wasLoggedIn } = this.props;

        if (!wasLoggedIn && isLoggedIn) {
            dispatch(replace(redirect));
        }
    }

    onLoginClick = (credentials) => {
        const { actions } = this.props;

        actions.loginUser(credentials);
    }

    render() {
        const { isAuthenticating } = this.props;

        return (
            <Login
                isAuthenticating={isAuthenticating}
                onLoginClick={this.onLoginClick}
            />
        );
    }
}
