import { FormComponentProps } from 'antd/lib/form';

export { default as FormItem } from './FormItem';
export { default as FormScreen } from './FormScreen';

export interface FormComponentProps<V = any> extends FormComponentProps<V> {}
