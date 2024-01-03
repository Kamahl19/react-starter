import { type ReactNode, type HTMLAttributes } from 'react';
import { type FieldValues, type UseFormReturn, FormProvider } from 'react-hook-form';

type FormProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  HTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'children'
> & {
  form: UseFormReturn<TFieldValues>;
  onSubmit: Parameters<UseFormReturn<TFieldValues>['handleSubmit']>[0];
  children: {
    formFields: ReactNode;
    footer: ReactNode;
  };
};

const Form = <TFieldValues extends FieldValues = FieldValues>({
  form,
  children,
  onSubmit,
  ...props
}: FormProps<TFieldValues>) => (
  <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <div className="space-y-3">{children.formFields}</div>
      <div className="mt-6">{children.footer}</div>
    </form>
  </FormProvider>
);

export default Form;
