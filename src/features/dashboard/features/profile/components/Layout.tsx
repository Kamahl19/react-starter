import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, matchPath, useLocation } from 'react-router-dom';

import { cn } from '@/common/styleUtils';
import { Typography } from '@/common/components';
import { buttonVariants } from '@/common/components/ui/button';
import { Separator } from '@/common/components/ui/separator';

import { DASHBOARD_ROUTES } from '../../../routes';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { t } = useTranslation('profile');

  const { pathname } = useLocation();

  const items = useMemo(
    () =>
      [{ to: DASHBOARD_ROUTES.profileChangePassword.to, label: t('menu.changePassword') }].map(
        (item) => ({
          ...item,
          isActive: !!matchPath({ path: item.to, end: false }, pathname),
        }),
      ),
    [t, pathname],
  );

  return (
    <>
      <Typography variant="h3">{t('title')}</Typography>

      <Separator className="mb-6 mt-4" />

      <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-12 lg:gap-y-0">
        <aside className="lg:w-1/4 xl:w-1/5">
          <nav className="flex gap-x-2 lg:flex-col lg:gap-x-0 lg:gap-y-1">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  item.isActive
                    ? 'bg-muted hover:bg-muted'
                    : 'hover:bg-transparent hover:underline',
                  'justify-start',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </>
  );
};

export default Layout;
