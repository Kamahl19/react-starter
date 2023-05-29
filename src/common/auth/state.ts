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

export const userIdState = atom<AuthState['userId']>({
  key: 'userId',
  default: initialValue.userId,
});

export const tokenState = atom<AuthState['token']>({
  key: 'token',
  default: initialValue.token,
  effects: [recoilPersist().persistAtom],
});

export const isLoggedInSelector = selector({
  key: 'isLoggedIn',
  get: ({ get }) =>
    get(userIdState) !== initialValue.userId && get(tokenState) !== initialValue.token,
});

export const useSetAuthState = () =>
  useRecoilTransaction_UNSTABLE(({ set }) => (state: Required<AuthState>) => {
    set(userIdState, state.userId);
    set(tokenState, state.token);
  });

export const useResetAuthState = () =>
  useRecoilTransaction_UNSTABLE(({ reset }) => () => {
    reset(userIdState);
    reset(tokenState);
  });
