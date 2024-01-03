import { generatePath, useParams } from 'react-router-dom';

/**
 * Routes
 */
export const DASHBOARD_ROUTES = {
  index: {
    path: 'app/*',
    to: '/app',
    absPath: '/app',
  },
  bookshelf: {
    path: 'bookshelf/*',
    to: '/app/bookshelf',
    absPath: '/app/bookshelf',
  },
  bookshelfDiscover: {
    path: 'discover',
    to: '/app/bookshelf/discover',
    absPath: '/app/bookshelf/discover',
  },
  bookshelfReadingList: {
    path: 'reading-list',
    to: '/app/bookshelf/reading-list',
    absPath: '/app/bookshelf/reading-list',
  },
  bookshelfFinished: {
    path: 'finished',
    to: '/app/bookshelf/finished',
    absPath: '/app/bookshelf/finished',
  },
  bookshelfDetail: {
    path: ':bookId/*',
    to: (bookId: string) => generatePath('/app/bookshelf/:bookId', { bookId }),
    absPath: '/app/bookshelf/:bookId',
  },
  profile: {
    path: 'profile/*',
    to: '/app/profile',
    absPath: '/app/profile',
  },
  profileChangePassword: {
    path: 'change-password',
    to: '/app/profile/change-password',
    absPath: '/app/profile/change-password',
  },
} as const satisfies Record<
  string,
  {
    path: string;
    to: string | ((...args: string[]) => string);
    absPath: string;
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
