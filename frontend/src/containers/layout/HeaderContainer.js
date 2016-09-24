import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logoutAndRedirect } from '@actions/auth';
import { Header } from '@components/layout';

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutAndRedirect())
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HeaderContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
        logout: PropTypes.func.isRequired,
    };

    render() {
        const { isLoggedIn, user, logout } = this.props;

        const userName = user ? user.name : '';

        return (
            <Header
                isLoggedIn={isLoggedIn}
                userName={userName}
                logout={logout}
            />
        );
    }
}
