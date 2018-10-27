import React, { Component } from 'react';
import PropTypes from 'prop-types';
import flattenObject from 'flat';

export const FormContext = React.createContext();

class FormScreen extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    mounted: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });

    this.props.form.validateFields();
  }

  handleSubmit = (e, additionalData) => {
    e && e.preventDefault();

    const { form, onSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values, additionalData);
      }
    });
  };

  hasErrors = () => {
    const errors = flattenObject(this.props.form.getFieldsError());

    return Object.keys(errors).some(field => errors[field]);
  };

  render() {
    const { form, children } = this.props;
    const { mounted } = this.state;

    return (
      <FormContext.Provider value={{ form }}>
        {children({
          hasErrors: mounted ? this.hasErrors() : true,
          handleSubmit: this.handleSubmit,
        })}
      </FormContext.Provider>
    );
  }
}

export default FormScreen;
