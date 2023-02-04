import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

import { createStyles } from 'common/styleUtils';

import logoImg from './logo.svg';

type Props = {
  to: string;
  className?: string;
};

const Logo = ({ to, className }: Props) => (
  <Link to={to} css={styles.self} className={className}>
    <img src={logoImg} alt="Home" />
  </Link>
);

export default Logo;

const styles = createStyles({
  self: css({
    display: 'block',

    img: {
      height: 40,
    },
  }),
});
