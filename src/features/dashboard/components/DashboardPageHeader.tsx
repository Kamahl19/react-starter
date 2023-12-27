import { type ReactNode, type Key } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';

import { DASHBOARD_ROUTES } from '../routes';

const routes = Object.values(DASHBOARD_ROUTES).map(({ absPath: path, Breadcrumb: breadcrumb }) => ({
  path,
  breadcrumb,
}));

type Props = {
  children?: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  menuItems?: { label: ReactNode; key: Key }[];
};

const DashboardPageHeader = ({ children, title, extra, menuItems }: Props) => {
  const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });

  const Breadcrumbs = (
    <ul>
      {breadcrumbs.map((item) => (
        <li key={item.key}>{<Link to={item.match.pathname}>{item.breadcrumb}</Link>}</li>
      ))}
    </ul>
  );

  if (!children && !title && !extra && !menuItems) {
    return <div>{Breadcrumbs}</div>;
  }

  return (
    <div>
      <div>
        {Breadcrumbs}
        {(title || extra) && (
          <>
            <div>{title && (typeof title === 'string' ? <h3>{title}</h3> : title)}</div>
            <div>{extra}</div>
          </>
        )}
        {children}
        {menuItems && (
          <ul>
            {menuItems.map((item) => (
              <li key={item.key}>{item.label}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPageHeader;
