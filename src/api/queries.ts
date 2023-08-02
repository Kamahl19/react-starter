import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/common/auth';

import supabase from './client';
import type {
  BookResponse,
  BooksResponse,
  AddToReadingListPayload,
  MarkBookPayload,
  SetRatingPayload,
  SetNotePayload,
  RemoveFromReadingListPayload,
} from './models';
import type { UpdateReadingList, InsertReadingList } from './database.types';

class ErrorWithStatus extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Bookshelf
 */

const bookshelfQueryKeys = {
  all: () => ['bookshelf'] as const,
  list: () => [...bookshelfQueryKeys.all(), 'list'] as const,
  discover: () => [...bookshelfQueryKeys.list(), 'discover'] as const,
  readingList: (userId: string) => [...bookshelfQueryKeys.list(), 'readingList', userId] as const,
  finished: (userId: string) => [...bookshelfQueryKeys.list(), 'finished', userId] as const,
  book: (bookId: string) => [...bookshelfQueryKeys.all(), 'detail', bookId] as const,
};

export const useFetchBookshelfDiscover = () =>
  useQuery({
    queryKey: bookshelfQueryKeys.discover(),
    queryFn: async (): Promise<BooksResponse> => {
      const { data, error } = await supabase
        .from('books')
        // TODO select no columns from reading_list after https://github.com/supabase/postgrest-js/issues/445
        .select(
          `
          *,
          reading_list(bookId)
        `,
        )
        .is('reading_list[0]', null) // eslint-disable-line unicorn/no-null
        .order('title');

      if (error) {
        throw error;
      }

      return {
        books: data.map(({ reading_list, ...book }) => ({
          ...book, // eslint-disable-line @typescript-eslint/no-non-null-assertion
          isInList: false,
          finished: false,
          rating: 0,
          note: '',
        })),
      };
    },
  });

export const useFetchBookshelfReadingList = () => {
  const { userId } = useAuth();

  return useQuery({
    queryKey: bookshelfQueryKeys.readingList(userId),
    queryFn: async (): Promise<BooksResponse> => {
      const { data, error } = await supabase
        .from('reading_list')
        .select(
          `
          *,
          book:books(*)
        `,
        )
        .eq('userId', userId)
        .eq('finished', false)
        .order('book(title)');

      if (error) {
        throw error;
      }

      return {
        books: data.map(({ book, finished, rating, note }) => ({
          ...book!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
          isInList: true,
          finished,
          rating,
          note,
        })),
      };
    },
  });
};

export const useFetchBookshelfFinished = () => {
  const { userId } = useAuth();

  return useQuery({
    queryKey: bookshelfQueryKeys.finished(userId),
    queryFn: async (): Promise<BooksResponse> => {
      const { data, error } = await supabase
        .from('reading_list')
        .select(
          `
          *,
          book:books(*)
        `,
        )
        .eq('userId', userId)
        .eq('finished', true)
        .order('book(title)');

      if (error) {
        throw error;
      }

      return {
        books: data.map(({ book, finished, rating, note }) => ({
          ...book!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
          isInList: true,
          finished,
          rating,
          note,
        })),
      };
    },
  });
};

export const useFetchBook = (bookId: string) =>
  useQuery({
    queryKey: bookshelfQueryKeys.book(bookId),
    queryFn: async (): Promise<BookResponse> => {
      const { data, error } = await supabase
        .from('books')
        .select(
          `
          *,
          reading_list(*)
        `,
        )
        .eq('id', bookId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new ErrorWithStatus('Book not found', 404);
      }

      const { reading_list, ...book } = data;

      // TODO array -> single object https://github.com/orgs/supabase/discussions/7610
      const readingList = reading_list[0] ?? {
        finished: false,
        rating: 0,
        note: '',
      };

      return {
        book: {
          ...book,
          isInList: reading_list.length > 0,
          finished: readingList.finished,
          rating: readingList.rating,
          note: readingList.note,
        },
      };
    },
  });

export const useAddToReadingList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, bookId }: AddToReadingListPayload) => {
      const { data, error } = await supabase
        .from('reading_list')
        .upsert<InsertReadingList>({ userId, bookId }, { ignoreDuplicates: true })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: ({ bookId }) => {
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.book(bookId) });
    },
  });
};

export const useRemoveFromReadingList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, bookId }: RemoveFromReadingListPayload) => {
      const { data, error } = await supabase
        .from('reading_list')
        .delete()
        .match({ userId, bookId })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: ({ bookId }) => {
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.book(bookId) });
    },
  });
};

export const useMarkBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, bookId, finished }: MarkBookPayload) => {
      const { data, error } = await supabase
        .from('reading_list')
        .update<UpdateReadingList>({ finished })
        .match({ userId, bookId })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: ({ bookId }) => {
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.book(bookId) });
    },
  });
};

export const useSetRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, bookId, rating }: SetRatingPayload) => {
      const { data, error } = await supabase
        .from('reading_list')
        .update<UpdateReadingList>({ rating })
        .match({ userId, bookId })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: ({ bookId }) => {
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.book(bookId) });
    },
  });
};

export const useSetNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, bookId, note }: SetNotePayload) => {
      const { data, error } = await supabase
        .from('reading_list')
        .update<UpdateReadingList>({ note })
        .match({ userId, bookId })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: ({ bookId }) => {
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: bookshelfQueryKeys.book(bookId) });
    },
  });
};
