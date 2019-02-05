import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import ResponsiveNavigation from '../../../../packages/responsive-navigation';
import { Footer, Icon, Layout, Menu, Popover } from '../../../../common/components';

import { ROUTE_PATHS } from '../../routes';

const PageLayout = ({ children }) => (
  <Layout>
    <Layout.Header>
      <ResponsiveNavigation>
        {({ activePath, hideNavigation, showNavigation, isNavigationVisible, isMobile }) => {
          const menu = (
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              theme={isMobile ? undefined : 'dark'}
              selectedKeys={[activePath]}
            >
              <Menu.Item>
                <Link to={ROUTE_PATHS.signUp}>
                  <Trans i18nKey="nav.signup">Sign Up</Trans>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={ROUTE_PATHS.login}>
                  <Trans i18nKey="nav.login">Log In</Trans>
                </Link>
              </Menu.Item>
            </Menu>
          );

          return isMobile ? (
            <Popover
              content={menu}
              onVisibleChange={visible => (visible ? showNavigation() : hideNavigation())}
              title={<Icon type="close" onClick={hideNavigation} />}
              trigger="click"
              visible={isNavigationVisible}
            >
              <Icon type="bars" style={{ color: '#fff' }} />
            </Popover>
          ) : (
            menu
          );
        }}
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
