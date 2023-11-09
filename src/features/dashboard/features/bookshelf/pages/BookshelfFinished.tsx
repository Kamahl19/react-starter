import { useFetchBookshelfFinished } from '@/api';
import { LoadingScreen, ResultError } from '@/common/components';

import DashboardPageHeader from '../../../components/DashboardPageHeader';
import List from '../components/List';

const BookshelfFinished = () => {
  const { data, isPending, isError, error } = useFetchBookshelfFinished();

  if (isPending) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ResultError error={error} />;
  }

  return (
    <>
      <DashboardPageHeader />
      <List books={data.books} />
    </>
  );
};

export default BookshelfFinished;
