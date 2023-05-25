import { type ReactNode } from 'react';
import { Card, Typography } from 'antd';
import { css } from '@emotion/react';

import { createStyles } from 'common/styleUtils';
import { SpaceVertical } from 'common/components';

type Props = {
  children: ReactNode;
  title: ReactNode;
};

const AuthCard = ({ children, title }: Props) => (
  <Card css={styles.self}>
    <SpaceVertical>
      <Typography.Title level={3}>{title}</Typography.Title>
      {children}
    </SpaceVertical>
  </Card>
);

export default AuthCard;

const styles = createStyles({
  self: css({
    width: '100%',
    maxWidth: 400,
    margin: 'auto',
  }),
});
