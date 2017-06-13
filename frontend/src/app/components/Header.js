import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import { translate } from 'react-i18next';
import MobileMenu from './MobileMenu';

@withRouter
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
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  onClick = e => {
    const { history, logout } = this.props;

    if (e.key === 'logout') {
      logout();
      return;
    }

    history.push(e.key);
  };

  getSelectedKeys() {
    return [this.props.location.pathname];
  }

  renderMenuContentAnonymouse() {
    const { t } = this.props;

    return [
      <Menu.Item key="/auth/sign-up">
        {t('Sign Up')}
      </Menu.Item>,
      <Menu.Item key="/auth/login">
        {t('Log In')}
      </Menu.Item>,
    ];
  }

  renderMenuContentUser() {
    const { t, email } = this.props;

    return (
      <Menu.SubMenu title={<span>{t('Hi')} {email}</span>}>
        <Menu.Item key="/me">{t('Profile')}</Menu.Item>
        <Menu.Divider key="divider" />
        <Menu.Item key="logout">{t('Log Out')}</Menu.Item>
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

    const selectedKeys = this.getSelectedKeys();

    if (menuMode === 'inline') {
      return (
        <MobileMenu
          menuContent={menuContent}
          showResponsiveMenu={showResponsiveMenu}
          hideResponsiveMenu={hideResponsiveMenu}
          toggleResponsiveMenu={toggleResponsiveMenu}
          visible={responsiveMenuVisible}
          onClick={this.onClick}
          selectedKeys={selectedKeys}
        />
      );
    }

    return (
      <Menu mode="horizontal" theme="dark" onClick={this.onClick} selectedKeys={selectedKeys}>
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
