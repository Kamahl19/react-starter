import { generatePath, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { type BreadcrumbsRoute } from 'use-react-router-breadcrumbs';

import { useFetchBook } from '@/api';

/**
 * Routes
 */
export const DASHBOARD_ROUTES = {
  index: {
    path: 'app/*',
    to: '/app',
    absPath: '/app',
    Breadcrumb: undefined,
  },
  bookshelf: {
    path: 'bookshelf/*',
    to: '/app/bookshelf',
    absPath: '/app/bookshelf',
    Breadcrumb: undefined,
  },
  bookshelfDiscover: {
    path: 'discover',
    to: '/app/bookshelf/discover',
    absPath: '/app/bookshelf/discover',
    Breadcrumb() {
      const { t } = useTranslation();
      return <>{t('bookshelf:breadcrumbs.discover')}</>;
    },
  },
  bookshelfReadingList: {
    path: 'reading-list',
    to: '/app/bookshelf/reading-list',
    absPath: '/app/bookshelf/reading-list',
    Breadcrumb() {
      const { t } = useTranslation();
      return <>{t('bookshelf:breadcrumbs.readingList')}</>;
    },
  },
  bookshelfFinished: {
    path: 'finished',
    to: '/app/bookshelf/finished',
    absPath: '/app/bookshelf/finished',
    Breadcrumb() {
      const { t } = useTranslation();
      return <>{t('bookshelf:breadcrumbs.finished')}</>;
    },
  },
  bookshelfDetail: {
    path: ':bookId/*',
    to: (bookId: string) => generatePath('/app/bookshelf/:bookId', { bookId }),
    absPath: '/app/bookshelf/:bookId',
    Breadcrumb() {
      const bookId = useBookshelfParams();
      const { data } = useFetchBook(bookId);
      return <>{data?.book.title ?? ''}</>;
    },
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
    Breadcrumb: undefined,
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

/**
 * Get params
 */

export const useBookshelfParams = () => {
  const { bookId } = useParams<'bookId'>();

  if (!bookId) {
    throw new Error('Missing bookId parameter');
  }

  return bookId;
};
