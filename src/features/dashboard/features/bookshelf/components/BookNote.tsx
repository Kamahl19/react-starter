import { useForm } from 'react-hook-form';

type FormInputs = {
  note: string;
};

type Props = {
  onSubmit: (values: FormInputs) => void;
  initialNote: string;
};

const BookNote = ({ onSubmit, initialNote }: Props) => {
  const form = useForm<FormInputs>({
    defaultValues: { note: initialNote },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <textarea {...form.register('note')} rows={5} onBlur={form.handleSubmit(onSubmit)} />;
    </form>
  );
};

export default BookNote;
