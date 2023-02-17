import { Card, type CardProps } from 'antd';
import { css } from '@emotion/react';

import { Menu, type MenuProps } from 'common/components';
import { createStyles, getMQ } from 'common/styleUtils';

type Props = CardProps & {
  menuItems?: MenuProps['items'];
};

const Widget = ({ menuItems, children, ...props }: Props) => (
  <Card bordered={false} css={[styles.self, menuItems && styles.withMenu]} {...props}>
    {menuItems && <Menu mode="inline" items={menuItems} css={styles.menu} />}
    <div>{children}</div>
  </Card>
);

export default Widget;

const styles = createStyles({
  self: ({ token }) =>
    css({
      '.ant-card-body': {
        [getMQ(token).xsMax]: {
          padding: token.paddingSM,
        },
      },
    }),

  withMenu: ({ token }) =>
    css({
      '.ant-card-body': {
        [getMQ(token).mdMin]: {
          display: 'flex',

          '> :last-child': {
            flex: 1,
          },
        },
      },
    }),

  menu: ({ token }) =>
    css({
      [getMQ(token).mdMin]: {
        width: 220,
        marginLeft: -token.paddingLG,
        marginRight: token.marginSM,
        paddingRight: token.paddingSM,
      },

      [getMQ(token).smMax]: {
        marginBottom: token.marginSM,
        paddingBottom: token.paddingSM,
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`, // TODO use Menu.colorActiveBarBorderSize once it's exported from Ant

        '&&&': {
          borderRight: 0,
        },
      },

      '.ant-menu-item': {
        marginInline: 0,
        width: 'auto',

        '&:first-of-type': {
          marginTop: 0,
        },

        [getMQ(token).mdMin]: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      },
    }),
});
