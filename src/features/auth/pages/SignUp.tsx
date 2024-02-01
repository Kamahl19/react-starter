import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateUser, useFetchUserEmailAvailability } from '@/api';
import { useShowErrorMessage } from '@/common/hooks';
import { Form } from '@/common/components';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form';

import FormWrapper from '../components/FormWrapper';
import Success from '../components/Success';
import { useSignUpValidation, type SignUpFields } from '../validations';

const DEBOUNCE_MS = 500;

const SignUp = () => {
  const { t } = useTranslation('auth');

  const [success, setSuccess] = useState(false);

  const onError = useShowErrorMessage();

  const { mutate, isPending } = useCreateUser();

  const form = useForm<SignUpFields>({
    resolver: zodResolver(useSignUpValidation()),
    defaultValues: {
      email: '',
      password: '',
    } satisfies SignUpFields,
  });

  const onSubmit = useCallback(
    (values: SignUpFields) =>
      mutate(values, {
        onSuccess: () => {
          form.reset();
          setSuccess(true);
        },
        onError,
      }),
    [mutate, onError, setSuccess, form],
  );

  const [emailValue] = useDebounce(form.watch('email'), DEBOUNCE_MS);

  const { data: isUserEmailAvailable } = useFetchUserEmailAvailability(emailValue);

  if (success) {
    return <Success title={t('signUp.success.title')} description={t('signUp.success.subTitle')} />;
  }

  return (
    <FormWrapper title={t('signUp.title')}>
      <Form form={form} onSubmit={onSubmit} id="auth-form">
        {{
          formFields: (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('signUp.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage>
                      {isUserEmailAvailable ? null : t('signUp.emailTaken')}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('signUp.password')}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ),
          footer: (
            <Button form="auth-form" type="submit" disabled={isPending} loading={isPending} block>
              {t('signUp.submit')}
            </Button>
          ),
        }}
      </Form>
    </FormWrapper>
  );
};

export default SignUp;
