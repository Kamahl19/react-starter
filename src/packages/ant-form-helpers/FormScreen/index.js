import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import flattenObject from 'flat';

export const FormContext = React.createContext();

const FormScreen = ({ form, children, onSubmit }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    form.validateFields();
  }, []);

  function handleSubmit(e, additionalData) {
    e && e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values, additionalData);
      }
    });
  }

  function hasErrors() {
    const errors = flattenObject(form.getFieldsError());
    return Object.keys(errors).some(field => errors[field]);
  }

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
