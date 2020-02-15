import React, { Component, ReactNode } from 'react';
import MediaQuery from 'react-responsive';

import MobileNavigation from './MobileNavigation';

type Props = {
  children: (state: State) => ReactNode;
  maxWidth: number;
};

export type State = Readonly<{
  isMobile: boolean;
  isNavigationVisible: boolean;
  hideNavigation: VoidFunction;
  showNavigation: VoidFunction;
}>;

function noop() {}

// TODO refactor with hook
class ResponsiveNavigationContainer extends Component<Props, State> {
  static defaultProps = {
    maxWidth: 767,
  };

  readonly state: State = {
    isMobile: false,
    isNavigationVisible: false,
    hideNavigation: noop,
    showNavigation: noop,
  };

  render() {
    const { children, maxWidth } = this.props;

    return (
      <MediaQuery maxWidth={maxWidth}>
        {isMobile =>
          isMobile ? <MobileNavigation>{children}</MobileNavigation> : children(this.state)
        }
      </MediaQuery>
    );
  }
}

export default ResponsiveNavigationContainer;
