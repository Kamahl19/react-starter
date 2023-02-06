import { type ReactNode } from 'react';
import { QueryClientProvider, QueryClient, type QueryClientConfig } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const createQueryClient = (config?: QueryClientConfig) =>
  new QueryClient({
    ...config,
  });

const queryClient = createQueryClient();

const Query = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools position="bottom-right" />
  </QueryClientProvider>
);

export default Query;
