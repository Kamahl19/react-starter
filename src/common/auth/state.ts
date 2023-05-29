import { atom, selector, useRecoilTransaction_UNSTABLE } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type AuthState = {
  userId: string;
  token?: string;
};

const initialValue = {
  userId: '',
  token: undefined,
} satisfies AuthState;

export const userIdAtom = atom<AuthState['userId']>({
  key: 'userId',
  default: initialValue.userId,
});

export const tokenAtom = atom<AuthState['token']>({
  key: 'token',
  default: initialValue.token,
  effects: [recoilPersist().persistAtom],
});

export const isLoggedInSelector = selector({
  key: 'isLoggedIn',
  get: ({ get }) =>
    get(userIdAtom) !== initialValue.userId && get(tokenAtom) !== initialValue.token,
});

export const useSetAuthState = () =>
  useRecoilTransaction_UNSTABLE(({ set }) => (state: Required<AuthState>) => {
    set(userIdAtom, state.userId);
    set(tokenAtom, state.token);
  });

export const useResetAuthState = () =>
  useRecoilTransaction_UNSTABLE(({ reset }) => () => {
    reset(userIdAtom);
    reset(tokenAtom);
  });
