import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';

const MobileMenu = ({
  hideResponsiveMenu,
  children,
  onClick,
  selectedKeys,
  showResponsiveMenu,
  toggleResponsiveMenu,
  visible,
}) => (
  <Popover
    content={[
      <Icon type="close" onClick={hideResponsiveMenu} key="close" />,
      <Menu mode="inline" key="menu" onClick={onClick} selectedKeys={selectedKeys}>
        {children}
      </Menu>,
    ]}
    onVisibleChange={toggleResponsiveMenu}
    overlayClassName="mobile-menu"
    placement="bottomLeft"
    trigger="click"
    visible={visible}
  >
    <Icon onClick={showResponsiveMenu} type="bars" />
  </Popover>
);

MobileMenu.propTypes = {
  hideResponsiveMenu: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedKeys: PropTypes.array.isRequired,
  showResponsiveMenu: PropTypes.func.isRequired,
  toggleResponsiveMenu: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default MobileMenu;
