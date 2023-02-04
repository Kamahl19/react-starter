import { type ReactNode } from 'react';
import { Space, Typography, Row, Col } from 'antd';
import { css } from '@emotion/react';

import { createStyles, getMQ } from 'common/styleUtils';

export type Props = {
  children?: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  breadcrumbs?: ReactNode;
};

const PageHeader = ({ children, title, extra, breadcrumbs }: Props) => (
  <div css={styles.self}>
    <Space direction="vertical" size={12}>
      {breadcrumbs}
      {(title || extra) && (
        <Row align="middle" justify="space-between">
          {title && (
            <Col>
              <Typography.Title level={4} css={styles.headingTitle}>
                {title}
              </Typography.Title>
            </Col>
          )}
          {extra && <Col>{extra}</Col>}
        </Row>
      )}
      {children}
    </Space>
  </div>
);

export default PageHeader;

const styles = createStyles({
  self: ({ token }) =>
    css({
      padding: token.paddingLG,
      marginTop: -token.marginLG,
      marginInline: -token.marginLG,
      marginBottom: token.marginLG,
      background: token.colorBgContainer,

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

  headingTitle: css({
    '&&': {
      marginBottom: 0,
    },
  }),
});
