import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown, type MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ClassNames, css } from '@emotion/react';

import { Menu } from 'common/components';
import { createStyles, useBreakpoint, type Breakpoint } from 'common/styleUtils';

type Items = Required<MenuProps>['items'];

type Props = {
  items: Items;
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
  items: Items;
};

const MobileMenu = ({ items }: MobileMenuProps) => {
  const { pathname } = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(false), [pathname]);

  return (
    <ClassNames>
      {({ css, theme: { token } }) => (
        <Dropdown
          menu={{ items }}
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
