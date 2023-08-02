import { useState, useMemo, useCallback } from 'react';

import { useOnMount } from '@/common/hooks';

import supabase from './client';
import type {
  Session,
  SignUpPayload,
  ResendConfirmationPayload,
  SignInPayload,
  SignInMagicLinkPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
} from './models';

type OnError = (error: unknown) => void;

export const useSignUp = () => {
  const [isPending, setIsPending] = useState(false);

  const signUp = useCallback(
    async (
      { email, password }: SignUpPayload,
      {
        onSuccess,
        onError,
      }: { onSuccess: (data: { requiresConfirmation: boolean }) => void; onError: OnError },
    ) => {
      setIsPending(true);

      const {
        data: { user, session },
        error,
      } = await supabase.auth.signUp({ email, password });

      if (error) {
        onError(error);
      } else {
        onSuccess({
          requiresConfirmation: !!(user && !session),
        });
      }

      setIsPending(false);
    },
    [setIsPending],
  );

  return useMemo(() => ({ signUp, isPending }), [signUp, isPending]);
};

export const useResendConfirmation = () => {
  const [isPending, setIsPending] = useState(false);

  const resendConfirmation = useCallback(
    async (
      { email }: ResendConfirmationPayload,
      { onSuccess, onError }: { onSuccess?: VoidFunction; onError?: OnError },
    ) => {
      setIsPending(true);

      const { error } = await supabase.auth.resend({ type: 'signup', email });

      if (error) {
        onError?.(error);
      } else {
        onSuccess?.();
      }

      setIsPending(false);
    },
    [setIsPending],
  );

  return useMemo(() => ({ resendConfirmation, isPending }), [resendConfirmation, isPending]);
};

export const useSignIn = () => {
  const [isPending, setIsPending] = useState(false);

  const signIn = useCallback(
    async (
      { email, password }: SignInPayload,
      { onSuccess, onError }: { onSuccess?: VoidFunction; onError: OnError },
    ) => {
      setIsPending(true);

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        onError(error);
      } else {
        onSuccess?.();
      }

      setIsPending(false);
    },
    [setIsPending],
  );

  return useMemo(() => ({ signIn, isPending }), [signIn, isPending]);
};

export const useSignInMagicLink = () => {
  const [isPending, setIsPending] = useState(false);

  const signInMagicLink = useCallback(
    async (
      { email }: SignInMagicLinkPayload,
      { onSuccess, onError }: { onSuccess?: VoidFunction; onError: OnError },
    ) => {
      setIsPending(true);

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });

      if (error) {
        onError(error);
      } else {
        onSuccess?.();
      }

      setIsPending(false);
    },
    [setIsPending],
  );

  return useMemo(() => ({ signInMagicLink, isPending }), [signInMagicLink, isPending]);
};

export const useSignOut = () => {
  const [isPending, setIsPending] = useState(false);

  const signOut = useCallback(
    async ({ onSuccess, onError }: { onSuccess?: VoidFunction; onError: OnError }) => {
      setIsPending(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        onError(error);
      } else {
        onSuccess?.();
      }

      setIsPending(false);
    },
    [setIsPending],
  );

  return useMemo(() => ({ signOut, isPending }), [signOut, isPending]);
};

export const useResetPassword = () => {
  const [isPending, setIsPending] = useState(false);

  const resetPassword = useCallback(
    async (
      { email }: ResetPasswordPayload,
      {
        redirectTo,
        onSuccess,
        onError,
      }: { redirectTo: string; onSuccess: VoidFunction; onError: OnError },
    ) => {
      setIsPending(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

      if (error) {
        onError(error);
      } else {
        onSuccess();
      }

      setIsPending(false);
    },
    [setIsPending],
  );

  return useMemo(() => ({ resetPassword, isPending }), [resetPassword, isPending]);
};

export const useChangePassword = () => {
  const [isPending, setIsPending] = useState(false);

  const changePassword = useCallback(
    async (
      { password }: ChangePasswordPayload,
      { onSuccess, onError }: { onSuccess: VoidFunction; onError: OnError },
    ) => {
      setIsPending(true);

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        onError(error);
      } else {
        onSuccess();
      }

      setIsPending(false);
    },
    [setIsPending],
  );

  return useMemo(() => ({ changePassword, isPending }), [changePassword, isPending]);
};

export const useFetchSession = (opts?: { initialIsPending?: boolean }) => {
  const [isPending, setIsPending] = useState(opts?.initialIsPending ?? false);

  const fetchSession = useCallback(
    async ({
      onSuccess,
      onError,
    }: {
      onSuccess: (session: Session | null) => void;
      onError: OnError;
    }) => {
      setIsPending(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        onError(error);
      } else {
        onSuccess(session);
      }

      setIsPending(false);
    },
    [setIsPending],
  );

  return useMemo(() => ({ fetchSession, isPending }), [fetchSession, isPending]);
};

export const useListenToAuthStateChange = (
  onChange: Parameters<typeof supabase.auth.onAuthStateChange>[0],
) =>
  useOnMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(onChange);

    return () => subscription.unsubscribe();
  });
