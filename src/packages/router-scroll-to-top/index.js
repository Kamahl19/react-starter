import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const RouterScrollToTop = ({ children, location }) => {
  useEffect(() => window.scrollTo(0, 0), [location]);

  return children;
};

RouterScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(RouterScrollToTop);
