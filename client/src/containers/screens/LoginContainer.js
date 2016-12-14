import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isAuthenticatingSelector } from '@src/redux/selectors';
import { loginUser } from '@src/actions/auth';
import { Login } from '@src/components/screens';
import formValidation from '@src/utils/formValidation';

const mapStateToProps = (state) => ({
    isAuthenticating: isAuthenticatingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loginUser }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginContainer extends Component {
    static propTypes = {
        isAuthenticating: PropTypes.bool.isRequired,
        actions: PropTypes.object.isRequired,
    };

    state = {
        formErrors: {},
    };

    onSubmit = (loginCredentials) => {
        const { actions } = this.props;

        formValidation({ loginCredentials })
            .then(() => actions.loginUser(loginCredentials))
            .catch((formErrors) => this.setState({ formErrors }));
    }

    render() {
        const { isAuthenticating } = this.props;
        const { formErrors } = this.state;

        return (
            <Login
                isAuthenticating={isAuthenticating}
                formErrors={formErrors}
                onSubmit={this.onSubmit}
            />
        );
    }
}
