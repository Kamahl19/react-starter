import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const NotFound = ({ t }) => (
  <div>
    <h1>404</h1>
    <p>{t('Page not found')}</p>
  </div>
);

NotFound.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(NotFound);
