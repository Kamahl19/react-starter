import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Layout from 'antd/lib/layout';
import { translate } from 'react-i18next';

const Header = ({ t, children }) =>
  <Layout.Header>
    <div className="logo">
      <Link to="/">
        {t('React Starter')}
      </Link>
    </div>
    {children}
  </Layout.Header>;

Header.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default translate()(Header);
