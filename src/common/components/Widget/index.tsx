import { type ReactNode } from 'react';
import { Card, type CardProps, Typography, Row, Col, Divider } from 'antd';
import { css } from '@emotion/react';

import { Menu, type MenuProps } from '@/common/components';
import { createStyles, getMQ, useBreakpoint } from '@/common/styleUtils';

const Widget = (props: CardProps) => <Card bordered={false} css={styles.self} {...props} />;

const WidgetWithMenu = ({
  children,
  menuItems,
  extra,
  ...props
}: CardProps & {
  menuItems: MenuProps['items'];
  extra?: ReactNode;
}) => {
  const md = useBreakpoint('md');

  return (
    <Widget bordered={false} {...props}>
      <Row justify="space-between" gutter={12} wrap={!md}>
        <Col flex={md ? '220px' : undefined} span={md ? undefined : 24}>
          <Menu mode="inline" items={menuItems} css={styles.menu} />
          {extra}
        </Col>
        <Col span={md ? undefined : 24}>
          {md ? (
            <Divider type="vertical" css={styles.dividerVertical} />
          ) : (
            <Divider type="horizontal" />
          )}
        </Col>
        <Col flex="1">{children}</Col>
      </Row>
    </Widget>
  );
};

const WidgetWithMenuTitle = ({ children, extra }: { children: ReactNode; extra?: ReactNode }) => (
  <Row justify="space-between">
    <Col>
      <Typography.Title level={4}>{children}</Typography.Title>
    </Col>
    {extra && <Col>{extra}</Col>}
  </Row>
);

Widget.WithMenu = WidgetWithMenu;
Widget.WithMenuTitle = WidgetWithMenuTitle;

export default Widget;

const styles = createStyles({
  self: ({ token }) =>
    css({
      [getMQ(token).xsMax]: {
        '.ant-card-head': {
          paddingInline: token.paddingSM,
        },

        '.ant-card-body': {
          padding: token.paddingSM,
        },
      },
    }),

  dividerVertical: css({
    height: '100%',
  }),

  menu: ({ token }) =>
    css({
      '&&&': {
        border: 0,
      },

      '.ant-menu-item': {
        marginInline: 0,
        width: 'auto',
        paddingLeft: `${token.padding}px !important`,

        '&:first-of-type': {
          marginTop: 0,
        },
      },
    }),
});
