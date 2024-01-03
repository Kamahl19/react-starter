import { type ReactNode } from 'react';

import Header from './Header';

type Props = {
  children: ReactNode;
  userEmail: string;
};

const Layout = ({ children, userEmail }: Props) => (
  <div className="flex h-full flex-col">
    <Header userEmail={userEmail} />
    <main className="container flex-1 py-4 sm:py-8">{children}</main>
  </div>
);

export default Layout;
