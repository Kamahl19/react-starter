import { Form, type FormInstance } from 'antd';
import { useDebounce } from 'use-debounce';

const DEBOUNCE_MS = 500;

type Props = {
  form: FormInstance;
  fieldName: string;
  defaultValue?: string;
  waitMs?: number;
};

const useWatchForm = ({ form, fieldName, defaultValue = '', waitMs = DEBOUNCE_MS }: Props) => {
  const value = Form.useWatch(fieldName, form) ?? defaultValue;

  const [debounced] = useDebounce(value, waitMs);

  return debounced;
};

export default useWatchForm;
