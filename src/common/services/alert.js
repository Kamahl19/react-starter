import message from 'antd/lib/message';

message.config({
  duration: 3,
});

const info = (content, duration) => message.info(content, duration);
const warn = (content, duration) => message.warn(content, duration);
const error = (content, duration) => message.error(content, duration);
const success = (content, duration) => message.success(content, duration);
const loading = (content, duration) => message.loading(content, duration);

export default {
  info,
  warn,
  error,
  success,
  loading,
};
