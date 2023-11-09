import { type ReactNode } from 'react';
import { Card, Typography } from 'antd';
import { css } from '@emotion/react';

import { createStyles } from '@/common/styleUtils';

type Props = {
  children: ReactNode;
  title: ReactNode;
};

const AuthCard = ({ children, title }: Props) => (
  <Card css={styles.self}>
    <Typography.Title level={3}>{title}</Typography.Title>
    {children}
  </Card>
);

export default AuthCard;

const styles = createStyles({
  self: css({
    width: '100%',
    maxWidth: 400,
    margin: 'auto',

    '.ant-result': {
      paddingInline: 0,
    },
  }),
});
