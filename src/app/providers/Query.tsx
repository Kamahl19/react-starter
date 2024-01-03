import { type ReactNode } from 'react';
import { QueryClientProvider, QueryClient, type QueryClientConfig } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const createQueryClient = (config?: QueryClientConfig) =>
  new QueryClient({
    ...config,
  });

const queryClient = createQueryClient(
  import.meta.env.DEV
    ? {
        defaultOptions: {
          queries: {
            // Disable refetching on switching from DevTools to the app
            refetchOnWindowFocus: false,
          },
        },
      }
    : {},
);

type Props = {
  children: ReactNode;
};

const Query = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default Query;
