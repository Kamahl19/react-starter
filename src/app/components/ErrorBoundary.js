import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? (
      <>
        <h1>Unexpected Error</h1>
        <p>This is a problem on our side, not yours.</p>
        <p>
          <a href="/">Reload</a>
        </p>
      </>
    ) : (
      children
    );
  }
}
