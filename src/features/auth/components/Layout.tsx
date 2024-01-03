import { type ReactNode } from 'react';

import Header from './Header';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="flex h-full flex-col">
    <Header />
    <main className="container flex-1 py-4 sm:py-8">{children}</main>
  </div>
);

export default Layout;
