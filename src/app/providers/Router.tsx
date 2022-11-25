import { type ReactNode, useEffect } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { wrapHistory } from 'oaf-react-router';

const history = createBrowserHistory();

wrapHistory(history);

const Router = ({ children }: { children: ReactNode }) => (
  <HistoryRouter history={history}>
    {import.meta.env.DEV && <RouterDebugObserver />}
    {children}
  </HistoryRouter>
);

export default Router;

const RouterDebugObserver = () => {
  useEffect(
    () => history.listen(({ location, action }) => console.log('History change', location, action)),
    []
  );

  return <></>;
};
