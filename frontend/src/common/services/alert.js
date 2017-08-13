import message from 'antd/lib/message';

const info = (content, duration = 3) => message.info(content, duration);
const warn = (content, duration = 3) => message.warn(content, duration);
const error = (content, duration = 3) => message.error(content, duration);
const success = (content, duration = 3) => message.success(content, duration);
const loading = (content, duration = 3) => message.loading(content, duration);

export default {
  info,
  warn,
  error,
  success,
  loading,
};
