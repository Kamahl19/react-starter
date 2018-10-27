import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import omit from 'lodash.omit';
import Form from 'antd/lib/form';

import { FormContext } from './FormScreen';

const fieldOptionsPropTypes = {
  getValueFromEvent: PropTypes.func,
  initialValue: PropTypes.any,
  normalize: PropTypes.func,
  rules: PropTypes.arrayOf(PropTypes.object),
  trigger: PropTypes.string,
  validateFirst: PropTypes.bool,
  validateTrigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  valuePropName: PropTypes.string,
};

export const propTypes = {
  id: PropTypes.string.isRequired,
  ...fieldOptionsPropTypes,
  children: PropTypes.node.isRequired,
};

const fieldOptionsKeys = Object.keys(fieldOptionsPropTypes);

export function pickFieldOptions(props) {
  return pick(props, fieldOptionsKeys);
}

export function pickFormItemProps(props) {
  return omit(props, fieldOptionsKeys);
}

export function FormItemHOC(WrappedComponent) {
  return class extends Component {
    static propTypes = propTypes;

    state = {
      didBlur: false,
    };

    handleBlur = () => {
      this.setState({
        didBlur: true,
      });
    };

    renderField(form) {
      const { id, children, ...props } = this.props;

      return form.getFieldDecorator(id, pickFieldOptions(props))(
        React.cloneElement(React.Children.only(children), {
          onBlur: this.handleBlur,
        })
      );
    }

    render() {
      const { id, ...props } = this.props;
      const { didBlur } = this.state;

      return (
        <FormContext.Consumer>
          {({ form }) => {
            const field = this.renderField(form); // must be rendered first, so form model exists

            const fieldError = didBlur && form.isFieldTouched(id) && form.getFieldError(id);

            return (
              <WrappedComponent
                {...pickFormItemProps(props)}
                help={fieldError ? fieldError[0] : ''}
                validateStatus={fieldError ? 'error' : ''}
              >
                {field}
              </WrappedComponent>
            );
          }}
        </FormContext.Consumer>
      );
    }
  };
}

export default FormItemHOC(Form.Item);
