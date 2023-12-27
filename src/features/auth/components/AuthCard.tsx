import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: ReactNode;
};

const AuthCard = ({ children, title }: Props) => (
  <div
    style={{
      width: '100%',
      maxWidth: 400,
      margin: 'auto',
    }}
  >
    <h3>{title}</h3>
    {children}
  </div>
);

export default AuthCard;
