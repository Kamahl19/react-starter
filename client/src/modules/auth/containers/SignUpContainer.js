import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIsAuthenticating, signUp } from '../ducks/authDucks';
import { SignUpForm } from '../components';
import { formValidation } from '@src/utils/form';

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

        this.setState({ formErrors: {} });

        formValidation({ signUpData })
            .then(() => {
                actions.signUp(signUpData);
            }, (err) => {
                this.setState({ formErrors: err.signUpData });
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
