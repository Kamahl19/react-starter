import { drop, factory, primaryKey } from '@mswjs/data';

import persist from './persist';

const generateRandomId = () => Math.random().toString().split('.')[1] ?? '';

export const db = factory({
  user: {
    id: primaryKey(generateRandomId),
    email: String,
    password: String,
    isConfirmed: () => true,
  },
  book: {
    id: primaryKey(generateRandomId),
    title: String,
    author: String,
    description: String,
  },
  readingList: {
    id: primaryKey(generateRandomId),
    userId: String,
    bookId: String,
    finished: Boolean,
    rating: Number,
    note: String,
  },
});

persist(db);

export const dropDB = () => drop(db);

if (db.book.count() === 0) {
  db.book.create({
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description:
      'A classic novel set in the deep south, dealing with racial injustice and moral crises.',
  });
  db.book.create({
    title: '1984',
    author: 'George Orwell',
    description:
      'A dystopian novel that explores themes of totalitarianism, surveillance, and the power of language.',
  });
  db.book.create({
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description:
      'A beloved romance novel featuring Elizabeth Bennet and Mr. Darcy in 19th-century England.',
  });
  db.book.create({
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description:
      'An American classic set in the Jazz Age, delving into themes of wealth, love, and the American Dream.',
  });
  db.book.create({
    title: 'To the Lighthouse',
    author: 'Virginia Woolf',
    description:
      'A modernist novel that follows the lives of the Ramsay family and their visits to the Isle of Skye.',
  });
  db.book.create({
    title: 'Moby-Dick',
    author: 'Herman Melville',
    description:
      'An epic tale of obsession and revenge as Captain Ahab hunts down the great white whale.',
  });
  db.book.create({
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description:
      'A coming-of-age novel narrated by Holden Caulfield, exploring themes of teenage angst and alienation.',
  });
  db.book.create({
    title: 'Brave New World',
    author: 'Aldous Huxley',
    description:
      'A futuristic novel that depicts a society controlled by technology, genetic engineering, and a loss of individuality.',
  });
  db.book.create({
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    description:
      'A Gothic romance novel following the life of Jane Eyre, from her challenging childhood to her search for independence and love.',
  });
  db.book.create({
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    description:
      'An epic fantasy trilogy that transports readers to the enchanting world of Middle-earth and its battle against evil forces.',
  });
}
