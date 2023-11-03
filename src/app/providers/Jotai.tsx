import { type ReactNode } from 'react';
import { createStore, Provider } from 'jotai';
import { DevTools, useAtomsDebugValue } from 'jotai-devtools';

export const store = createStore();

type Props = {
  children: ReactNode;
};

const Jotai = ({ children }: Props) => (
  <Provider store={store}>
    {import.meta.env.DEV && <DebugAtoms />}
    <DevTools store={store} />
    {children}
  </Provider>
);

export default Jotai;

const DebugAtoms = () => {
  useAtomsDebugValue();
  return <></>;
};
