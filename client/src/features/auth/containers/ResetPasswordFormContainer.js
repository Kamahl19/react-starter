import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formValidation from '@src/common/utils/formValidation';
import { resetPassword } from '../ducks/authDucks';
import { ResetPasswordForm } from '../components';
import { resetPasswordSchema } from '../schema/authSchema';

const mapStateToProps = (state, props) => ({
  passwordResetToken: props.params.passwordResetToken,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ resetPassword }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ResetPasswordFormContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    passwordResetToken: PropTypes.string.isRequired,
  };

  state = {
    formErrors: {},
  };

  onSubmit = (resetData) => {
    const { actions, passwordResetToken } = this.props;

    this.setState({ formErrors: {} });

    formValidation(resetPasswordSchema, resetData)
      .then(() => {
        actions.resetPassword({ password: resetData.password, passwordResetToken });
      }, (formErrors) => {
        this.setState({ formErrors });
      });
  }

  render() {
    const { formErrors } = this.state;

    return (
      <ResetPasswordForm
        formErrors={formErrors}
        onSubmit={this.onSubmit}
      />
    );
  }
}
