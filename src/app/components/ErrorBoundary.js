import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error) {
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? (
      <div className="container">
        <h1>Unexpected Error</h1>
        <p>
          <a href="/">Reload</a>
        </p>
      </div>
    ) : (
      children
    );
  }
}
