import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { loginUser } from '@actions/auth';
import { Login } from '@components/auth';

const mapStateToProps = (state, ownProps) => ({
    isAuthenticating: state.auth.isAuthenticating,
    queryNext: ownProps.location.query.next,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loginUser }, dispatch),
    dispatch,
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginContainer extends Component {
    static propTypes = {
        isAuthenticating: PropTypes.bool.isRequired,
        queryNext: PropTypes.string,
        actions: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    onLoginClick = (credentials) => {
        const { actions, queryNext, dispatch } = this.props;

        actions.loginUser(credentials).then(() => {
            if (queryNext) {
                dispatch(push(queryNext));
            }
        });
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
