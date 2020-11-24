import { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Popover, Menu } from 'antd';
import { responsiveMap } from 'antd/lib/_util/responsiveObserve';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

type Props = {
  children: ReactNode;
};

const Navbar = ({ children }: Props) => {
  const { pathname } = useLocation();

  return useMediaQuery({ query: responsiveMap.md }) ? (
    <Menu className="navbar-menu" mode="horizontal" selectedKeys={[pathname]}>
      {children}
    </Menu>
  ) : (
    <HamburgerMenu>{children}</HamburgerMenu>
  );
};

export default Navbar;

const HamburgerMenu = ({ children }: Props) => {
  const { pathname } = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  return (
    <Popover
      content={
        <Menu className="navbar-popover-menu" mode="inline" selectedKeys={[pathname]}>
          {children}
        </Menu>
      }
      overlayClassName="navbar-popover"
      title={<CloseOutlined onClick={() => setIsVisible(false)} />}
      trigger="click"
      visible={isVisible}
      onVisibleChange={setIsVisible}
    >
      <span className="navbar-trigger">
        <MenuOutlined />
      </span>
    </Popover>
  );
};
