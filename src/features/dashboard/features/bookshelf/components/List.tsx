import { Link } from 'react-router-dom';
import { CircleOff } from 'lucide-react';

import { type Book } from '@/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';

import { DASHBOARD_ROUTES } from '../../../routes';
import RatingSelect from './RatingSelect';
import {
  AddToReadingListButton,
  MarkAsReadButton,
  MarkAsUnreadButton,
  RemoveFromReadingListButton,
} from './ActionButtons';

type Props = {
  books: Book[];
};

const List = ({ books }: Props) =>
  books.length === 0 ? (
    <div className="flex h-full items-center justify-center">
      <CircleOff className="size-14" />
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      {books.map((book) => (
        <Card key={book.id}>
          <CardHeader>
            <CardTitle>
              <Link
                to={DASHBOARD_ROUTES.bookshelfDetail.to(book.id)}
                className="underline-offset-4 hover:underline"
              >
                {book.title}
              </Link>
            </CardTitle>
            <CardDescription>{book.author}</CardDescription>
          </CardHeader>
          <CardContent>{book.description}</CardContent>
          <CardFooter className="justify-between">
            <div className="flex gap-x-4">
              {book.isInList && book.finished && <MarkAsUnreadButton bookId={book.id} />}
              {book.isInList && !book.finished && <MarkAsReadButton bookId={book.id} />}
              {book.isInList && <RemoveFromReadingListButton bookId={book.id} />}
              {!book.isInList && <AddToReadingListButton bookId={book.id} />}
            </div>
            {book.finished && <RatingSelect bookId={book.id} value={book.rating} />}
          </CardFooter>
        </Card>
      ))}
    </div>
  );

export default List;
