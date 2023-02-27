import { type ReactNode, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown, type DropdownProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { css, ClassNames } from '@emotion/react';

import { createStyles, getMQ } from 'common/styleUtils';
import { createMenuProps, type MenuProps } from 'common/components';

type Props = Omit<DropdownProps, 'children' | 'menu' | 'open' | 'overlayClassName'> & {
  children: ReactNode;
  menu: MenuProps;
  caret?: boolean;
};

const NavbarDropdown = ({ onOpenChange, menu, caret = true, children, ...props }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      onOpenChange?.(open);
      setIsVisible(open);
    },
    [onOpenChange]
  );

  const { pathname } = useLocation();

  const menuProps = useMemo(
    () =>
      createMenuProps(
        {
          ...menu,
          onClick: (...args) => {
            menu.onClick?.(...args);
            setIsVisible(false);
          },
        },
        pathname
      ),
    [pathname, menu]
  );

  return (
    <ClassNames>
      {({ css, theme: { token } }) => (
        <Dropdown
          trigger={['click']}
          {...props}
          css={styles.dropdown}
          menu={menuProps}
          onOpenChange={handleOpenChange}
          open={isVisible}
          overlayClassName={css({
            [getMQ(token).smMax]: {
              width: '100vw',

              '.ant-dropdown-menu': {
                borderRadius: 0,
              },

              '&& .ant-dropdown-menu-item': {
                paddingBlock: token.paddingSM,
              },
            },
          })}
        >
          <div>
            {children}
            {caret && <DownOutlined css={styles.caret} />}
          </div>
        </Dropdown>
      )}
    </ClassNames>
  );
};

export default NavbarDropdown;

const styles = createStyles({
  dropdown: css({
    cursor: 'pointer',
  }),

  caret: ({ token }) =>
    css({
      paddingLeft: token.paddingXS,
      fontSize: token.fontSizeIcon,
      color: token.colorIcon,
    }),
});
