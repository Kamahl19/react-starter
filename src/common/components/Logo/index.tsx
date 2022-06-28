import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: string;
  size: 'small' | 'large';
  inverted?: boolean;
  style?: CSSProperties;
};

const Logo = ({ to, size, inverted, style }: Props) => {
  return (
    <h1 style={style} className={cn('logo', { 'logo-inverted': inverted })}>
      <Link to={to}>{size === 'small' ? 'RS' : 'React Starter'}</Link>
    </h1>
  );
};

export default Logo;
