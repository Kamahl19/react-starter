import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';

const ResponsiveMenuContainer = ({
  location: { pathname: activePath },
  children,
  history,
  maxWidth,
}) => (
  <MediaQuery maxWidth={maxWidth}>
    {isMobile =>
      isMobile ? (
        <MobileMenu history={history} activePath={activePath}>
          {children}
        </MobileMenu>
      ) : (
        children({ isMobile, activePath })
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

const MobileMenu = ({ activePath, children, history }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  function hideMenu() {
    setIsMenuVisible(false);
  }

  function showMenu() {
    setIsMenuVisible(true);
  }

  useEffect(() => history.listen(hideMenu), []);

  return children({
    activePath,
    hideMenu,
    showMenu,
    isMobile: true,
    isMenuVisible,
  });
};

MobileMenu.propTypes = {
  activePath: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  maxWidth: PropTypes.number,
};

export default withRouter(ResponsiveMenuContainer);
