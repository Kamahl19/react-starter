import { MenuOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';

import { Menu, type MenuProps } from '@/common/components';
import { createStyles, type Breakpoint, useBreakpoint } from '@/common/styleUtils';

import NavbarDropdown from './Dropdown';

type Props = {
  items: MenuProps['items'];
  mobileMenuBreakpoint: Breakpoint;
};

const Navbar = ({ items, mobileMenuBreakpoint }: Props) =>
  useBreakpoint(mobileMenuBreakpoint) ? (
    <Menu mode="horizontal" items={items} disabledOverflow css={styles.self} />
  ) : (
    <NavbarDropdown menu={{ items }} caret={false}>
      <div css={styles.trigger}>
        <MenuOutlined />
      </div>
    </NavbarDropdown>
  );

export default Navbar;

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
