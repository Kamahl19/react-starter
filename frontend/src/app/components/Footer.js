import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Layout from 'antd/lib/layout';

const Footer = ({ t }) =>
  <Layout.Footer>
    {t('Footer')}
  </Layout.Footer>;

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(Footer);
