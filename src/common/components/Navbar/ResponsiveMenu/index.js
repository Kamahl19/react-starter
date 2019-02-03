import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Icon, Menu, Popover } from '../../';

const ResponsiveMenu = ({ children, history, selectedKeys }) => {
  const [isVisible, setIsVisible] = useState(false);

  function handleHide() {
    setIsVisible(false);
  }

  useEffect(() => history.listen(handleHide), []);

  return (
    <Popover
      placement="bottom"
      trigger="click"
      overlayClassName="responsive-menu"
      visible={isVisible}
      onVisibleChange={setIsVisible}
      title={<Icon type="close" onClick={handleHide} />}
      content={
        <Menu mode="inline" selectedKeys={selectedKeys}>
          {children}
        </Menu>
      }
    >
      <nav>
        <Icon type="bars" theme="outlined" />
      </nav>
    </Popover>
  );
};

ResponsiveMenu.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  selectedKeys: PropTypes.array.isRequired,
};

export default ResponsiveMenu;
