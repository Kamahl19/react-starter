import { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = Readonly<{
  hasError: boolean;
}>;

export default class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  state = {
    hasError: false,
  };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>
          <h1>Unexpected Error</h1>
          <p>This is a problem on our side, not yours.</p>
          <p>
            <button onClick={() => window.location.reload()}>Reload</button>
          </p>
        </div>
      </div>
    ) : (
      children
    );
  }
}
