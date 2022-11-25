import { type ReactNode } from 'react';
import { RecoilRoot, useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import RecoilNexus from 'recoil-nexus';

type Props = {
  children: ReactNode;
};

const Recoil = ({ children }: Props) => (
  <RecoilRoot>
    {import.meta.env.DEV && <RecoilDebugObserver />}
    <RecoilNexus />
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
