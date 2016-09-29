import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '@actions/user';
import { Header } from '@components/layout';

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
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
                logout={actions.logout}
            />
        );
    }
}
