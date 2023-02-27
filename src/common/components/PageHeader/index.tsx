import { type ReactNode } from 'react';
import { Space, Typography, Row, Col } from 'antd';
import { css } from '@emotion/react';

import { createStyles, getMQ, useBreakpoint, type Breakpoint } from 'common/styleUtils';
import { Menu, type MenuProps } from 'common/components';

export type Props = {
  children?: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  breadcrumbs: ReactNode;
  menuItems?: MenuProps['items'];
  menuBreakpoint?: Breakpoint;
};

const PageHeader = ({
  children,
  title,
  extra,
  breadcrumbs,
  menuItems,
  menuBreakpoint = 'md',
}: Props) => {
  const { [menuBreakpoint]: isBreakpoint } = useBreakpoint();

  if (!children && !title && !extra && !menuItems) {
    return <div css={styles.onlyBreadcrumbs}>{breadcrumbs}</div>;
  }

  return (
    <div css={[styles.self, menuItems && styles.withMenu]}>
      <Space direction="vertical" size={12} css={styles.space}>
        {breadcrumbs}
        {(title || extra) && (
          <Row align="middle" justify="space-between">
            <Col>
              {title &&
                (typeof title === 'string' ? (
                  <Typography.Title level={4} css={styles.title}>
                    {title}
                  </Typography.Title>
                ) : (
                  title
                ))}
            </Col>
            <Col>{extra}</Col>
          </Row>
        )}
        {children}
        {menuItems && (
          <Menu
            mode={isBreakpoint ? 'horizontal' : 'inline'}
            items={menuItems}
            disabledOverflow
            css={styles.menu}
          />
        )}
      </Space>
    </div>
  );
};

export default PageHeader;

const styles = createStyles({
  self: ({ token }) =>
    css({
      background: token.colorBgContainer,
      padding: token.paddingLG,
      paddingTop: token.paddingMD,
      marginTop: -token.marginLG,
      marginInline: -token.marginLG,
      marginBottom: token.marginLG,

      [getMQ(token).smMax]: {
        padding: token.paddingSM,
        marginTop: -token.marginSM,
        marginInline: -token.marginSM,
        marginBottom: token.marginSM,
      },

      '.ant-descriptions tbody :last-child td': {
        paddingBottom: 0,
      },
    }),

  space: css({
    width: '100%',
  }),

  withMenu: css({
    paddingBottom: 0,
  }),

  title: css({
    '&&': {
      marginBottom: 0,
    },
  }),

  menu: ({ token }) =>
    css({
      '&.ant-menu-horizontal': {
        marginLeft: -token.margin,
        borderBottom: 0,
      },

      '&&.ant-menu-inline': {
        borderInlineEnd: 0,

        '.ant-menu-item': {
          marginInline: 0,
          width: 'auto',
        },
      },
    }),

  onlyBreadcrumbs: ({ token }) =>
    css({
      marginTop: -token.marginLG,
      paddingBlock: token.paddingMD,

      [getMQ(token).smMax]: {
        marginTop: -token.marginSM,
        paddingBlock: token.paddingSM,
      },
    }),
});
