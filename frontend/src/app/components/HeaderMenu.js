import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Menu from 'antd/lib/menu';

import MobileMenu from './MobileMenu';

class HeaderMenu extends Component {
  static propTypes = {
    email: PropTypes.string,
    history: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
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

  renderMenuContent() {
    const { email, isLoggedIn, t } = this.props;

    return isLoggedIn ? (
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
  }

  render() {
    const { location } = this.props;
    const { responsiveMenuVisible } = this.state;

    return (
      <MediaQuery maxWidth="767px">
        {matches =>
          matches ? (
            <MobileMenu
              hideResponsiveMenu={this.hideResponsiveMenu}
              onClick={this.onClick}
              selectedKeys={[location.pathname]}
              showResponsiveMenu={this.showResponsiveMenu}
              toggleResponsiveMenu={this.toggleResponsiveMenu}
              visible={responsiveMenuVisible}
            >
              {this.renderMenuContent()}
            </MobileMenu>
          ) : (
            <Menu
              mode="horizontal"
              onClick={this.onClick}
              selectedKeys={[location.pathname]}
              theme="dark"
            >
              {this.renderMenuContent()}
            </Menu>
          )
        }
      </MediaQuery>
    );
  }
}

export default translate()(withRouter(HeaderMenu));
