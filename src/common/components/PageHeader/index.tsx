import { type ReactNode } from 'react';
import { Space, Typography, Row, Col } from 'antd';
import { css } from '@emotion/react';

import { createStyles, getMQ } from 'common/styleUtils';

export type Props = {
  children?: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  breadcrumbs: ReactNode;
};

const PageHeader = ({ children, title, extra, breadcrumbs }: Props) => {
  if (!children && !title && !extra) {
    return <div css={styles.onlyBreadcrumbs}>{breadcrumbs}</div>;
  }

  return (
    <div css={styles.self}>
      <Space direction="vertical" size={12} css={styles.space}>
        {breadcrumbs}
        {(title || extra) && (
          <Row align="middle" justify="space-between">
            <Col>
              {title && (
                <Typography.Title level={4} css={styles.title}>
                  {title}
                </Typography.Title>
              )}
            </Col>
            <Col>{extra}</Col>
          </Row>
        )}
        {children}
      </Space>
    </div>
  );
};

export default PageHeader;

const styles = createStyles({
  onlyBreadcrumbs: ({ token }) =>
    css({
      marginTop: -token.marginLG,
      paddingBlock: token.paddingMD,

      [getMQ(token).smMax]: {
        marginTop: -token.marginSM,
        paddingBlock: token.paddingSM,
      },
    }),

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

  title: css({
    '&&': {
      marginBottom: 0,
    },
  }),
});
