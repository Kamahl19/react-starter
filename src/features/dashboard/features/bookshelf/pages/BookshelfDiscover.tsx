import { useFetchBookshelfDiscover } from '@/api';
import { Loading, ResultError } from '@/common/components';

import List from '../components/List';

const BookshelfDiscover = () => {
  const { data, isPending, isError, error } = useFetchBookshelfDiscover();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ResultError error={error} />;
  }

  return <List books={data.books} />;
};

export default BookshelfDiscover;
