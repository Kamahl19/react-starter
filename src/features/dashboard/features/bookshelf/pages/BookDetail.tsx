import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, Rate, Space, Spin, Typography } from 'antd';

import {
  useFetchBook,
  useAddToReadingList,
  useRemoveFromReadingList,
  useMarkBook,
  useSetRating,
  useSetNote,
} from '@/api';
import { useAuth } from '@/common/auth';
import { Descriptions, LoadingScreen, ResultError, Widget } from '@/common/components';
import { usePrintErrorMessage } from '@/common/hooks';
import { noMargin } from '@/common/styleUtils';

import DashboardPageHeader from '../../../components/DashboardPageHeader';
import { useBookshelfParams } from '../../../routes';

type NoteFormValues = { note: string };

const BookDetail = () => {
  const { t } = useTranslation();

  const bookId = useBookshelfParams();

  const { userId } = useAuth();

  const { data, isPending, isError, error } = useFetchBook(bookId);

  const onError = usePrintErrorMessage();

  const [noteForm] = Form.useForm<NoteFormValues>();

  const { mutate: addToReadingList, isPending: isAddToReadingListPending } = useAddToReadingList();

  const handleAddToReadingList = useCallback(
    () => addToReadingList({ bookId, userId }, { onError }),
    [onError, addToReadingList, bookId, userId],
  );

  const { mutate: removeFromReadingList, isPending: isRemoveFromReadingListPending } =
    useRemoveFromReadingList();

  const handleRemoveFromReadingList = useCallback(
    () =>
      removeFromReadingList(
        { bookId, userId },
        {
          onSuccess: () => noteForm.setFieldValue('note', ''),
          onError,
        },
      ),
    [onError, removeFromReadingList, bookId, userId, noteForm],
  );

  const { mutate: markBook, isPending: isMarkBookPending } = useMarkBook();

  const handleMarkBook = useCallback(
    (finished: boolean) => markBook({ bookId, finished, userId }, { onError }),
    [onError, markBook, userId, bookId],
  );

  const { mutate: setRating } = useSetRating();

  const handleSetRating = useCallback(
    (rating: number) => setRating({ bookId, rating, userId }, { onError }),
    [onError, setRating, userId, bookId],
  );

  const { mutate: setNote, isPending: isSetNotePending } = useSetNote();

  const handleSetNote = useCallback(() => {
    noteForm.validateFields().then(({ note }) => setNote({ bookId, note, userId }, { onError }));
  }, [onError, setNote, userId, bookId, noteForm]);

  if (isPending) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ResultError error={error} card />;
  }

  const { book } = data;

  return (
    <>
      <DashboardPageHeader
        title={
          <Space>
            <Typography.Title level={3} css={noMargin}>
              {book.title}
            </Typography.Title>
            {book.finished && (
              <Rate allowClear={false} value={book.rating} onChange={handleSetRating} />
            )}
          </Space>
        }
        extra={
          book.isInList ? (
            <Space>
              {book.finished ? (
                <Button danger loading={isMarkBookPending} onClick={() => handleMarkBook(false)}>
                  {t('bookshelf:action.markAsUnread')}
                </Button>
              ) : (
                <Button
                  type="primary"
                  loading={isMarkBookPending}
                  onClick={() => handleMarkBook(true)}
                >
                  {t('bookshelf:action.markAsRead')}
                </Button>
              )}
              <Button
                type="primary"
                danger
                loading={isRemoveFromReadingListPending}
                onClick={handleRemoveFromReadingList}
              >
                {t('bookshelf:action.removeFromReadingList')}
              </Button>
            </Space>
          ) : (
            <Button
              type="primary"
              loading={isAddToReadingListPending}
              onClick={handleAddToReadingList}
            >
              {t('bookshelf:action.addToReadingList')}
            </Button>
          )
        }
      >
        <Descriptions>
          <Descriptions.Item label={t('bookshelf:author')}>{book.author}</Descriptions.Item>
          <Descriptions.Item label={t('bookshelf:description')}>
            {book.description}
          </Descriptions.Item>
        </Descriptions>
      </DashboardPageHeader>

      {book.isInList && (
        <Widget
          title={
            <Space>
              {t('bookshelf:note')}
              <Spin spinning={isSetNotePending} />
            </Space>
          }
        >
          <Form<NoteFormValues> form={noteForm} onFinish={handleSetNote}>
            <Form.Item name="note" initialValue={book.note} noStyle>
              <Input.TextArea rows={5} onBlur={handleSetNote} />
            </Form.Item>
          </Form>
        </Widget>
      )}
    </>
  );
};

export default BookDetail;
