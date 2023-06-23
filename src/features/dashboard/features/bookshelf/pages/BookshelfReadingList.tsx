import { useFetchBookshelfReadingList } from 'api';
import { LoadingScreen, ResultError } from 'common/components';

import DashboardPageHeader from '../../../components/DashboardPageHeader';
import List from '../components/List';

const BookshelfReadingList = () => {
  const { data, isLoading, isError, error } = useFetchBookshelfReadingList();

  if (isLoading) {
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

export default BookshelfReadingList;
