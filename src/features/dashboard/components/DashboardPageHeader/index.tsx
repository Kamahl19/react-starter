import { Breadcrumb } from 'antd';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';

import { PageHeader, type PageHeaderProps } from 'common/components';

import { DASHBOARD_ROUTES } from '../../routes';

const routes = Object.values(DASHBOARD_ROUTES).map(({ absPath: path, Breadcrumb: breadcrumb }) => ({
  path,
  breadcrumb,
}));

type Props = Omit<PageHeaderProps, 'breadcrumbs'>;

const DashboardPageHeader = (props: Props) => {
  const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });

  return (
    <PageHeader
      {...props}
      breadcrumbs={
        <Breadcrumb>
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <Breadcrumb.Item key={match.pathname}>
              <Link to={match.pathname}>{breadcrumb}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      }
    />
  );
};

export default DashboardPageHeader;
