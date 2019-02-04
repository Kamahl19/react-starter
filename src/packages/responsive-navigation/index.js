import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';

const ResponsiveNavigationContainer = ({
  location: { pathname: activePath },
  children,
  history,
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
  maxWidth: PropTypes.number,
};

ResponsiveNavigationContainer.defaultProps = {
  maxWidth: 767,
};

const MobileNavigation = ({ activePath, children, history }) => {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  function hideNavigation() {
    setIsNavigationVisible(false);
  }

  function showNavigation() {
    setIsNavigationVisible(true);
  }

  useEffect(() => history.listen(hideNavigation), []);

  return children({
    activePath,
    hideNavigation,
    showNavigation,
    isMobile: true,
    isNavigationVisible,
  });
};

MobileNavigation.propTypes = {
  activePath: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  maxWidth: PropTypes.number,
};

export default withRouter(ResponsiveNavigationContainer);
