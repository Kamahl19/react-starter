import { type ChangeEventHandler, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  useAddToReadingList,
  useRemoveFromReadingList,
  useMarkBook,
  useSetRating,
  type Book,
} from '@/api';
import { useAuth } from '@/common/auth';
import { usePrintErrorMessage } from '@/common/hooks';

import { DASHBOARD_ROUTES } from '../../../routes';

type Props = {
  books: Book[];
};

const List = ({ books }: Props) =>
  books.length === 0 ? (
    <div>Empty</div>
  ) : (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <div>
            <h3>
              <Link to={DASHBOARD_ROUTES.bookshelfDetail.to(book.id)}>{book.title}</Link>
              {book.finished && <Rating bookId={book.id} value={book.rating} />}
            </h3>
            {book.isInList ? (
              <div>
                {book.finished ? (
                  <MarkAsUnreadButton bookId={book.id} />
                ) : (
                  <MarkAsReadButton bookId={book.id} />
                )}
                <RemoveFromReadingListButton bookId={book.id} />
              </div>
            ) : (
              <AddToReadingListButton bookId={book.id} />
            )}
            <p>{book.author}</p>
            <p>{book.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

export default List;

const AddToReadingListButton = ({ bookId }: { bookId: string }) => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useAddToReadingList();

  const handleClick = useCallback(
    () => mutate({ bookId, userId }, { onError }),
    [onError, mutate, userId, bookId],
  );

  return (
    <button disabled={isPending} onClick={handleClick}>
      {t('bookshelf:action.addToReadingList')}
    </button>
  );
};

const RemoveFromReadingListButton = ({ bookId }: { bookId: string }) => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useRemoveFromReadingList();

  const handleClick = useCallback(
    () => mutate({ bookId, userId }, { onError }),
    [onError, mutate, userId, bookId],
  );

  return (
    <button disabled={isPending} onClick={handleClick}>
      {t('bookshelf:action.removeFromReadingList')}
    </button>
  );
};

const MarkAsReadButton = ({ bookId }: { bookId: string }) => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useMarkBook();

  const handleClick = useCallback(
    () => mutate({ bookId, userId, finished: true }, { onError }),
    [onError, mutate, userId, bookId],
  );

  return (
    <button disabled={isPending} onClick={handleClick}>
      {t('bookshelf:action.markAsRead')}
    </button>
  );
};

const MarkAsUnreadButton = ({ bookId }: { bookId: string }) => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useMarkBook();

  const handleClick = useCallback(
    () => mutate({ bookId, userId, finished: false }, { onError }),
    [onError, mutate, userId, bookId],
  );

  return (
    <button disabled={isPending} onClick={handleClick}>
      {t('bookshelf:action.markAsUnread')}
    </button>
  );
};

const Rating = ({ bookId, value }: { bookId: string; value: number }) => {
  const onError = usePrintErrorMessage();

  const { userId } = useAuth();

  const { mutate } = useSetRating();

  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ target }) => mutate({ bookId, userId, rating: Number.parseInt(target.value) }, { onError }),
    [onError, mutate, userId, bookId],
  );

  return (
    <select onChange={handleChange} value={value}>
      {!value && <option></option>}
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  );
};
