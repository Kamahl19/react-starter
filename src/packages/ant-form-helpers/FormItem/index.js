import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';
import omit from 'lodash.omit';
import Form from 'antd/lib/form';

import { FormContext } from '../FormScreen';

export default function EnhancedFormItem({ id, children, ...bag }) {
  const [didBlur, setDidBlur] = useState(false);

  function renderField(form) {
    return form.getFieldDecorator(id, pickFieldOptions(bag))(
      React.cloneElement(React.Children.only(children), {
        onBlur: () => setDidBlur(true),
      })
    );
  }

  return (
    <FormContext.Consumer>
      {({ form }) => {
        const field = renderField(form); // must be rendered first, so form model exists
        const fieldError = didBlur && form.isFieldTouched(id) && form.getFieldError(id);

        return (
          <Form.Item
            {...pickFormItemProps(bag)}
            help={fieldError ? fieldError[0] : ''}
            validateStatus={fieldError ? 'error' : ''}
          >
            {field}
          </Form.Item>
        );
      }}
    </FormContext.Consumer>
  );
}

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

EnhancedFormItem.propTypes = {
  id: PropTypes.string.isRequired,
  ...fieldOptionsPropTypes,
  children: PropTypes.node.isRequired,
};

const fieldOptionsKeys = Object.keys(fieldOptionsPropTypes);

function pickFieldOptions(props) {
  return pick(props, fieldOptionsKeys);
}

function pickFormItemProps(props) {
  return omit(props, fieldOptionsKeys);
}
