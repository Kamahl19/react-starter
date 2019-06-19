import React, { createContext, useEffect, useState, ReactNode, FormEvent } from 'react';
import flattenObject from 'flat';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';

export const FormContext = createContext({} as WrappedFormUtils);

type FormSubmitEvent = FormEvent<HTMLFormElement>;

type InjectedProps = {
  hasErrors: boolean;
  handleSubmit: (e: FormSubmitEvent) => void;
};

type Props = FormComponentProps & {
  children: (props: InjectedProps) => ReactNode;
  onSubmit: (values: {}) => void;
};

const FormScreen = ({ children, form, onSubmit }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  const { getFieldsError, validateFields, validateFieldsAndScroll } = form;

  useEffect(() => {
    setIsMounted(true);
    validateFields(() => {});
  }, [validateFields]);

  function handleSubmit(e: FormSubmitEvent) {
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
