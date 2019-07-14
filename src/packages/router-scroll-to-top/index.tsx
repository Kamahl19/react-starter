import { useEffect, ReactElement } from 'react';
import useReactRouter from 'use-react-router';

type Props = {
  children?: ReactElement;
};

const RouterScrollToTop = ({ children }: Props) => {
  const {
    location: { pathname },
  } = useReactRouter();

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return children || null;
};

export default RouterScrollToTop;
