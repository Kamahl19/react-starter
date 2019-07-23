import React, { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  readonly hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  readonly state = {
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
          <span onClick={() => window.location.reload()}>Reload</span>
        </p>
      </>
    ) : (
      children
    );
  }
}
