import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formValidation from '@src/utils/formValidation';
import { forgottenPassword } from '../ducks/authDucks';
import { ForgottenPasswordForm } from '../components';
import { forgottenPasswordSchema } from '../schema/authSchema';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ forgottenPassword }, dispatch),
});

@connect(undefined, mapDispatchToProps)
export default class ForgottenPasswordFormContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    state = {
        formErrors: {},
    };

    onSubmit = (email) => {
        const { actions } = this.props;

        this.setState({ formErrors: {} });

        formValidation(forgottenPasswordSchema, email)
            .then(() => {
                actions.forgottenPassword(email);
            }, (formErrors) => {
                this.setState({ formErrors });
            });
    }

    render() {
        const { formErrors } = this.state;

        return (
            <ForgottenPasswordForm
                formErrors={formErrors}
                onSubmit={this.onSubmit}
            />
        );
    }
}
