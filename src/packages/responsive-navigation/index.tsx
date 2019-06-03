import React, { ReactElement } from 'react';
import MediaQuery from 'react-responsive';

import MobileNavigation from './MobileNavigation';

export type InjectedProps = {
  hideNavigation: VoidFunction;
  isMobile: boolean;
  isNavigationVisible?: boolean;
  showNavigation: VoidFunction;
};

type Props = {
  children: (props: InjectedProps) => ReactElement;
  maxWidth: number;
};

const noop = () => {};

const ResponsiveNavigationContainer = ({ children, maxWidth }: Props) => (
  <MediaQuery maxWidth={maxWidth}>
    {isMobile =>
      isMobile ? (
        <MobileNavigation>{children}</MobileNavigation>
      ) : (
        children({
          isMobile: false,
          hideNavigation: noop,
          showNavigation: noop,
        })
      )
    }
  </MediaQuery>
);

ResponsiveNavigationContainer.defaultProps = {
  maxWidth: 767,
};

export default ResponsiveNavigationContainer;
