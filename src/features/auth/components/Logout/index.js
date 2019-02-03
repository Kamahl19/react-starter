import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';

import { logoutAction } from '../../../../common/services/user';

const mapDispatchToProps = {
  logout: logoutAction,
};

const LogoutContainer = ({ logout }) => {
  useEffect(() => {
    logout();
  }, []);

  return (
    <h1>
      <Trans i18nKey="logout.title">Logging you out...</Trans>
    </h1>
  );
};

LogoutContainer.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(LogoutContainer);
