import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { useFetchBook, useSetNote } from '@/api';
import { useAuth } from '@/common/auth';
import { Form, Loading, ResultError } from '@/common/components';
import { usePrintErrorMessage } from '@/common/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Textarea } from '@/common/components/ui/textarea';
import { Button } from '@/common/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/common/components/ui/form';

import { useBookshelfParams } from '../../../routes';
import RatingSelect from '../components/RatingSelect';
import {
  AddToReadingListButton,
  MarkAsReadButton,
  MarkAsUnreadButton,
  RemoveFromReadingListButton,
} from '../components/ActionButtons';

const BookDetail = () => {
  const bookId = useBookshelfParams();

  const { data, isPending, isError, error } = useFetchBook(bookId);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ResultError error={error} />;
  }

  const { book } = data;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>{book.author}</CardDescription>
        </CardHeader>
        <CardContent>{book.description}</CardContent>
        <CardFooter className="justify-between">
          <div className="flex gap-x-4">
            {book.isInList && book.finished && <MarkAsUnreadButton bookId={bookId} />}
            {book.isInList && !book.finished && <MarkAsReadButton bookId={bookId} />}
            {book.isInList && <RemoveFromReadingListButton bookId={bookId} />}
            {!book.isInList && <AddToReadingListButton bookId={bookId} />}
          </div>
          {book.finished && <RatingSelect bookId={bookId} value={book.rating} />}
        </CardFooter>
      </Card>
      {book.isInList && <Note bookId={bookId} initialNote={book.note} />}
    </>
  );
};

export default BookDetail;

type NoteFormInputs = {
  note: string;
};

type NoteProps = {
  bookId: string;
  initialNote: string;
};

const Note = ({ bookId, initialNote }: NoteProps) => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useSetNote();

  const form = useForm<NoteFormInputs>({
    defaultValues: {
      note: initialNote,
    } satisfies NoteFormInputs,
  });

  const onSubmit = ({ note }: NoteFormInputs) => mutate({ userId, bookId, note }, { onError });

  return (
    <div className="mt-8 w-full lg:max-w-xl">
      <Form form={form} onSubmit={onSubmit} id="note-form">
        {{
          formFields: (
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('bookshelf:note')}</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          ),
          footer: (
            <Button
              form="note-form"
              type="submit"
              disabled={isPending}
              className="w-full lg:w-auto"
            >
              {t('global:save')}
            </Button>
          ),
        }}
      </Form>
    </div>
  );
};
