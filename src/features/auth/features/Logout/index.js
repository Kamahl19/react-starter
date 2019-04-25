import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutAction } from 'common/services/user';

const mapDispatchToProps = {
  logout: logoutAction,
};

const LogoutContainer = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return null;
};

LogoutContainer.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(LogoutContainer);
