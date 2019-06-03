import React, { Children, cloneElement, useState, ReactElement } from 'react';
import pick from 'lodash.pick';
import Form, { FormItemProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';

import { FormContext } from '../FormScreen';

type Props = GetFieldDecoratorOptions &
  FormItemProps & {
    children: ReactElement;
    id: string;
  };

const EnhancedFormItem = (props: Props) => {
  const { children, id } = props;
  const fieldDecoratorOptions = pickFieldDecoratorOptions(props);
  const formItemProps = pickFormItemProps(props);

  const [didBlur, setDidBlur] = useState(false);

  const renderField = (form: WrappedFormUtils) =>
    form.getFieldDecorator(id, fieldDecoratorOptions)(
      cloneElement(Children.only(children), {
        onBlur: () => setDidBlur(true),
      })
    );

  return (
    <FormContext.Consumer>
      {form => {
        const field = renderField(form); // must be rendered first, so form model exists
        const fieldError = didBlur && form.isFieldTouched(id) && form.getFieldError(id);

        return (
          <Form.Item
            {...formItemProps}
            help={fieldError ? fieldError[0] : ''}
            validateStatus={fieldError ? 'error' : ''}
          >
            {field}
          </Form.Item>
        );
      }}
    </FormContext.Consumer>
  );
};

export default EnhancedFormItem;

function pickFieldDecoratorOptions(props: Props): GetFieldDecoratorOptions {
  return pick(props, [
    'getValueFromEvent',
    'initialValue',
    'normalize',
    'rules',
    'trigger',
    'validateFirst',
    'validateTrigger',
    'valuePropName',
    'getValueProps',
    'exclusive',
    'preserve',
  ]);
}

function pickFormItemProps(props: Props): FormItemProps {
  return pick(props, [
    'prefixCls',
    'className',
    'id',
    'label',
    'labelAlign',
    'labelCol',
    'wrapperCol',
    'help',
    'extra',
    'validateStatus',
    'hasFeedback',
    'required',
    'style',
    'colon',
  ]);
}
