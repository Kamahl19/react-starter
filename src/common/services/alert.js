import message from 'antd/lib/message';

message.config({
  duration: 3,
});

export default {
  info: message.info,
  warn: message.warn,
  error: message.error,
  success: message.success,
  loading: message.loading,
};
