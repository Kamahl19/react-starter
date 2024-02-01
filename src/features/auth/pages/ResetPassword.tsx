import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useResetPassword } from '@/api';
import { usePrintErrorMessage } from '@/common/hooks';
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
import { DASHBOARD_ROUTES } from '@/features/dashboard/routes';

import FormWrapper from '../components/FormWrapper';
import Success from '../components/Success';
import { useResetPasswordValidation, type ResetPasswordFields } from '../validations';

const ResetPassword = () => {
  const { t } = useTranslation('auth');

  const [success, setSuccess] = useState(false);

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useResetPassword();

  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(useResetPasswordValidation()),
    defaultValues: {
      email: '',
    } satisfies ResetPasswordFields,
  });

  const onSubmit = useCallback(
    (values: ResetPasswordFields) =>
      mutate(
        {
          payload: values,
          redirectTo: `${window.location.origin}${DASHBOARD_ROUTES.profileChangePassword.to}`,
        },
        {
          onSuccess: () => {
            form.reset();
            setSuccess(true);
          },
          onError,
        },
      ),
    [mutate, onError, form],
  );

  if (success) {
    return (
      <Success
        title={t('resetPassword.success.title')}
        description={t('resetPassword.success.subTitle')}
      />
    );
  }

  return (
    <FormWrapper title={t('resetPassword.title')}>
      <Form form={form} onSubmit={onSubmit} id="auth-form">
        {{
          formFields: (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('resetPassword.email')}</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ),
          footer: (
            <Button form="auth-form" type="submit" disabled={isPending} loading={isPending} block>
              {t('global:submit')}
            </Button>
          ),
        }}
      </Form>
    </FormWrapper>
  );
};

export default ResetPassword;
