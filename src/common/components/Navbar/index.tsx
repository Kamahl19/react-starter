import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ClassNames, css } from '@emotion/react';

import { createMenuProps, Menu, type MenuProps } from 'common/components';
import { createStyles, useBreakpoint, type Breakpoint } from 'common/styleUtils';

type Props = {
  items: MenuProps['items'];
  mobileMenuBreakpoint: Breakpoint;
};

const Navbar = ({ items, mobileMenuBreakpoint }: Props) =>
  useBreakpoint()[mobileMenuBreakpoint] ? (
    <Menu mode="horizontal" items={items} disabledOverflow css={styles.self} />
  ) : (
    <MobileMenu items={items} />
  );

export default Navbar;

type MobileMenuProps = {
  items: MenuProps['items'];
};

const MobileMenu = ({ items }: MobileMenuProps) => {
  const { pathname } = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(false), [pathname]);

  const menuProps = useMemo(() => createMenuProps({ items }, pathname), [items, pathname]);

  return (
    <ClassNames>
      {({ css, theme: { token } }) => (
        <Dropdown
          menu={menuProps}
          trigger={['click']}
          open={isVisible}
          onOpenChange={setIsVisible}
          overlayClassName={css({
            width: '100vw',

            '.ant-dropdown-menu': {
              borderRadius: 0,
            },

            '&& .ant-dropdown-menu-item': {
              paddingBlock: token.paddingSM,
            },
          })}
        >
          <div css={styles.trigger}>
            <MenuOutlined />
          </div>
        </Dropdown>
      )}
    </ClassNames>
  );
};

const styles = createStyles({
  self: css({
    borderBottom: 0,
  }),

  trigger: ({ token }) =>
    css({
      paddingInline: token.paddingMD,
      textAlign: 'center',
      fontSize: 24,
    }),
});
