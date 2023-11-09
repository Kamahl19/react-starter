import { useFetchBookshelfDiscover } from '@/api';
import { LoadingScreen, ResultError } from '@/common/components';

import DashboardPageHeader from '../../../components/DashboardPageHeader';
import List from '../components/List';

const BookshelfDiscover = () => {
  const { data, isPending, isError, error } = useFetchBookshelfDiscover();

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

export default BookshelfDiscover;
