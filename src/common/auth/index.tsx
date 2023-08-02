import { type ReactNode, useState, createContext, useContext, useMemo } from 'react';

import { useFetchSession, useListenToAuthStateChange, type Session } from '@/api';
import { useOnMount } from '@/common/hooks';

export { default as RequireIsAnonymous } from './RequireIsAnonymous';
export { default as RequireIsLoggedIn } from './RequireIsLoggedIn';

type SessionContextValue = Session | null;

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

const useSessionContext = () => {
  const ctx = useContext(SessionContext);

  if (ctx === undefined) {
    throw new Error('SessionContext has not been set, value is undefined');
  }

  return ctx;
};

export const SessionContextProvider = ({
  children,
  onError,
}: {
  children: ({ isPending }: { isPending: boolean }) => ReactNode;
  onError: (error: unknown) => void;
}) => {
  const [contextValue, setContextValue] = useState<SessionContextValue>();

  const { fetchSession, isPending } = useFetchSession({ initialIsPending: true });

  useOnMount(() => {
    fetchSession({
      onSuccess: setContextValue,
      onError,
    });
  });

  useListenToAuthStateChange((_event, session) => setContextValue(session));

  return (
    <SessionContext.Provider value={contextValue}>
      {children({ isPending })}
    </SessionContext.Provider>
  );
};

export const useAuth = () => {
  const session = useSessionContext();

  return useMemo(
    () => ({
      isLoggedIn: session !== null,
      user: session?.user!, // eslint-disable-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      userId: session?.user.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    }),
    [session],
  );
};
