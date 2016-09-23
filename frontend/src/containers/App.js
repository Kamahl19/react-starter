import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import { MainWrapper } from '@components/layout';
import { loginUserSuccess, fetchUser } from '@actions/auth';
import { isTokenValid } from '@utils/authHelpers';

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    queryNext: ownProps.location.query.next,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ fetchUser }, dispatch),
    dispatch,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
        queryNext: PropTypes.string,
        actions: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const token = localStorage.getItem(window.tokenName);

        if (isTokenValid(token)) {
            const { actions } = this.props;

            const decoded = jwtDecode(token);

            const { userId } = decoded;

            actions.fetchUser(token, userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { user, isLoggedIn } = nextProps;

        if (user && !isLoggedIn) {
            const { dispatch, queryNext } = nextProps;

            const token = localStorage.getItem(window.tokenName);

            dispatch(loginUserSuccess(token, user));

            dispatch(push(queryNext || '/'));
        }
    }

    render() {
        const { children } = this.props;

        return (
            <MainWrapper>
                {children}
            </MainWrapper>
        );
    }
}
