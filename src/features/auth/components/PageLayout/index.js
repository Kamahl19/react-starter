import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Footer, Header, Icon, Layout, Menu, Popover } from '../../../../common/components';

const PageLayout = ({ children }) => (
  <Layout>
    <Header>
      {({ activePath, hideNavigation, showNavigation, isNavigationVisible, isMobile }) => {
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
            onVisibleChange={visible => (visible ? showNavigation() : hideNavigation())}
            title={<Icon type="close" onClick={hideNavigation} />}
            trigger="click"
            visible={isNavigationVisible}
          >
            <Icon type="bars" />
          </Popover>
        ) : (
          menu
        );
      }}
    </Header>
    <Layout.Content>{children}</Layout.Content>
    <Footer />
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
