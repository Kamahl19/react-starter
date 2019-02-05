import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';

import MobileNavigation from './MobileNavigation';

const ResponsiveNavigationContainer = ({
  children,
  history,
  location: { pathname: activePath },
  maxWidth,
}) => (
  <MediaQuery maxWidth={maxWidth}>
    {isMobile =>
      isMobile ? (
        <MobileNavigation history={history} activePath={activePath}>
          {children}
        </MobileNavigation>
      ) : (
        children({ isMobile, activePath })
      )
    }
  </MediaQuery>
);

ResponsiveNavigationContainer.propTypes = {
  children: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  maxWidth: PropTypes.number.isRequired,
};

ResponsiveNavigationContainer.defaultProps = {
  maxWidth: 767,
};

export default withRouter(ResponsiveNavigationContainer);
