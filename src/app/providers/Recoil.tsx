import { type ReactNode } from 'react';
import {
  RecoilRoot,
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilCallback,
  useGetRecoilValueInfo_UNSTABLE,
  useRecoilTransaction_UNSTABLE,
  type RecoilValue,
  type RecoilState,
} from 'recoil';

type Props = {
  children: ReactNode;
};

const Recoil = ({ children }: Props) => (
  <RecoilRoot>
    {import.meta.env.DEV && <RecoilDebugObserver />}
    <RecoilEscapeHatch />
    {children}
  </RecoilRoot>
);

export default Recoil;

const RecoilDebugObserver = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.log('Recoil change', node.key, snapshot.getLoadable(node));
    }
  });

  return <></>;
};

let _getRecoil: typeof getRecoil;
let _getRecoilPromise: typeof getRecoilPromise;
let _setRecoil: typeof setRecoil;
let _resetRecoil: typeof resetRecoil;

const RecoilEscapeHatch = () => {
  _getRecoil = useRecoilCallback(
    ({ snapshot }) =>
      (atom) =>
        snapshot.getLoadable(atom).getValue(),
    [],
  );

  _getRecoilPromise = useRecoilCallback(
    ({ snapshot }) =>
      (atom) =>
        snapshot.getPromise(atom),
    [],
  );

  _resetRecoil = useRecoilCallback(({ reset }) => reset, []);

  const getInfo = useGetRecoilValueInfo_UNSTABLE();
  const transact = useRecoilTransaction_UNSTABLE(({ set }) => set);

  _setRecoil = useRecoilCallback(
    ({ set }) =>
      (recoilState, valOrUpdater) =>
        (getInfo(recoilState).type === 'atom' ? transact : set)(recoilState, valOrUpdater),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return <></>;
};

/**
 * These methods serve as an escape hatch in case we need to get/set recoil state from outside of the React tree.
 * Inspired by https://github.com/luisanton-io/recoil-nexus
 */
export const getRecoil = <T,>(atom: RecoilValue<T>): T => _getRecoil(atom);
export const getRecoilPromise = <T,>(atom: RecoilValue<T>): Promise<T> => _getRecoilPromise(atom);
export const setRecoil = <T,>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)): void =>
  _setRecoil(atom, valOrUpdater);
export const resetRecoil = (atom: RecoilState<unknown>): void => _resetRecoil(atom);
