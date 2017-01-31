import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import linkedState from '@src/common/utils/LinkedState';
import { Input } from '@src/common/components/inputs';

@linkedState(['name', 'email', 'password', 'repeatPassword'])
export default class SignUpForm extends Component {
  static propTypes = {
    linkState: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    repeatPassword: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    formErrors: PropTypes.object.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, repeatPassword, onSubmit } = this.props;

    onSubmit({ name, email, password, repeatPassword });
  }

  render() {
    const { isAuthenticating, linkState, formErrors } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>

        <h3>Sign Up</h3>

        <Input
          {...linkState('name')}
          label="Name"
          placeholder="Name"
          name="name"
          error={formErrors.name}
          autoFocus
        />

        <Input
          {...linkState('email')}
          label="E-mail"
          placeholder="E-mail"
          name="email"
          error={formErrors.email}
        />

        <Input
          {...linkState('password')}
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          error={formErrors.password}
        />

        <Input
          {...linkState('repeatPassword')}
          type="password"
          label="Repeat Password"
          placeholder="Repeat Password"
          name="repeatPassword"
          error={formErrors.repeatPassword}
        />

        <Button
          type="submit"
          onClick={this.handleSubmit}
          disabled={isAuthenticating}
          bsStyle="primary"
        >
          Sign Up
        </Button>

      </form>
    );
  }
}
