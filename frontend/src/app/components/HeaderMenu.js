import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { ResponsiveMenu } from '../../common/components/hoc';
import MobileMenu from './MobileMenu';

class HeaderMenu extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    menuMode: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string,
    logout: PropTypes.func.isRequired,
  };

  state = {
    responsiveMenuVisible: false,
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen(this.hideResponsiveMenu);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  showResponsiveMenu = () => {
    this.setState({ responsiveMenuVisible: true });
  };

  hideResponsiveMenu = () => {
    this.setState({ responsiveMenuVisible: false });
  };

  toggleResponsiveMenu = responsiveMenuVisible => {
    this.setState({ responsiveMenuVisible });
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

  render() {
    const { t, menuMode, isLoggedIn, email } = this.props;
    const { responsiveMenuVisible } = this.state;

    const menuContent = isLoggedIn ? (
      <Menu.SubMenu
        title={
          <span>
            {t('Hi')} {email}
          </span>
        }
      >
        <Menu.Item key="/me">{t('Profile')}</Menu.Item>
        <Menu.Divider key="divider" />
        <Menu.Item key="logout">{t('Log Out')}</Menu.Item>
      </Menu.SubMenu>
    ) : (
      [
        <Menu.Item key="/auth/sign-up">{t('Sign Up')}</Menu.Item>,
        <Menu.Item key="/auth/login">{t('Log In')}</Menu.Item>,
      ]
    );

    const selectedKeys = this.getSelectedKeys();

    if (menuMode === 'inline') {
      return (
        <MobileMenu
          showResponsiveMenu={this.showResponsiveMenu}
          hideResponsiveMenu={this.hideResponsiveMenu}
          toggleResponsiveMenu={this.toggleResponsiveMenu}
          visible={responsiveMenuVisible}
          onClick={this.onClick}
          selectedKeys={selectedKeys}
        >
          {menuContent}
        </MobileMenu>
      );
    }

    return (
      <Menu mode="horizontal" theme="dark" onClick={this.onClick} selectedKeys={selectedKeys}>
        {menuContent}
      </Menu>
    );
  }
}

export default translate()(withRouter(ResponsiveMenu()(HeaderMenu)));
