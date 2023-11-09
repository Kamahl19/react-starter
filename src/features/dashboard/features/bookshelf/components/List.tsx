import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Row, Col, Space, Rate, Empty } from 'antd';
import { Link } from 'react-router-dom';

import {
  useAddToReadingList,
  useRemoveFromReadingList,
  useMarkBook,
  useSetRating,
  type Book,
} from '@/api';
import { useAuth } from '@/common/auth';
import { Widget } from '@/common/components';
import { usePrintErrorMessage } from '@/common/hooks';

import { DASHBOARD_ROUTES } from '../../../routes';

type Props = {
  books: Book[];
};

const List = ({ books }: Props) =>
  books.length === 0 ? (
    <Widget>
      <Empty />
    </Widget>
  ) : (
    <Row gutter={[16, 16]}>
      {books.map((book) => (
        <Col key={book.id} span={24}>
          <Widget
            title={
              <Space>
                <Link to={DASHBOARD_ROUTES.bookshelfDetail.to(book.id)}>{book.title}</Link>
                {book.finished && <Rating bookId={book.id} value={book.rating} />}
              </Space>
            }
            extra={
              book.isInList ? (
                <Space>
                  {book.finished ? (
                    <MarkAsUnreadButton bookId={book.id} />
                  ) : (
                    <MarkAsReadButton bookId={book.id} />
                  )}
                  <RemoveFromReadingListButton bookId={book.id} />
                </Space>
              ) : (
                <AddToReadingListButton bookId={book.id} />
              )
            }
          >
            <Typography.Paragraph italic>{book.author}</Typography.Paragraph>
            <Typography.Text>{book.description}</Typography.Text>
          </Widget>
        </Col>
      ))}
    </Row>
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
    <Button type="primary" loading={isPending} onClick={handleClick}>
      {t('bookshelf:action.addToReadingList')}
    </Button>
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
    <Button type="primary" danger loading={isPending} onClick={handleClick}>
      {t('bookshelf:action.removeFromReadingList')}
    </Button>
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
    <Button type="primary" loading={isPending} onClick={handleClick}>
      {t('bookshelf:action.markAsRead')}
    </Button>
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
    <Button danger loading={isPending} onClick={handleClick}>
      {t('bookshelf:action.markAsUnread')}
    </Button>
  );
};

const Rating = ({ bookId, value }: { bookId: string; value: number }) => {
  const onError = usePrintErrorMessage();

  const { userId } = useAuth();

  const { mutate } = useSetRating();

  const handleChange = useCallback(
    (rating: number) => mutate({ bookId, userId, rating }, { onError }),
    [onError, mutate, userId, bookId],
  );

  return <Rate allowClear={false} value={value} onChange={handleChange} />;
};
