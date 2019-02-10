import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import ResponsiveNavigation from '../../../../packages/responsive-navigation';

import { Footer, Icon, Layout, Menu, Popover } from '../../../../common/components';

import { AUTH_ROUTER_PATHS } from '../../constants';

const PageLayout = ({ children }) => (
  <Layout>
    <Layout.Header>
      <ResponsiveNavigation>
        {({ activePath, hideNavigation, showNavigation, isNavigationVisible, isMobile }) =>
          isMobile ? (
            <Popover
              content={<Navigation activePath={activePath} isMobile />}
              onVisibleChange={visible => (visible ? showNavigation() : hideNavigation())}
              title={<Icon type="close" onClick={hideNavigation} />}
              trigger="click"
              visible={isNavigationVisible}
            >
              <Icon type="bars" style={{ color: '#fff' }} />
            </Popover>
          ) : (
            <Navigation activePath={activePath} />
          )
        }
      </ResponsiveNavigation>
    </Layout.Header>
    <Layout.Content>{children}</Layout.Content>
    <Footer />
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;

const Navigation = ({ activePath, isMobile }) => (
  <Menu
    mode={isMobile ? 'inline' : 'horizontal'}
    theme={isMobile ? undefined : 'dark'}
    selectedKeys={[activePath]}
  >
    <Menu.Item>
      <Link to={AUTH_ROUTER_PATHS.signUp}>
        <Trans i18nKey="nav.signup">Sign Up</Trans>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={AUTH_ROUTER_PATHS.login}>
        <Trans i18nKey="nav.login">Log In</Trans>
      </Link>
    </Menu.Item>
  </Menu>
);

Navigation.propTypes = {
  activePath: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
};
