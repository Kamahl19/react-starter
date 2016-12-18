import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIsAuthenticating } from '@src/ducks/auth';
import { signUp } from '@src/ducks/auth';
import { SignUp } from '@src/components/screens';
import formValidation from '@src/utils/form/formValidation';

const mapStateToProps = (state) => ({
    isAuthenticating: getIsAuthenticating(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ signUp }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SignUpContainer extends Component {
    static propTypes = {
        isAuthenticating: PropTypes.bool.isRequired,
        actions: PropTypes.object.isRequired,
    };

    state = {
        formErrors: {},
    };

    onSubmit = (signUpData) => {
        const { actions } = this.props;

        formValidation({ signUpData })
            .then(() => actions.signUp(signUpData))
            .catch((formErrors) => this.setState({ formErrors }));
    }

    render() {
        const { isAuthenticating } = this.props;
        const { formErrors } = this.state;

        return (
            <SignUp
                formErrors={formErrors}
                isAuthenticating={isAuthenticating}
                onSubmit={this.onSubmit}
            />
        );
    }
}
