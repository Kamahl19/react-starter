import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '@actions/auth';
import { ScreenContent } from '@components/layout';
import LoginForm from './LoginForm';

// TODO - move to containers

const mapStateToProps = (state, ownProps) => ({
    isAuthenticating: state.auth.isAuthenticating,
    queryNext: ownProps.location.query.next,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loginUser }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
    static propTypes = {
        isAuthenticating: PropTypes.bool.isRequired,
        queryNext: PropTypes.string,
        actions: PropTypes.object.isRequired,
    };

    onLoginClick = (credentials) => {
        const { actions, queryNext } = this.props;

        actions.loginUser(credentials, queryNext);
    }

    render() {
        const { isAuthenticating } = this.props;

        return (
            <ScreenContent>

                <LoginForm
                    isAuthenticating={isAuthenticating}
                    onLoginClick={this.onLoginClick}
                />

            </ScreenContent>
        );
    }
}
