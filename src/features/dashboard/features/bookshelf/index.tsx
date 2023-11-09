import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { NotFound } from '@/common/components';

import { DASHBOARD_ROUTES } from '../../routes';

const BookshelfDiscover = lazy(() => import('./pages/BookshelfDiscover'));
const BookshelfReadingList = lazy(() => import('./pages/BookshelfReadingList'));
const BookshelfFinished = lazy(() => import('./pages/BookshelfFinished'));
const BookDetail = lazy(() => import('./pages/BookDetail'));

const Books = () => (
  <Routes>
    <Route index element={<Navigate replace to={DASHBOARD_ROUTES.bookshelfDiscover.to} />} />
    <Route path={DASHBOARD_ROUTES.bookshelfDiscover.path} element={<BookshelfDiscover />} />
    <Route path={DASHBOARD_ROUTES.bookshelfReadingList.path} element={<BookshelfReadingList />} />
    <Route path={DASHBOARD_ROUTES.bookshelfFinished.path} element={<BookshelfFinished />} />
    <Route path={DASHBOARD_ROUTES.bookshelfDetail.path} element={<BookDetail />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Books;
