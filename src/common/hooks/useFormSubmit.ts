import { useCallback, FormEvent } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';

const useFormSubmit = <V extends {}>(form: WrappedFormUtils<V>, onSubmit: (values: V) => void) => {
  const { validateFieldsAndScroll } = form;

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      validateFieldsAndScroll((err, values) => {
        if (!err) {
          onSubmit(values);
        }
      });
    },
    [validateFieldsAndScroll, onSubmit]
  );

  return handleSubmit;
};

export default useFormSubmit;
