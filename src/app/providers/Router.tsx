import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import qs from 'query-string';

type Props = {
  children: ReactNode;
};

const Router = ({ children }: Props) => (
  <BrowserRouter>
    <QueryParamProvider
      adapter={ReactRouter6Adapter}
      options={{
        searchStringToObject: qs.parse,
        objectToSearchString: qs.stringify,
      }}
    >
      {children}
    </QueryParamProvider>
  </BrowserRouter>
);

export default Router;
