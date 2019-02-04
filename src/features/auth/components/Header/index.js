import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Header, Icon, Menu, Popover } from '../../../../common/components';

const AuthHeader = () => (
  <Header>
    {({ activePath, hideMenu, showMenu, isMenuVisible, isMobile }) => {
      const menu = (
        <Menu
          mode={isMobile ? 'inline' : 'horizontal'}
          theme={isMobile ? undefined : 'dark'}
          selectedKeys={[activePath]}
        >
          <Menu.Item>
            <Link to="/sign-up">
              <Trans i18nKey="nav.signup">Sign Up</Trans>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">
              <Trans i18nKey="nav.login">Log In</Trans>
            </Link>
          </Menu.Item>
        </Menu>
      );

      return isMobile ? (
        <Popover
          content={menu}
          onVisibleChange={visible => (visible ? showMenu() : hideMenu())}
          title={<Icon type="close" onClick={hideMenu} />}
          trigger="click"
          visible={isMenuVisible}
        >
          <Icon type="bars" theme="outlined" />
        </Popover>
      ) : (
        menu
      );
    }}
  </Header>
);

export default AuthHeader;
