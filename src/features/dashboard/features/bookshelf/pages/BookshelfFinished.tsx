import { useFetchBookshelfFinished } from '@/api';
import { Loading, ResultError } from '@/common/components';

import List from '../components/List';

const BookshelfFinished = () => {
  const { data, isPending, isError, error } = useFetchBookshelfFinished();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ResultError error={error} />;
  }

  return <List books={data.books} />;
};

export default BookshelfFinished;
