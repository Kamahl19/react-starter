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
      {(breadcrumbs || title || extra) && (
        <Row align="middle" justify="space-between">
          <Col>{breadcrumbs ?? (title && <Title>{title}</Title>)}</Col>
          <Col>{extra}</Col>
        </Row>
      )}
      {breadcrumbs && title && (
        <Row align="middle" justify="space-between">
          <Col>
            <Title>{title}</Title>
          </Col>
        </Row>
      )}
      {children}
    </Space>
  </div>
);

export default PageHeader;

const Title = ({ children }: { children: ReactNode }) => (
  <Typography.Title level={4} css={styles.headingTitle}>
    {children}
  </Typography.Title>
);

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

      '> .ant-space': {
        width: '100%',
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
