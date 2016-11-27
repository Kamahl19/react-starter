import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Home } from '@src/components/screens';

const mapStateToProps = (state) => ({
    user: state.user.user,
    isLoggedIn: state.user.isLoggedIn,
});

@connect(mapStateToProps)
export default class HomeContainer extends Component {
    static propTypes = {
        user: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
    };

    render() {
        const { user, isLoggedIn } = this.props;

        const userName = isLoggedIn ? user.name : 'visitor';

        return (
            <Home userName={userName} />
        );
    }
}
