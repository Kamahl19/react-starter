import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';

const ResponsiveMenuContainer = ({
  location: { pathname: activePathname },
  children,
  history,
  maxWidth,
}) => (
  <MediaQuery maxWidth={maxWidth}>
    {isMobile =>
      isMobile ? (
        <MobileMenu history={history} activePathname={activePathname}>
          {children}
        </MobileMenu>
      ) : (
        children({ isMobile, activePathname })
      )
    }
  </MediaQuery>
);

ResponsiveMenuContainer.propTypes = {
  children: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  maxWidth: PropTypes.number,
};

ResponsiveMenuContainer.defaultProps = {
  maxWidth: 767,
};

const MobileMenu = ({ activePathname, children, history }) => {
  const [isVisible, setIsVisible] = useState(false);

  function hide() {
    setIsVisible(false);
  }

  function show() {
    setIsVisible(true);
  }

  useEffect(() => history.listen(hide), []);

  return children({
    activePathname,
    hide,
    show,
    isMobile: true,
    isVisible,
  });
};

MobileMenu.propTypes = {
  activePathname: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  maxWidth: PropTypes.number,
};

export default withRouter(ResponsiveMenuContainer);
