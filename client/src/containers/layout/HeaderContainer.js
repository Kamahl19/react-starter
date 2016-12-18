import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIsLoggedIn, getUserName, logout } from '@src/ducks/auth';
import { Header } from '@src/components/layout';

const HeaderContainer = ({ isLoggedIn, userName, actions }) => (
    <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        logout={actions.logout}
    />
);

HeaderContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    isLoggedIn: getIsLoggedIn(state),
    userName: getUserName(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
