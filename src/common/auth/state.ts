import { atom, selector, useRecoilTransaction_UNSTABLE } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({ key: 'auth' });

type AuthState = {
  userId?: string;
  token?: string;
};

const initialState: AuthState = {
  userId: undefined,
  token: undefined,
};

export const userIdState = atom<AuthState['userId']>({
  key: 'userId',
  default: initialState.userId,
});

export const tokenState = atom<AuthState['token']>({
  key: 'token',
  default: initialState.token,
  effects: [persistAtom],
});

export const isLoggedInSelector = selector({
  key: 'isLoggedIn',
  get: ({ get }) => !!(get(tokenState) && get(userIdState)),
});

export const useSetAuthState = () =>
  useRecoilTransaction_UNSTABLE(({ set }) => (state: Required<AuthState>) => {
    set(userIdState, state.userId);
    set(tokenState, state.token);
  });

export const useResetAuthState = () =>
  useRecoilTransaction_UNSTABLE(({ set }) => () => {
    set(userIdState, initialState.userId);
    set(tokenState, initialState.token);
  });
