import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Popover, Grid, type MenuProps } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

import { Menu } from 'common/components';

type Props = {
  items: Required<MenuProps>['items'];
};

const Navbar = ({ items }: Props) => {
  const { md } = Grid.useBreakpoint();

  return md ? (
    <Menu className="navbar-menu" mode="horizontal" items={items} />
  ) : (
    <HamburgerMenu items={items} />
  );
};

export default Navbar;

const HamburgerMenu = ({ items }: Props) => {
  const { pathname } = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  return (
    <Popover
      content={<Menu className="navbar-popover-menu" mode="inline" items={items} />}
      overlayClassName="navbar-popover"
      title={<CloseOutlined onClick={() => setIsVisible(false)} />}
      trigger="click"
      open={isVisible}
      onVisibleChange={setIsVisible}
    >
      <span className="navbar-trigger">
        <MenuOutlined />
      </span>
    </Popover>
  );
};
