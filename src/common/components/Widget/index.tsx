import { type ReactNode } from 'react';
import { Card, Row, Col, Typography, type CardProps } from 'antd';
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

type WidgetHeaderProps = {
  title: ReactNode;
  extra?: ReactNode;
};

const WidgetHeader = ({ title, extra }: WidgetHeaderProps) => (
  <Row justify="space-between" css={styles.widgetHeader}>
    <Col>
      <Typography.Title level={4} css={styles.title}>
        {title}
      </Typography.Title>
    </Col>
    {extra && <Col>{extra}</Col>}
  </Row>
);

Widget.Header = WidgetHeader;

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

  widgetHeader: ({ token }) =>
    css({
      marginBottom: token.marginMD,
    }),

  title: css({
    '&&': {
      marginBottom: 0,
    },
  }),
});
