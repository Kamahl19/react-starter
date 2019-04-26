import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import flattenObject from 'flat';

export const FormContext = React.createContext();

const FormScreen = ({ form, children, onSubmit }) => {
  const [isMounted, setIsMounted] = useState(false);

  const { getFieldsError, validateFields } = form;

  useEffect(() => {
    setIsMounted(true);
    validateFields();
  }, [validateFields]);

  function handleSubmit(e, additionalData) {
    e && e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        onSubmit(values, additionalData);
      }
    });
  }

  const hasErrors = () => Object.values(flattenObject(getFieldsError())).some(error => error);

  return (
    <FormContext.Provider value={form}>
      {children({
        hasErrors: isMounted ? hasErrors() : true,
        handleSubmit,
      })}
    </FormContext.Provider>
  );
};

FormScreen.propTypes = {
  form: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormScreen;
