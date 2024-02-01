import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useChangePassword } from '@/api';
import { useAuth } from '@/common/auth';
import { usePrintErrorMessage } from '@/common/hooks';
import { Form, Typography } from '@/common/components';
import { Button } from '@/common/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import { Separator } from '@/common/components/ui/separator';

import { useChangePasswordValidation, type ChangePasswordFields } from '../validations';

const ChangePassword = () => {
  const { t } = useTranslation(['global', 'profile']);

  const { userId } = useAuth();

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useChangePassword();

  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(useChangePasswordValidation()),
    defaultValues: {
      password: '',
    } satisfies ChangePasswordFields,
  });

  const onSubmit = useCallback(
    (values: ChangePasswordFields) =>
      mutate(
        { userId, payload: values },
        {
          onSuccess: () => {
            form.reset();
            toast.success(t('profile:changePassword.success'));
          },
          onError,
        },
      ),
    [t, userId, mutate, form, onError],
  );

  return (
    <>
      <Typography variant="h4">{t('profile:changePassword.title')}</Typography>

      <Separator className="my-4" />

      <Form form={form} onSubmit={onSubmit} id="change-password-form">
        {{
          formFields: (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile:changePassword.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ),
          footer: (
            <Button
              form="change-password-form"
              type="submit"
              disabled={isPending}
              loading={isPending}
              className="w-full md:w-auto"
            >
              {t('global:save')}
            </Button>
          ),
        }}
      </Form>
    </>
  );
};

export default ChangePassword;
