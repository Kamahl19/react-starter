import { type ChangeEventHandler, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useFetchBook,
  useAddToReadingList,
  useRemoveFromReadingList,
  useMarkBook,
  useSetRating,
  useSetNote,
} from '@/api';
import { useAuth } from '@/common/auth';
import { LoadingScreen, ResultError } from '@/common/components';
import { usePrintErrorMessage } from '@/common/hooks';

import DashboardPageHeader from '../../../components/DashboardPageHeader';
import { useBookshelfParams } from '../../../routes';
import BookNote from '../components/BookNote';

const BookDetail = () => {
  const { t } = useTranslation();

  const bookId = useBookshelfParams();

  const { userId } = useAuth();

  const { data, isPending, isError, error } = useFetchBook(bookId);

  const onError = usePrintErrorMessage();

  const { mutate: addToReadingList, isPending: isAddToReadingListPending } = useAddToReadingList();

  const handleAddToReadingList = useCallback(
    () => addToReadingList({ bookId, userId }, { onError }),
    [onError, addToReadingList, bookId, userId],
  );

  const { mutate: removeFromReadingList, isPending: isRemoveFromReadingListPending } =
    useRemoveFromReadingList();

  const handleRemoveFromReadingList = useCallback(
    () => removeFromReadingList({ bookId, userId }, { onError }),
    [onError, removeFromReadingList, bookId, userId],
  );

  const { mutate: markBook, isPending: isMarkBookPending } = useMarkBook();

  const handleMarkBook = useCallback(
    (finished: boolean) => markBook({ bookId, finished, userId }, { onError }),
    [onError, markBook, userId, bookId],
  );

  const { mutate: setRating } = useSetRating();

  const handleSetRating = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ target }) =>
      setRating({ bookId, rating: Number.parseInt(target.value), userId }, { onError }),
    [onError, setRating, userId, bookId],
  );

  const { mutate: setNote, isPending: isSetNotePending } = useSetNote();

  const handleSetNote = useCallback(
    ({ note }: { note: string }) => setNote({ bookId, note, userId }, { onError }),
    [onError, setNote, userId, bookId],
  );

  if (isPending) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ResultError error={error} />;
  }

  const { book } = data;

  return (
    <>
      <DashboardPageHeader
        title={
          <div>
            <h3>{book.title}</h3>
            {book.finished && (
              <select onChange={handleSetRating} value={book.rating}>
                {!book.rating && <option></option>}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            )}
          </div>
        }
        extra={
          book.isInList ? (
            <div>
              {book.finished ? (
                <button disabled={isMarkBookPending} onClick={() => handleMarkBook(false)}>
                  {t('bookshelf:action.markAsUnread')}
                </button>
              ) : (
                <button disabled={isMarkBookPending} onClick={() => handleMarkBook(true)}>
                  {t('bookshelf:action.markAsRead')}
                </button>
              )}
              <button
                disabled={isRemoveFromReadingListPending}
                onClick={handleRemoveFromReadingList}
              >
                {t('bookshelf:action.removeFromReadingList')}
              </button>
            </div>
          ) : (
            <button disabled={isAddToReadingListPending} onClick={handleAddToReadingList}>
              {t('bookshelf:action.addToReadingList')}
            </button>
          )
        }
      >
        <div>
          {t('bookshelf:author')}: {book.author}
        </div>
        <div>
          {t('bookshelf:description')}: {book.description}
        </div>
      </DashboardPageHeader>

      {book.isInList && (
        <div>
          <h4>
            {t('bookshelf:note')}
            {isSetNotePending && <>Loading...</>}
          </h4>
          <BookNote onSubmit={handleSetNote} initialNote={book.note} />
        </div>
      )}
    </>
  );
};

export default BookDetail;
