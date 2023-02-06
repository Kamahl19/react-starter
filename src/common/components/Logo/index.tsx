import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

import logoSmall from './logo-small.svg';
import logoLarge from './logo-large.svg';

type Props = {
  to: string;
  className?: string;
  isSmall?: boolean;
  inverted?: boolean;
};

const Logo = ({ to, className, isSmall, inverted }: Props) => (
  <Link to={to} css={[styles.self, inverted && styles.inverted]} className={className}>
    <img src={isSmall ? logoSmall : logoLarge} alt="Home" />
  </Link>
);

export default Logo;

const styles = {
  self: css({
    display: 'block',

    img: {
      height: 40,
    },
  }),

  inverted: css({
    img: {
      filter: 'invert(100%)',
    },
  }),
};
