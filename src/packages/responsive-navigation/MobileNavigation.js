import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MobileNavigation = ({ activePath, children, history }) => {
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  function hideNavigation() {
    setIsNavigationVisible(false);
  }

  function showNavigation() {
    setIsNavigationVisible(true);
  }

  useEffect(() => history.listen(hideNavigation), [history]);

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
};

export default MobileNavigation;
