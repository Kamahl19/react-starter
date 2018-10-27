import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import { Menu } from '../../';

import ResponsiveMenu from './ResponsiveMenu';

const MOBILE_WIDTH = 991;

class Nav extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    activePathname: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    responsiveMenuVisible: false,
  };

  onChangeResponsiveMenuVisible = responsiveMenuVisible => {
    this.setState({ responsiveMenuVisible });
  };

  render() {
    const { children, activePathname, history } = this.props;

    return (
      <MediaQuery maxWidth={`${MOBILE_WIDTH}px`}>
        {isMobile =>
          isMobile ? (
            <ResponsiveMenu
              selectedKeys={[activePathname]}
              visible={this.state.responsiveMenuVisible}
              history={history}
              showResponsiveMenu={() => this.onChangeResponsiveMenuVisible(true)}
              hideResponsiveMenu={() => this.onChangeResponsiveMenuVisible(false)}
              toggleResponsiveMenu={this.onChangeResponsiveMenuVisible}
            >
              {children({ isMobile })}
            </ResponsiveMenu>
          ) : (
            <Menu
              mode="horizontal"
              theme="dark"
              selectedKeys={[activePathname]}
              onClick={this.handleClick}
            >
              {children({ isMobile })}
            </Menu>
          )
        }
      </MediaQuery>
    );
  }
}

export default Nav;
