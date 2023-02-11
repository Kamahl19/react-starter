import { atom, selector, useRecoilTransaction_UNSTABLE } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({ key: 'auth' });

type AuthState = {
  userId: string;
  token?: string;
};

const initialAuthState = {
  userId: '',
  token: undefined,
} satisfies AuthState;

export const userIdState = atom<AuthState['userId']>({
  key: 'userId',
  default: initialAuthState.userId,
});

export const tokenState = atom<AuthState['token']>({
  key: 'token',
  default: initialAuthState.token,
  effects: [persistAtom],
});

export const isLoggedInSelector = selector({
  key: 'isLoggedIn',
  get: ({ get }) =>
    get(tokenState) !== initialAuthState.token && get(userIdState) !== initialAuthState.userId,
});

export const isLoginLoadingState = atom({
  key: 'isLoginLoading',
  default: false,
});

export const isReloginLoadingState = atom({
  key: 'isReloginLoading',
  default: false,
});

export const isLogoutLoadingState = atom({
  key: 'isLogoutLoading',
  default: false,
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
