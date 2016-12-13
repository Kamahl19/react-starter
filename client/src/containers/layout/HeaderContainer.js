import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '@src/actions/auth';
import { Header } from '@src/components/layout';

const mapStateToProps = ({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
    userName: (auth.user && auth.user.name) || '',
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HeaderContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        userName: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        const { isLoggedIn, userName, actions } = this.props;

        return (
            <Header
                isLoggedIn={isLoggedIn}
                userName={userName}
                logout={actions.logout}
            />
        );
    }
}
