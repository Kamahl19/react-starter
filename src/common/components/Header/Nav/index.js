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

  handleResponsiveMenuVisibleChange = responsiveMenuVisible => {
    this.setState({ responsiveMenuVisible });
  };

  render() {
    const { children, activePathname, history } = this.props;
    const { responsiveMenuVisible } = this.state;

    return (
      <MediaQuery maxWidth={`${MOBILE_WIDTH}px`}>
        {isMobile =>
          isMobile ? (
            <ResponsiveMenu
              selectedKeys={[activePathname]}
              visible={responsiveMenuVisible}
              history={history}
              onShow={() => this.handleResponsiveMenuVisibleChange(true)}
              onHide={() => this.handleResponsiveMenuVisibleChange(false)}
              onVisibleChange={this.handleResponsiveMenuVisibleChange}
            >
              {children({ isMobile })}
            </ResponsiveMenu>
          ) : (
            <Menu theme="dark" mode="horizontal" selectedKeys={[activePathname]}>
              {children({ isMobile })}
            </Menu>
          )
        }
      </MediaQuery>
    );
  }
}

export default Nav;
