import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const useTokenParam = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  return useMemo(() => token, [token]);
};

export default useTokenParam;
