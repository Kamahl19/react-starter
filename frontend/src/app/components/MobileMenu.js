import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';

const MobileMenu = ({
  showResponsiveMenu,
  hideResponsiveMenu,
  toggleResponsiveMenu,
  menuContent,
  visible,
  onClick,
  selectedKeys,
}) =>
  <Popover
    overlayClassName="mobile-menu"
    placement="bottomLeft"
    content={[
      <Icon type="close" onClick={hideResponsiveMenu} key="close" />,
      <Menu mode="inline" key="menu" onClick={onClick} selectedKeys={selectedKeys}>
        {menuContent}
      </Menu>,
    ]}
    trigger="click"
    visible={visible}
    onVisibleChange={toggleResponsiveMenu}
  >
    <Icon type="bars" onClick={showResponsiveMenu} />
  </Popover>;

MobileMenu.propTypes = {
  menuContent: PropTypes.node.isRequired,
  showResponsiveMenu: PropTypes.func.isRequired,
  hideResponsiveMenu: PropTypes.func.isRequired,
  toggleResponsiveMenu: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedKeys: PropTypes.array.isRequired,
};

export default MobileMenu;
