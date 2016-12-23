import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formValidation from '@src/utils/formValidation';
import { getIsAuthenticating, signUp } from '../ducks/authDucks';
import { SignUpForm } from '../components';
import { signUpSchema } from '../schema/authSchema';

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

    onSubmit = (userData) => {
        const { actions } = this.props;

        this.setState({ formErrors: {} });

        formValidation(signUpSchema, userData)
            .then(() => {
                actions.signUp(userData);
            }, (formErrors) => {
                this.setState({ formErrors });
            });
    }

    render() {
        const { isAuthenticating } = this.props;
        const { formErrors } = this.state;

        return (
            <SignUpForm
                formErrors={formErrors}
                isAuthenticating={isAuthenticating}
                onSubmit={this.onSubmit}
            />
        );
    }
}
