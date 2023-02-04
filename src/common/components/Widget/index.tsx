import { useMemo } from 'react';
import { Card, type CardProps } from 'antd';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { Menu } from 'common/components';
import { createStyles, getMQ } from 'common/styleUtils';

type Props = CardProps & {
  menuItems?: {
    to: string;
    label: string;
  }[];
};

const Widget = ({ menuItems, children, ...props }: Props) => {
  const items = useMemo(
    () =>
      menuItems?.map(({ to, label }) => ({
        key: to,
        label: <Link to={to}>{label}</Link>,
      })),
    [menuItems]
  );

  return (
    <Card bordered={false} css={[styles.self, items && styles.withMenu]} {...props}>
      {items && <Menu mode="inline" items={items} theme="light" css={styles.menu} />}
      <div>{children}</div>
    </Card>
  );
};

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
      '.ant-menu-item': {
        marginInline: 0,
        width: 'auto',
      },

      [getMQ(token).mdMin]: {
        width: 220,
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
    }),
});
