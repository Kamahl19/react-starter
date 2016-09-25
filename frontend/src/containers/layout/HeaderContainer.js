import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAndRedirect } from '@actions/auth';
import { Header } from '@components/layout';

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ logoutAndRedirect }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HeaderContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
        actions: PropTypes.object.isRequired,
    };

    render() {
        const { isLoggedIn, user, actions } = this.props;

        const userName = user ? user.name : '';

        return (
            <Header
                isLoggedIn={isLoggedIn}
                userName={userName}
                logout={actions.logoutAndRedirect}
            />
        );
    }
}
