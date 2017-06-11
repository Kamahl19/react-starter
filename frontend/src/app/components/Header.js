import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import { translate } from 'react-i18next';
import { MenuItemLink } from '@src/common/components';
import MobileMenu from './MobileMenu';

@translate()
export default class Header extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    responsiveMenuVisible: PropTypes.bool.isRequired,
    menuMode: PropTypes.string.isRequired,
    showResponsiveMenu: PropTypes.func.isRequired,
    hideResponsiveMenu: PropTypes.func.isRequired,
    toggleResponsiveMenu: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string,
    logout: PropTypes.func.isRequired,
  };

  renderMenuContentAnonymouse() {
    const { t } = this.props;

    return [
      <MenuItemLink to="/auth/sign-up" key="sign-up">
        {t('Sign Up')}
      </MenuItemLink>,
      <MenuItemLink to="/auth/login" key="login">
        {t('Log In')}
      </MenuItemLink>,
    ];
  }

  renderMenuContentUser() {
    const { logout, t, email } = this.props;

    return (
      <Menu.SubMenu title={<span>{t('Hi')} {email}</span>}>
        <MenuItemLink to="/me" key="me">{t('Profile')}</MenuItemLink>
        <Menu.Divider key="divider" />
        <Menu.Item key="logout">
          <Link onClick={logout}>{t('Log Out')}</Link>
        </Menu.Item>
      </Menu.SubMenu>
    );
  }

  renderMenu() {
    const {
      menuMode,
      responsiveMenuVisible,
      showResponsiveMenu,
      hideResponsiveMenu,
      toggleResponsiveMenu,
      isLoggedIn,
    } = this.props;

    const menuContent = isLoggedIn
      ? this.renderMenuContentUser()
      : this.renderMenuContentAnonymouse();

    if (menuMode === 'inline') {
      return (
        <MobileMenu
          menuContent={menuContent}
          showResponsiveMenu={showResponsiveMenu}
          hideResponsiveMenu={hideResponsiveMenu}
          toggleResponsiveMenu={toggleResponsiveMenu}
          visible={responsiveMenuVisible}
        />
      );
    }

    return (
      <Menu mode="horizontal" theme="dark">
        {menuContent}
      </Menu>
    );
  }

  render() {
    const { t } = this.props;

    return (
      <Layout.Header>
        <div className="logo">
          <Link to="/">{t('React Starter')}</Link>
        </div>
        {this.renderMenu()}
      </Layout.Header>
    );
  }
}
