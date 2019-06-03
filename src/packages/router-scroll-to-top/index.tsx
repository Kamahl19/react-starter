import { useEffect, ReactElement } from 'react';
import useReactRouter from 'use-react-router';

type Props = {
  children: ReactElement;
};

const RouterScrollToTop = ({ children }: Props) => {
  const { location } = useReactRouter();

  useEffect(() => window.scrollTo(0, 0), [location]);

  return children;
};

export default RouterScrollToTop;
