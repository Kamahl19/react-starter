import { type ReactNode } from 'react';
import { Typography, Row, Col } from 'antd';
import { css } from '@emotion/react';

import { createStyles, getMQ, noMargin, type Breakpoint, useBreakpoint } from '@/common/styleUtils';
import { Menu, SpaceVertical, type MenuProps } from '@/common/components';

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
  const isBreakpoint = useBreakpoint(menuBreakpoint);

  if (!children && !title && !extra && !menuItems) {
    return <div css={styles.onlyBreadcrumbs}>{breadcrumbs}</div>;
  }

  return (
    <div css={[styles.self, menuItems && styles.withMenu]}>
      <SpaceVertical size="large">
        {breadcrumbs}
        {(title || extra) && (
          <Row align="middle" justify="space-between">
            <Col>
              {title &&
                (typeof title === 'string' ? (
                  <Typography.Title level={3} css={noMargin}>
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
      </SpaceVertical>
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

  withMenu: css({
    paddingBottom: 0,
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
