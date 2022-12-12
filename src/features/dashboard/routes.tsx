import { HomeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { type BreadcrumbsRoute } from 'use-react-router-breadcrumbs';

/**
 * Routes
 */
export const DASHBOARD_ROUTES = {
  index: {
    path: 'app/*',
    to: '/app',
    absPath: '/app',
    Breadcrumb: () => <HomeOutlined />,
  },
  home: {
    path: 'home',
    to: '/app/home',
    absPath: '/app/home',
    Breadcrumb: undefined,
  },
  profile: {
    path: 'profile/*',
    to: '/app/profile',
    absPath: '/app/profile',
    Breadcrumb() {
      const { t } = useTranslation();
      return <>{t('profile:breadcrumbs.index')}</>;
    },
  },
  profileChangePassword: {
    path: 'change-password',
    to: '/app/profile/change-password',
    absPath: '/app/profile/change-password',
    Breadcrumb() {
      const { t } = useTranslation();
      return <>{t('profile:breadcrumbs.changePassword')}</>;
    },
  },
} as const satisfies Record<
  string,
  {
    path: string;
    to: string | ((...args: string[]) => string);
    absPath: string;
    Breadcrumb: BreadcrumbsRoute['breadcrumb'];
  }
>;
