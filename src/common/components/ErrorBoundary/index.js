import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ROUTE_PATHS } from '../../../app/Root';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  state = {
    hasError: false,
  };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? (
      <>
        <h1>Unexpected Error</h1>
        <p>This is a problem on our side, not yours.</p>
        <p>
          <a href={ROUTE_PATHS.root}>Reload</a>
        </p>
      </>
    ) : (
      children
    );
  }
}
