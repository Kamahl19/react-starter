import { useFetchBookshelfReadingList } from '@/api';
import { Loading, ResultError } from '@/common/components';

import List from '../components/List';

const BookshelfReadingList = () => {
  const { data, isPending, isError, error } = useFetchBookshelfReadingList();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ResultError error={error} />;
  }

  return <List books={data.books} />;
};

export default BookshelfReadingList;
