import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Header, Icon, Menu, Popover } from '../../../../common/components';

const AuthHeader = () => (
  <Header>
    {({ activePathname, hide, show, isVisible, isMobile }) => {
      const menu = (
        <Menu
          mode={isMobile ? 'inline' : 'horizontal'}
          theme={isMobile ? undefined : 'dark'}
          selectedKeys={[activePathname]}
        >
          <Menu.Item key="signup">
            <Link to="/sign-up">
              <Trans i18nKey="nav.signup">Sign Up</Trans>
            </Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/login">
              <Trans i18nKey="nav.login">Log In</Trans>
            </Link>
          </Menu.Item>
        </Menu>
      );

      return isMobile ? (
        <Popover
          placement="bottom"
          trigger="click"
          visible={isVisible}
          onVisibleChange={visible => (visible ? show() : hide())}
          title={<Icon type="close" onClick={hide} />}
          content={menu}
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
