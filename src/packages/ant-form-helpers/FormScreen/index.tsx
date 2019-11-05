import React, { createContext, useEffect, useState, ReactNode, FormEvent } from 'react';
import flattenObject from 'flat';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';

export const FormContext = createContext({} as WrappedFormUtils);

type FormSubmitEvent = FormEvent<HTMLFormElement>;

type InjectedProps = {
  hasErrors: boolean;
  handleSubmit: (e: FormSubmitEvent) => void;
};

type Props<V> = FormComponentProps<V> & {
  children: (props: InjectedProps) => ReactNode;
  onSubmit: (values: V) => void;
};

const FormScreen = <V extends {}>({ children, form, onSubmit }: Props<V>) => {
  const [isMounted, setIsMounted] = useState(false);

  const { getFieldsError, validateFields, validateFieldsAndScroll } = form;

  useEffect(() => {
    setIsMounted(true);
    validateFields(() => {});
  }, [validateFields]);

  function handleSubmit(e: FormSubmitEvent) {
    // TODO use optional chaining once supported
    e && e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  }

  const hasErrors = () => Object.values(flattenObject(getFieldsError())).some(error => !!error);

  return (
    <FormContext.Provider value={form}>
      {children({
        hasErrors: isMounted ? hasErrors() : true,
        handleSubmit,
      })}
    </FormContext.Provider>
  );
};

export default FormScreen;
