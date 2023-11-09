import { type ReactNode, useState, useCallback } from 'react';
import { Dropdown, type DropdownProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { css, ClassNames } from '@emotion/react';

import { createStyles, getMQ } from '@/common/styleUtils';
import { useCreateMenuProps, type MenuProps } from '@/common/components';

type Props = Omit<DropdownProps, 'children' | 'menu' | 'open' | 'overlayClassName'> & {
  children: ReactNode;
  menu: MenuProps;
  caret?: boolean;
};

const NavbarDropdown = ({ onOpenChange, menu, caret = true, children, ...props }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenChange = useCallback<Required<DropdownProps>['onOpenChange']>(
    (open, info) => {
      onOpenChange?.(open, info);
      setIsVisible(open);
    },
    [onOpenChange],
  );

  const menuProps = useCreateMenuProps({
    ...menu,
    onClick: (...args) => {
      menu.onClick?.(...args);
      setIsVisible(false);
    },
  });

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
            minWidth: '100px !important',

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
